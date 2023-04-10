import Axios from 'axios'

export const useAxios = () => {
  const axios = Axios.create({
    baseURL: 'api/v2'
  })

  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

  return axios
}
