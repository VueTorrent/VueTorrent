import { TorrentFile as QbitTorrentFile } from '@/types/qbit/models'

export default interface TorrentFile extends QbitTorrentFile {
  /** Linked torrent hash */
  hash: string
}
