import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: '/api/v2',
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
})
