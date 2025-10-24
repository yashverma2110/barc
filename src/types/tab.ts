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
  isActive?: boolean
}

export interface GridSettings {
  iconSize: 'small' | 'medium' | 'large'
  columns: 2 | 3 | 4
}

export interface StoredData {
  pinnedTabIds: number[]
  customGroups: TabGroup[]
  pinnedUrls: PinnedUrl[]
  gridSettings: GridSettings
}
