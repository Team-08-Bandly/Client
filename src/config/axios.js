import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_APIURL || 'http://localhost:3000'
})

export default instance
