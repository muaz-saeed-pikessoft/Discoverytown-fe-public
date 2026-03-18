import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { getCookie } from '../utils/cookie-setting'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  headers: {
    'ngrok-skip-browser-warning': '69420',
  },
})

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const access_token = getCookie('access_token')
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`
    }

    return config
  },

  (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
)

// Add a response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError): Promise<AxiosError> => {
    if (error?.response) {
      if (error?.response?.status === 401) {
        // Handle Unauthorized (e.g., log out the user)
      } else if (error?.response?.status === 404) {
        // Handle Not Found (e.g., show a 404 page)
      } else {
      }
    } else if (error?.request) {
      // The request was made, but no response was received (e.g., network error)
      // You can handle network errors here
    } else {
      // Something else happened in making the request
    }

    return Promise.reject(error)
  }
)

export default instance
