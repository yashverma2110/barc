import { useState, useEffect } from 'react'
import type { TabItem, TabGroup, PinnedUrl, GridSettings } from '../types/tab'

const DEFAULT_GRID_SETTINGS: GridSettings = {
  iconSize: 'medium',
  columns: 3,
}

export function useTabs() {
  const [tabs, setTabs] = useState<TabItem[]>([])
  const [pinnedTabIds, setPinnedTabIds] = useState<number[]>([])
  const [customGroups, setCustomGroups] = useState<TabGroup[]>([])
  const [pinnedUrls, setPinnedUrls] = useState<PinnedUrl[]>([])
  const [gridSettings, setGridSettings] = useState<GridSettings>(DEFAULT_GRID_SETTINGS)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [customTabNames, setCustomTabNames] = useState<Record<number, string>>({})

  // Load tabs from Chrome API
  const loadTabs = async () => {
    try {
      const chromeTabs = await chrome.tabs.query({})
      const tabItems: TabItem[] = chromeTabs.map((tab) => ({
        id: tab.id!,
        title: tab.title || 'Untitled',
        url: tab.url || '',
        favIconUrl: tab.favIconUrl,
        active: tab.active,
        pinned: tab.pinned,
        windowId: tab.windowId,
      }))
      setTabs(tabItems)
      setLoading(false)
    } catch (error) {
      console.error('Error loading tabs:', error)
      setLoading(false)
    }
  }

  // Load stored data (pinned tabs, custom groups, pinned URLs, grid settings, custom tab names)
  const loadStoredData = async () => {
    try {
      const result = await chrome.storage.local.get(['pinnedTabIds', 'customGroups', 'pinnedUrls', 'gridSettings', 'customTabNames'])
      if (result.pinnedTabIds) {
        setPinnedTabIds(result.pinnedTabIds)
      }
      if (result.customGroups) {
        setCustomGroups(result.customGroups)
      }
      if (result.pinnedUrls) {
        setPinnedUrls(result.pinnedUrls)
      }
      if (result.gridSettings) {
        setGridSettings(result.gridSettings)
      }
      if (result.customTabNames) {
        setCustomTabNames(result.customTabNames)
      }
    } catch (error) {
      console.error('Error loading stored data:', error)
    }
  }

  // Initialize
  useEffect(() => {
    loadTabs()
    loadStoredData()
  }, [])

  // Listen to tab changes
  useEffect(() => {
    const handleTabCreated = () => loadTabs()
    const handleTabRemoved = () => loadTabs()
    const handleTabUpdated = () => loadTabs()
    const handleTabMoved = () => loadTabs()
    const handleTabActivated = () => loadTabs()

    chrome.tabs.onCreated.addListener(handleTabCreated)
    chrome.tabs.onRemoved.addListener(handleTabRemoved)
    chrome.tabs.onUpdated.addListener(handleTabUpdated)
    chrome.tabs.onMoved.addListener(handleTabMoved)
    chrome.tabs.onActivated.addListener(handleTabActivated)

    return () => {
      chrome.tabs.onCreated.removeListener(handleTabCreated)
      chrome.tabs.onRemoved.removeListener(handleTabRemoved)
      chrome.tabs.onUpdated.removeListener(handleTabUpdated)
      chrome.tabs.onMoved.removeListener(handleTabMoved)
      chrome.tabs.onActivated.removeListener(handleTabActivated)
    }
  }, [])

  // Switch to a tab
  const switchToTab = async (tabId: number) => {
    try {
      await chrome.tabs.update(tabId, { active: true })
      const tab = await chrome.tabs.get(tabId)
      if (tab.windowId) {
        await chrome.windows.update(tab.windowId, { focused: true })
      }
    } catch (error) {
      console.error('Error switching to tab:', error)
    }
  }

  // Close a tab
  const closeTab = async (tabId: number) => {
    try {
      await chrome.tabs.remove(tabId)
    } catch (error) {
      console.error('Error closing tab:', error)
    }
  }

  // Create a new tab
  const createNewTab = async () => {
    try {
      await chrome.tabs.create({ active: true })
    } catch (error) {
      console.error('Error creating new tab:', error)
    }
  }

  // Toggle pin status
  const togglePin = async (tabId: number) => {
    try {
      const newPinnedIds = pinnedTabIds.includes(tabId)
        ? pinnedTabIds.filter((id) => id !== tabId)
        : [...pinnedTabIds, tabId]

      setPinnedTabIds(newPinnedIds)
      await chrome.storage.local.set({ pinnedTabIds: newPinnedIds })
    } catch (error) {
      console.error('Error toggling pin:', error)
    }
  }

  // Add URL to pinned grid
  const addPinnedUrl = async (url: string, title: string, favicon?: string) => {
    try {
      // Check if URL already exists in pinned URLs
      const isDuplicate = pinnedUrls.some((pinnedUrl) => pinnedUrl.url === url)
      if (isDuplicate) {
        console.warn('URL already pinned:', url)
        return false
      }

      const newPinnedUrl: PinnedUrl = {
        id: Date.now().toString(),
        url,
        title,
        favicon,
      }
      const newPinnedUrls = [...pinnedUrls, newPinnedUrl]
      setPinnedUrls(newPinnedUrls)
      await chrome.storage.local.set({ pinnedUrls: newPinnedUrls })
      return true
    } catch (error) {
      console.error('Error adding pinned URL:', error)
      return false
    }
  }

  // Remove URL from pinned grid
  const removePinnedUrl = async (id: string) => {
    try {
      const newPinnedUrls = pinnedUrls.filter((url) => url.id !== id)
      setPinnedUrls(newPinnedUrls)
      await chrome.storage.local.set({ pinnedUrls: newPinnedUrls })
    } catch (error) {
      console.error('Error removing pinned URL:', error)
    }
  }

  // Open URL in new or existing tab
  const openUrl = async (url: string) => {
    try {
      const normalizedUrl = normalizeUrl(url)

      // Check if a tab with this URL already exists
      const existingTab = tabs.find((tab) => normalizeUrl(tab.url) === normalizedUrl)

      if (existingTab) {
        // Switch to existing tab instead of creating a new one
        await switchToTab(existingTab.id)
      } else {
        // Create new tab if it doesn't exist
        await chrome.tabs.create({ url, active: true })
      }
    } catch (error) {
      console.error('Error opening URL:', error)
    }
  }

  // Rename a tab (stores custom name in localStorage, doesn't change actual page title)
  const renameTab = async (tabId: number, newTitle: string) => {
    try {
      const updatedCustomNames = { ...customTabNames, [tabId]: newTitle }
      setCustomTabNames(updatedCustomNames)
      await chrome.storage.local.set({ customTabNames: updatedCustomNames })
    } catch (error) {
      console.error('Error renaming tab:', error)
    }
  }

  // Add current active tab to pinned URLs
  const pinCurrentTab = async () => {
    try {
      const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true })
      if (activeTab && activeTab.url) {
        const success = await addPinnedUrl(activeTab.url, activeTab.title || 'Untitled', activeTab.favIconUrl)
        return success
      }
      return false
    } catch (error) {
      console.error('Error pinning current tab:', error)
      return false
    }
  }

  // Filter tabs by search query
  const filteredTabs = searchQuery
    ? tabs.filter(
        (tab) =>
          tab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tab.url.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tabs

  // Update grid settings
  const updateGridSettings = async (newSettings: GridSettings) => {
    try {
      setGridSettings(newSettings)
      await chrome.storage.local.set({ gridSettings: newSettings })
    } catch (error) {
      console.error('Error updating grid settings:', error)
    }
  }

  // Normalize URL for comparison (remove trailing slashes, fragments, etc.)
  const normalizeUrl = (url: string) => {
    try {
      const urlObj = new URL(url)
      return `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`.replace(/\/$/, '')
    } catch {
      return url.replace(/\/$/, '')
    }
  }

  // Find the active tab's URL
  const activeTab = tabs.find((tab) => tab.active)
  const activeTabUrl = activeTab ? normalizeUrl(activeTab.url) : null

  // Mark which pinned URLs match the currently active tab
  const pinnedUrlsWithActiveStatus = pinnedUrls.map((pinnedUrl) => ({
    ...pinnedUrl,
    isActive: activeTabUrl ? normalizeUrl(pinnedUrl.url) === activeTabUrl : false,
  }))

  // Create a set of pinned URL strings for filtering
  const pinnedUrlStrings = new Set(pinnedUrls.map((url) => normalizeUrl(url.url)))

  // Filter out tabs that match pinned URLs
  const tabsExcludingPinnedUrls = filteredTabs.filter((tab) => !pinnedUrlStrings.has(normalizeUrl(tab.url)))

  // Apply custom names to tabs
  const tabsWithCustomNames = tabsExcludingPinnedUrls.map(tab => ({
    ...tab,
    title: customTabNames[tab.id] || tab.title
  }))

  // Separate pinned and unpinned tabs (excluding those matching pinned URLs)
  const pinnedTabs = tabsWithCustomNames.filter((tab) => pinnedTabIds.includes(tab.id))
  const unpinnedTabs = tabsWithCustomNames.filter((tab) => !pinnedTabIds.includes(tab.id))

  return {
    tabs: filteredTabs,
    pinnedTabs,
    unpinnedTabs,
    customGroups,
    pinnedUrls: pinnedUrlsWithActiveStatus,
    gridSettings,
    searchQuery,
    loading,
    setSearchQuery,
    switchToTab,
    closeTab,
    createNewTab,
    togglePin,
    renameTab,
    addPinnedUrl,
    removePinnedUrl,
    openUrl,
    pinCurrentTab,
    updateGridSettings,
  }
}
