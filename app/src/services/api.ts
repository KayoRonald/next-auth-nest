import axios from 'axios'
import { parseCookies } from 'nookies'

const cookies = parseCookies()

const api = axios.create({
  baseURL: 'https://supreme-sniffle-vrqgw4pj5j52xrvw-4000.app.github.dev/',
  headers: {
    Authorization: `Bearer ${cookies['ngbackendtoken']}`
  }
})

api.interceptors.request.use((config) => {
  console.log(config)
  return config
})

export default api
