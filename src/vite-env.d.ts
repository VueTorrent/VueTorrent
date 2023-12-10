/// <reference types="vite/client" />

import { ImportMetaEnv as BaseImportMetaEnv } from 'vite'

interface ImportMetaEnv extends BaseImportMetaEnv {
  readonly VITE_PACKAGE_VERSION: string

  readonly VITE_QBITTORRENT_TARGET: string
  readonly VITE_QBITTORRENT_PORT: number

  readonly VITE_USE_MOCK_PROVIDER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
