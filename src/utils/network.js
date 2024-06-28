import { BASE_URL } from "@/stores/constant"
import axios from "axios"

export const get = (route, data) => {
  return new Promise(async resolve => {
    const url = BASE_URL + route + '?' + Object.entries(data).map(arrs => arrs.join('=')).join('&')
    axios.get(url, data)
      .then(resp => resp.data)
      .then(resp => resolve(resp))
      .catch(err => {
        console.error('error', err)
      })
  })
}

export const post = (route, data) => {
  return new Promise(async resolve => {
    const url = BASE_URL + route
    axios.post(url, data)
      .then(resp => resp.data)
      .then(resp => resolve(resp))
      .catch(err => {
        console.error('error', err)
        resolve({})
      })
  })
}