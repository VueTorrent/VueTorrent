import { useStorage, whenever } from '@vueuse/core'
import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { useLogStore } from './logs'
import { useMaindataStore } from './maindata'
import { useVueTorrentStore } from './vuetorrent'

export const useExternalIpStore = defineStore('externalIP', () => {
  const logStore = useLogStore()
  const maindataStore = useMaindataStore()
  const vueTorrentStore = useVueTorrentStore()
  const { fetchExternalIpInfo } = storeToRefs(vueTorrentStore)

  const externalIp = computed(() => {
    return maindataStore.serverState?.last_external_address_v4 || logStore.externalIp
  })

  const geoDetails = useStorage<string | null>('externalIp_geoDetails', null)
  const ispDetails = useStorage<string | null>('externalIp_ispDetails', null)
  const lastFetchedIp = useStorage<string | undefined>('externalIp_lastFetchedIp', undefined)

  async function fetchGeoAndIspDetails() {
    if (!fetchExternalIpInfo.value) return

    if (externalIp.value && (externalIp.value !== lastFetchedIp.value || !geoDetails.value || !ispDetails.value)) {
      try {
        const response = await fetch(`https://ipinfo.io/${externalIp.value}/json`)
        const data = await response.json()
        geoDetails.value = `${data.city}, ${data.region}, ${data.country}`
        ispDetails.value = data.org
        lastFetchedIp.value = externalIp.value
      } catch (error) {
        console.error('Error fetching geo & ISP details:', error)
      }
    }
  }

  watch(externalIp, fetchGeoAndIspDetails)
  whenever(fetchExternalIpInfo, fetchGeoAndIspDetails)
  void fetchGeoAndIspDetails()

  return {
    externalIp,
    geoDetails,
    ispDetails,
    lastFetchedIp,
    $reset: () => {
      geoDetails.value = null
      ispDetails.value = null
      lastFetchedIp.value = undefined
    },
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useExternalIpStore, import.meta.hot))
}
