import axios from 'axios'

export const instance = axios.create({
  baseURL: '/api/v2',
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
})
