import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { emojiStateMap, TorrentState } from '@/constants/vuetorrent'
import { getTorrentStateValue } from '@/helpers'
import { useVueTorrentStore } from '@/stores'

export function useI18nUtils() {
  const i18n = useI18n()
  const { useEmojiState } = storeToRefs(useVueTorrentStore())

  function getTorrentStateString(state: TorrentState) {
    const stateString = i18n.t(`torrent.state.${getTorrentStateValue(state)}`)
    if (useEmojiState.value) {
      return [emojiStateMap[state], stateString].join(' ')
    } else {
      return stateString
    }
  }

  return {
    ...i18n,
    getTorrentStateString,
  }
}
