import axios, { AxiosInstance } from 'axios'

class BackendProvider {
  private axios: AxiosInstance
  private up: boolean = false

  get isUp() {
    return this.up
  }

  constructor() {
    let baseURL = `${location.origin}${location.pathname}`
    if (!baseURL.endsWith('/')) baseURL += '/'
    baseURL += 'backend'

    this.axios = axios.create({
      baseURL,
      withCredentials: true,
      headers: {
        put: { 'Content-Type': 'application/json' }
      }
    })
  }

  /**
   * Ping the backend to check if it's up
   * @returns true if backend is up, false otherwise
   */
  async ping(): Promise<boolean> {
    return await this.axios
      .get('/ping')
      .then(
        res => res.data === 'pong',
        () => false
      )
      .then(ok => {
        this.up = ok

        return ok
      })
  }

  /**
   * Get all values
   */
  async getAll(): Promise<Record<string, string> | null> {
    if (!this.up) return null

    return this.axios.get('/config').then(res => res.data)
  }

  /**
   * Get a single value
   * @param key
   * @returns string or null if key doesn't exists
   */
  async get(key: string): Promise<string | null> {
    if (!this.up) return null

    return this.axios.get(`/config/${key}`).then(
      res => res.data[key],
      () => null
    )
  }

  /**
   * Set a value
   * @param key
   * @param value
   * @returns true if value was set, false otherwise
   */
  async set(key: string, value: string): Promise<boolean> {
    if (!this.up) return false

    return this.axios.put(`/config/${key}`, { value }).then(
      () => true,
      () => false
    )
  }

  /**
   * Delete a value
   * @param key
   * @returns true if value was deleted, false otherwise
   */
  async del(key: string): Promise<boolean> {
    if (!this.up) return false

    return this.axios.delete(`/config/${key}`).then(
      () => true,
      () => false
    )
  }

  async update() {
    return this.axios.get('/update').then(res => res.data)
  }
}

export const backend = new BackendProvider()
