import axios from 'axios'

const apiLocal = axios.create({
    //baseURL: 'http://10.75.49.190:3333'
    baseURL: 'http://10.152.46.11:3333'
    //baseURL: 'http://192.168.172.208:3333'
})

export default apiLocal