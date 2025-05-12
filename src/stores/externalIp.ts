import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { whenever } from '@vueuse/core'
import { useLogStore } from './logs'
import { useMaindataStore } from './maindata'
import { useVueTorrentStore } from './vuetorrent'

export const useExternalIpStore = defineStore('externalIP', () => {
  const maindataStore = useMaindataStore()
  const logStore = useLogStore()

  const externalIp = computed(() => {
    return maindataStore.serverState?.last_external_address_v4 || logStore.externalIp
  })
  const geoDetails = ref<string | null>(null)
  const ispDetails = ref<string | null>(null)
  const vueTorrentStore = useVueTorrentStore()
  const { fetchExternalIpInfo } = storeToRefs(vueTorrentStore)

  async function fetchGeoAndIspDetails() {
    if (!fetchExternalIpInfo.value) return

    if (externalIp.value) {
      try {
        const response = await fetch(`https://ipinfo.io/${externalIp.value}/json`)
        const data = await response.json()
        geoDetails.value = `${data.city}, ${data.region}, ${data.country}`
        ispDetails.value = data.org
      } catch (error) {
        console.error('Error fetching geo & ISP details:', error)
      }
    }
  }

  // Watch for changes in externalIp and fetch Geo/ISP details accordingly
  watch(externalIp, fetchGeoAndIspDetails)
  whenever(fetchExternalIpInfo, fetchGeoAndIspDetails)

  return {
    externalIp,
    geoDetails,
    ispDetails
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useExternalIpStore, import.meta.hot))
}
