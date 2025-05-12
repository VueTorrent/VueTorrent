import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { whenever } from '@vueuse/core'
import { useLogStore } from './logs'
import { useMaindataStore } from './maindata'
import { useVueTorrentStore } from './vuetorrent'

export const useExternalIpStore = defineStore(
  'externalIP',
  () => {
    const logStore = useLogStore()
    const maindataStore = useMaindataStore()
    const vueTorrentStore = useVueTorrentStore()
    const { fetchExternalIpInfo } = storeToRefs(vueTorrentStore)

    const externalIpLocalStorage = JSON.parse(localStorage.getItem('vuetorrent_externalIP') || '{}')

    const externalIp = computed(() => {
      return maindataStore.serverState?.last_external_address_v4 || logStore.externalIp
    })

    const geoDetails = ref<string | null>(externalIpLocalStorage?.geoDetails || null)
    const ispDetails = ref<string | null>(externalIpLocalStorage?.ispDetails || null)
    const lastFetchedIp = ref<string | undefined>(externalIpLocalStorage?.lastFetchedIp)

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
    fetchGeoAndIspDetails()

    return {
      externalIp,
      geoDetails,
      ispDetails,
      lastFetchedIp,
      $reset: () => {
        geoDetails.value = null
        ispDetails.value = null
        lastFetchedIp.value = undefined
      }
    }
  },
  {
    persistence: {
      enabled: true,
      storageItems: [
        {
          storage: localStorage,
          excludePaths: ['externalIp']
        }
      ]
    }
  }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useExternalIpStore, import.meta.hot))
}
