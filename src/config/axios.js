import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.apiUrl || 'http://localhost:3000'
})

export default instance
