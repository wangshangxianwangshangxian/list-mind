import { BASE_URL } from "@/stores/constant"
import axios from "axios"

export const get = async (url) => {
  
}

export const post = (route, data) => {
  return new Promise(async resolve => {
    const url = BASE_URL + route
    axios.post(url, data)
      .then(resp => resp.data)
      .then(resp => resolve(resp))
      .catch(err => {
        console.error('error', err)
      })
  })
}