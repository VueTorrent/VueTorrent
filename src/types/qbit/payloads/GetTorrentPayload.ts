export default interface GetTorrentPayload {
  filter: string
  category?: string
  tag?: string
  sort: string
  reverse?: boolean
  limit: number
  offset: number
  hashes?: string[]
}