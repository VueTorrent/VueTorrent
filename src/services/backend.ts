import { StorageLikeAsync } from '@vueuse/core'
import axios, { AxiosInstance } from 'axios'

class BackendProvider {
  private axios: AxiosInstance
  private _isInitialized: boolean = false
  private _isAutoConfig: boolean = false
  private up: boolean = true
  private pingPromise: Promise<boolean> | null = null

  constructor() {
    this.axios = axios.create({
      withCredentials: true,
      headers: {
        put: { 'Content-Type': 'application/json' }
      }
    })
  }

  get isInitialized() {
    return this._isInitialized
  }

  get isAutoConfig() {
    return this._isAutoConfig
  }

  init(baseURL?: string) {
    if (!baseURL) {
      baseURL = `${location.origin}${location.pathname}`
      if (baseURL.endsWith('/')) {
        baseURL = baseURL.slice(0, -1)
      }
      baseURL += '/backend'
      this._isAutoConfig = true
    } else {
      this._isAutoConfig = false
    }

    this.axios.defaults.baseURL = baseURL
    this._isInitialized = !!baseURL
  }

  /**
   * Ping the backend to check if it's up
   * @returns true if backend is up, false otherwise
   */
  async ping(): Promise<boolean> {
    if (!this._isInitialized) return false
    if (this.pingPromise) {
      return this.pingPromise
    }

    this.pingPromise = this.axios
      .get('/ping')
      .then(
        res => res.data === 'pong',
        () => false
      )
      .then(ok => {
        this.up = ok
        this.pingPromise = null

        return ok
      })

    return await this.pingPromise
  }

  private async waitForPing() {
    if (this.pingPromise) {
      await this.pingPromise
    }
  }

  shouldDiscardCalls() {
    return !this._isInitialized || !this.up
  }

  /**
   * Get all values
   */
  async getAll(): Promise<Record<string, string>> {
    await this.waitForPing()
    if (this.shouldDiscardCalls()) return {}

    return this.axios.get('/config').then(res => res.data)
  }

  /**
   * Get a single value
   * @param key
   * @returns string or null if key doesn't exists
   */
  async get(key: string): Promise<string | null> {
    await this.waitForPing()
    if (this.shouldDiscardCalls()) return null

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
    await this.waitForPing()
    if (this.shouldDiscardCalls()) return false

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
    await this.waitForPing()
    if (this.shouldDiscardCalls()) return false

    return this.axios.delete(`/config/${key}`).then(
      () => true,
      () => false
    )
  }
}

export const backend = new BackendProvider()
export const backendStorage: StorageLikeAsync = {
  async getItem(key) {
    return await backend.get(key)
  },
  async setItem(key, state) {
    await backend.set(key, state)
  },
  async removeItem(key) {
    await backend.del(key)
  }
}
