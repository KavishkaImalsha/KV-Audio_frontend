import axios from 'axios'
const BackendApi = axios.create({
    baseURL: 'http://localhost:3000/api'
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