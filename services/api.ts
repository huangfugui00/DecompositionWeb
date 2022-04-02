// const axios = require('axios')
import axios from 'axios'
console.log( process.env.NEXT_PUBLIC_BASE_URL)
console.log(process.env.NODE_ENV)
function api(){
  
  const axiosInstance = axios.create({
    //  baseURL: 'http://localhost:3001'
     baseURL: process.env.NODE_ENV==='development'?process.env.NEXT_PUBLIC_BASE_URL:process.env.NEXT_PUBLIC_BASE_URL
  })

  //每个axios请求带上token(存在的话)
  const token =sessionStorage.getItem('token') || localStorage.getItem('token') 
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  axiosInstance.interceptors.response.use(
    (response) => {
      return response.data
    },
    (error) => {//服务端出错时会触发
      if (error.response.status === 401) {
        localStorage.removeItem('token')
      }
      if(error.response.data===undefined){
        error.response.data.data = error.response.statusText
      }
      return error.response.data
    }
  )
  return axiosInstance
}


export default api