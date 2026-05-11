type WidgetName = 'CurrentSpeed' | 'SpeedGraph' | 'TransferStats' | 'FreeSpace' | 'PerformanceStats' | 'ConnectionStats' | 'Filters'

export default interface SidebarWidget {
  name: WidgetName
  active: boolean
  qbitVersion?: string
}
