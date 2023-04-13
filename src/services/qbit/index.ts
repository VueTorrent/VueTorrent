import Axios from 'axios'

export const axiosInstance = Axios.create({
  baseURL: '/api/v2',
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  },
  maxRate: 1000
})
