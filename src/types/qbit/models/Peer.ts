export default interface Peer {
  client: string
  connection: string
  country: string
  country_code: string
  dl_speed: number
  downloaded: number
  files: string
  flags: string
  flags_desc: string
  ip: string
  peer_id_client: string
  port: number
  progress: number
  relevance: number
  up_speed: number
  uploaded: number
}
