export default interface BuildInfo {
  bitness: number
  boost: string
  libtorrent: string
  openssl: string
  platform: 'windows' | 'macos' | 'linux' | 'unknown'
  qt: string
  zlib: string
}
