import axios from 'axios'
const BackendApi = axios.create({
    baseURL: 'https://kv-audio-backend-ejl6.onrender.com/api'
})

BackendApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')

        if(config){
            config.headers.Authorization = `Bearer ${token}` 
        }
        config.headers['Content-Type'] = "application/json"
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default BackendApi