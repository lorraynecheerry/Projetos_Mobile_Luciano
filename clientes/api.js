import axios from 'axios'

const api = axios.create({
     baseURL: 'http://10.152.46.20:3333'
    //baseURL: 'http://10.10.10.33:3333'
})

export default api