import { DashboardProperty, DashboardPropertyType } from '@/constants/vuetorrent'

type PropertyBase = { active: boolean; name: DashboardProperty; order: number; }

export type TorrentProperty = PropertyBase & (
  | { type: DashboardPropertyType.AMOUNT; props: { title: string, value: string, total: string } }
  | { type: DashboardPropertyType.CHIP; props: { title: string, value: string, color: string } }
  | { type: DashboardPropertyType.DATA; props: { title: string, value: string } }
  | { type: DashboardPropertyType.DATETIME; props: { title: string, value: string } }
  | { type: DashboardPropertyType.DURATION; props: { title: string, value: string } }
  | { type: DashboardPropertyType.PERCENT; props: { title: string, value: string } }
  | { type: DashboardPropertyType.RELATIVE; props: { title: string, value: string } }
  | { type: DashboardPropertyType.SPEED; props: { title: string, value: string } }
  | { type: DashboardPropertyType.TEXT; props: { title: string, value: string } }
  )
