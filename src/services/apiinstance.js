import axios from 'axios'

const instance = axios.create({
  baseURL: "https://test-api.oneport365.com/api/admin/quotes/assessment",
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})


export default instance
