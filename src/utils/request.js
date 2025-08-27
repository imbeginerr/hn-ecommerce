// src/utils/request.js
import axios from 'axios'

// Create an axios instance
const request = axios.create({
  baseURL: import.meta.env.VITE_GLOB_API_URL,
  withCredentials: false,
  timeout: 100000
})

// Response interceptor
request.interceptors.response.use(
  response => {
    // Return the response data directly
    return response.data
  },
  error => {
    // Return the error response data or message for handling in the caller
    if (error.response) {
      return Promise.reject(error.response.data || { message: 'Server error' })
    }
    return Promise.reject({ message: 'Network error' })
  }
)

export default request

