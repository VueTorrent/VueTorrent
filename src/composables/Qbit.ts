import { ref, toValue } from 'vue'

export function useQbitApi(path: string) {
  const baseUrl = 'http://localhost:8080/api'

  const data = ref<any>(null)
  const loading = ref(false)
  const error = ref<any>(null)

  async function getData() {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${baseUrl}/${path}`)
      data.value = await response.json()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  async function postData(payload: any) {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${baseUrl}/${path}`, {
        method: 'POST',
        body: JSON.stringify(toValue(payload))
      })
      data.value = await response.json()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, getData, postData }
}