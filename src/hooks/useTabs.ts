import { useState, useEffect } from 'react'
import type { TabItem, TabGroup, PinnedUrl } from '../types/tab'

export function useTabs() {
  const [tabs, setTabs] = useState<TabItem[]>([])
  const [pinnedTabIds, setPinnedTabIds] = useState<number[]>([])
  const [customGroups, setCustomGroups] = useState<TabGroup[]>([])
  const [pinnedUrls, setPinnedUrls] = useState<PinnedUrl[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

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

  // Load stored data (pinned tabs, custom groups, pinned URLs)
  const loadStoredData = async () => {
    try {
      const result = await chrome.storage.local.get(['pinnedTabIds', 'customGroups', 'pinnedUrls'])
      if (result.pinnedTabIds) {
        setPinnedTabIds(result.pinnedTabIds)
      }
      if (result.customGroups) {
        setCustomGroups(result.customGroups)
      }
      if (result.pinnedUrls) {
        setPinnedUrls(result.pinnedUrls)
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
      const newPinnedUrl: PinnedUrl = {
        id: Date.now().toString(),
        url,
        title,
        favicon,
      }
      const newPinnedUrls = [...pinnedUrls, newPinnedUrl]
      setPinnedUrls(newPinnedUrls)
      await chrome.storage.local.set({ pinnedUrls: newPinnedUrls })
    } catch (error) {
      console.error('Error adding pinned URL:', error)
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
      await chrome.tabs.create({ url, active: true })
    } catch (error) {
      console.error('Error opening URL:', error)
    }
  }

  // Add current active tab to pinned URLs
  const pinCurrentTab = async () => {
    try {
      const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true })
      if (activeTab && activeTab.url) {
        await addPinnedUrl(activeTab.url, activeTab.title || 'Untitled', activeTab.favIconUrl)
      }
    } catch (error) {
      console.error('Error pinning current tab:', error)
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

  // Separate pinned and unpinned tabs
  const pinnedTabs = filteredTabs.filter((tab) => pinnedTabIds.includes(tab.id))
  const unpinnedTabs = filteredTabs.filter((tab) => !pinnedTabIds.includes(tab.id))

  return {
    tabs: filteredTabs,
    pinnedTabs,
    unpinnedTabs,
    customGroups,
    pinnedUrls,
    searchQuery,
    loading,
    setSearchQuery,
    switchToTab,
    closeTab,
    createNewTab,
    togglePin,
    addPinnedUrl,
    removePinnedUrl,
    openUrl,
    pinCurrentTab,
  }
}
