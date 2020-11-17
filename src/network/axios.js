import axios from 'axios'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export const baseURL = 'http://81.68.203.112:8888/api/private/v1/'

export const instance = axios.create({
  baseURL,
  timeout: 1000
})

instance.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  console.log(config)
  return config
})

instance.interceptors.response.use(response => {
  NProgress.done()
  const status = response.data.meta.status
  console.log(response)
  if (status % 200 <= 10 && status < 210) {
    return response.data
  } else {
    return Promise.reject(new Error(response.data.meta.msg))
  }
})

export function Login (data) {
  return instance.post('/login', data)
}

export function getMenus() {
  return instance.get('/menus')
}
