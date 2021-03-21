import axios from 'axios'

const instance = ({ requiresAuth = true } = {}) => {
  const options = {
    headers: {}
  }
  options.baseURL = process.env.apiUrl || 'http://localhost:3000'
  if (requiresAuth) {
    options.headers.access_token = localStorage.getItem('access_token')
  }
  const instance = axios.create(options)
  return instance
}

export default instance
