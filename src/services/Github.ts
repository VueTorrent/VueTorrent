import axios, { AxiosInstance } from 'axios'

export class Github {
  private axios: AxiosInstance

  constructor() {
    this.axios = axios.create()
  }

  /**
   * Fetches the latest version of VueTorrent
   */
  async getVersion(): Promise<string> {
    const { data } = await this.axios.get('https://api.github.com/repos/vuetorrent/vuetorrent/releases/latest')
    return data.tag_name
  }
}
