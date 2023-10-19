import { DashboardProperty, DashboardPropertyType } from '@/constants/vuetorrent'

type pptData = { active: boolean; order: number }
type pptMetadata =
  | { type: DashboardPropertyType.AMOUNT; props: { title: string; value: string; total: string } }
  | { type: DashboardPropertyType.CHIP; props: { title: string; value: string; color: string } }
  | { type: DashboardPropertyType.DATA; props: { title: string; value: string } }
  | { type: DashboardPropertyType.DATETIME; props: { title: string; value: string } }
  | { type: DashboardPropertyType.DURATION; props: { title: string; value: string } }
  | { type: DashboardPropertyType.PERCENT; props: { title: string; value: string; compact: boolean } }
  | { type: DashboardPropertyType.RELATIVE; props: { title: string; value: string } }
  | { type: DashboardPropertyType.SPEED; props: { title: string; value: string } }
  | { type: DashboardPropertyType.TEXT; props: { title: string; value: string } }

export interface PropertyData {
  [key: DashboardProperty | string]: pptData
}

export interface PropertyMetadata {
  [key: DashboardProperty | string]: pptMetadata
}

export type TorrentProperty = { name: DashboardProperty } & pptData & pptMetadata
