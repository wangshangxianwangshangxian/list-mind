import axios from "axios"
import get_config from "../atom/get_config"

export default async (route, data) => {
  return new Promise(async resolve => {
    const instance = axios.create({
      withCredentials: true
    })

    const url = get_config().BASE_URL + '/api/' + route + '?' + Object.entries(data).map(arrs => arrs.join('=')).join('&')
    instance.get(url)
      .then(resp => resp.data)
      .then(resp => resolve(resp))
      .catch(err => {
        console.error('error', err)
        resolve({})
      })
  })
}