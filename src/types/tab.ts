export interface TabItem {
  id: number
  title: string
  url: string
  favIconUrl?: string
  active: boolean
  pinned: boolean
  windowId: number
  groupId?: string
}

export interface TabGroup {
  id: string
  name: string
  color?: string
  collapsed: boolean
  tabIds: number[]
}

export interface PinnedUrl {
  id: string
  url: string
  title: string
  favicon?: string
}

export interface StoredData {
  pinnedTabIds: number[]
  customGroups: TabGroup[]
  pinnedUrls: PinnedUrl[]
}
