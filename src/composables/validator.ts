import { useI18n } from 'vue-i18n'

export function useValidator() {
  const { t } = useI18n()

  function torrentFilesRule(files: File[]) {
    let result: boolean | string = t('modals.add.oneOrMoreFilesInvalidTorrent')

    if (files.length) {
      const isTorrentFiles = files.every((file) => {
        if (file.type) return file.type === 'application/x-bittorrent'
        else return /^.*\.torrent$/.test(file.name)
      })

      result = isTorrentFiles ? true : result
    }

    return result
  }

  return {
    torrentFilesRule
  }
}
