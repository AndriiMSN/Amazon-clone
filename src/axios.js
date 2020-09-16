import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5001/speedy-method-285320/us-central1/api' // Api
})

export default instance


