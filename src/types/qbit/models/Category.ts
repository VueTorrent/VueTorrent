export default interface Category {
  name: string
  savePath: string
  downloadPathEnabled?: boolean
  downloadPath?: string
  download_path?: string | boolean | undefined
}
