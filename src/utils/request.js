import axios from 'axios'

// Create an axios instance
const request = axios.create({
  baseURL: import.meta.env.VITE_GLOB_API_URL,
  withCredentials: false,
  timeout: 100000
})

// Request interceptor to add token to headers
request.interceptors.request.use(
  config => {
    // Get token from localStorage
    const token = localStorage.getItem('authToken')
    if (token) {
      // Add token to Authorization header
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    // Handle request error
    return Promise.reject(error)
  }
)

// Response interceptor
request.interceptors.response.use(
  response => {
    // Return the response data directly
    return response.data
  },
  error => {
    // Handle specific error cases
    if (error.response) {
      // If 401 Unauthorized, clear token and redirect to login
      if (error.response.status === 401) {
        localStorage.removeItem('authToken')
        window.location.href = '/login' // Adjust redirect path as needed
      }
      return Promise.reject(error.response.data || { message: 'Lỗi server' })
    }
    return Promise.reject({ message: 'Lỗi mạng' })
  }
)

export default request