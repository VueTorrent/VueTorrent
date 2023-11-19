/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_QBITTORRENT_TARGET: string
  readonly VITE_QBITTORRENT_PORT: number

  readonly VITE_USE_FAKE_TORRENTS: string
  readonly VITE_FAKE_TORRENT_COUNT: number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
