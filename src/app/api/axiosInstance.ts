import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

api.interceptors.request.use(
  (config) => {
    const updatedConfig = { ...config }
    const token = process.env.NEXTAUTH_SECRET
    if (token) {
      updatedConfig.headers.Authorization = `Bearer ${token}`
    }
    return updatedConfig
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error.message)
    return Promise.reject(error)
  },
)

export default api
