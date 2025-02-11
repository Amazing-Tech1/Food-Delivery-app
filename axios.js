import axios from 'axios'

export default axios.create({
    baseURL: 'https://delivey-app-backend.vercel.app',
    withCredentials: true,
})