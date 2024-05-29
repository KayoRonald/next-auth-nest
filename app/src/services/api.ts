import axios from 'axios';
import { parseCookies } from 'nookies';

const cookies = parseCookies();

const api = axios.create({
  baseURL: 'https://localhost:3333/api',
  headers: {
    Authorization: `Bearer ${cookies['ngbackendtoken']}`,
  },
});

api.interceptors.request.use((config) => {
  console.log(config)
  return config
})

export default api;