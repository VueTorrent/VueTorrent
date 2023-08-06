export enum TitleOptions {
  DEFAULT,
  GLOBAL_SPEED,
  FIRST_TORRENT_STATUS
}

export const titleOptionsList = [
  { title: 'Static Title', value: TitleOptions.DEFAULT },
  { title: 'Global Speed', value: TitleOptions.GLOBAL_SPEED },
  { title: 'First Torrent Speed', value: TitleOptions.FIRST_TORRENT_STATUS }
]