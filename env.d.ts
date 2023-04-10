/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_FAKE_TORRENTS: boolean
  readonly VITE_FAKE_TORRENT_COUNT: number
  readonly VITE_QBITTORRENT_PORT: number
  readonly VITE_QBITTORRENT_TARGET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
