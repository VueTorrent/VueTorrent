import { axiosInstance } from '@/services/qbit'
import { useSelectedStore } from '@/stores/context'
import { useAxios } from '@vueuse/integrations/useAxios'

// Utils

const execute = (action: string, params?: Record<string, any>) => {
  const data = new URLSearchParams(params)
  return useAxios(action, { method: 'POST', params: { data } }, axiosInstance)
}

const torrentAction = (action: string, hashes: string[], extra?: Record<string, any>) => {
  const params = {
    hashes: hashes.length ? hashes.join('|') : 'all',
    ...extra
  }

  return execute(`/torrents/${action}`, params)
}

// Transfer management

export const toggleSpeedLimitsMode = async () => {
  useAxios('/transfer/toggleSpeedLimitsMode', { method: 'POST' }, axiosInstance)
}

// Torrent management

export const deleteTorrents = async (hashes: string[], deleteFiles: boolean) => {
  await torrentAction('delete', hashes, { deleteFiles })
}

export const resumeTorrents = async (hashes: string[]) => {
  await torrentAction('resume', hashes)
}

export const forceStartTorrents = async (hashes: string[]) => {
  await torrentAction('setForceStart', hashes, { value: true })
}

export const pauseTorrents = async (hashes: string[]) => {
  await torrentAction('pause', hashes)
}

export const toggleSequentialDownload = async (hashes: string[]) => {
  await torrentAction('toggleSequentialDownload', hashes)
}

export const toggleFirstLastPiecePriority = async (hashes: string[]) => {
  await torrentAction('toggleFirstLastPiecePrio', hashes)
}

export const setAutoTMM = async (hashes: string[], enable: boolean) => {
  await torrentAction('setAutoManagement', hashes, { enable })
}

export const setDownloadLimit = async (hashes: string[], limit: number) => {
  await torrentAction('setDownloadLimit', hashes, { limit })
}

export const setUploadLimit = async (hashes: string[], limit: number) => {
  await torrentAction('setUploadLimit', hashes, { limit })
}

export const rename
