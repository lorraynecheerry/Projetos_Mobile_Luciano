import axios from 'axios'

const apiLocal = axios.create({
    baseURL: 'http://localhost:1111'
})

export default apiLocal