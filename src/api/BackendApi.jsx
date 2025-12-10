import axios from 'axios'
const baseURL = import.meta.env.VITE_API_URL

const BackendApi = axios.create({
    baseURL: baseURL
})

BackendApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')

        if(token){
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