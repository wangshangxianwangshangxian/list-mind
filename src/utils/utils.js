import { BG_COLOR, BORDER_COLOR, COLOR, PRIVATE_LEN, PUBLIC_LEN, TEXT_COLOR, TIMESTAMP } from "@/stores/constant"
import axios from "axios"
import { ec } from "elliptic"

const get_time = (time_stamp = Date.now(), format = 'YYYY-MM-DD hh:mm:ss') => {
  const d       = new Date(time_stamp)
  const year    = String(d.getFullYear())    .padStart(4, '0')
  const month   = String(d.getMonth() + 1)   .padStart(2, '0')
  const date    = String(d.getDate())        .padStart(2, '0')
  const hours   = String(d.getHours())       .padStart(2, '0')
  const minutes = String(d.getMinutes())     .padStart(2, '0')
  const seconds = String(d.getSeconds())     .padStart(2, '0')

  const date_str = format.replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', date)
    .replace('hh', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
  return date_str
}

const get_left_time = (start_time = Date.now(), end_time = Date.now(), format = 'hh:mm:ss') => {
  let total = new Date(end_time).getTime() - new Date(start_time).getTime()

  const hour = Math.floor(total / TIMESTAMP.HOUR)
  total      = total - TIMESTAMP.HOUR * hour
  
  const mins = Math.floor(total / TIMESTAMP.MINUTE)
  total      = total - TIMESTAMP.MINUTE * mins

  const secs = Math.floor(total / TIMESTAMP.SECOND)
  
  return format
    .replace('hh', hour.toString().padStart(2, '0'))
    .replace('mm', mins.toString().padStart(2, '0'))
    .replace('ss', secs.toString().padStart(2, '0'))
}

const get_url_end_node = () => {
  const hash = location.hash
  const arrs = hash.split('/')
  const temp = arrs[arrs.length - 1]
  const wenh = temp.split('?')[0]
  return wenh
}

const get_color = (type = 'bg', level = 200) => {
  const keys  = Object.keys(COLOR)
  const r     = Math.floor(Math.random() * keys.length)
  const color = COLOR[keys[r]]
  return `${type}-${color}-${level}`
}

const get_bg_color = () =>{
  const keys  = Object.keys(BG_COLOR)
  const r     = Math.floor(Math.random() * keys.length)
  const color = BG_COLOR[keys[r]]
  return color
}

const get_text_color = (excludes = []) =>{
  while (1) {
    const keys  = Object.keys(TEXT_COLOR)
    const r     = Math.floor(Math.random() * keys.length)
    const color = TEXT_COLOR[keys[r]]
    if (excludes.includes(color))
      continue
    return color
  }
}

const get_border_color = () =>{
  const keys  = Object.keys(BORDER_COLOR)
  const r     = Math.floor(Math.random() * keys.length)
  const color = BORDER_COLOR[keys[r]]
  return color
}

const calc_distance = (x1, y1, x2, y2) => {
  const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
  return distance
}

const calc_angle = (x1, y1, x2, y2) => {
  const dx    = x2 - x1
  const dy    = y2 - y1
  const theta = Math.atan2(dy, dx)
  const angle = theta * (180 / Math.PI)
  return angle
}

const generate_key = (len = PRIVATE_LEN) => {
  const array       = new Uint8Array(32)
  window.crypto.getRandomValues(array)
  const private_key = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
  const key         = private_key.slice(0, len)
  return key
}

const generate_public_key = private_key => {
  const curve = new ec('secp256k1')
  const pair  = curve.keyFromPrivate(private_key)
  const key   = '0x' + pair.getPublic(true, 'hex').slice(-PUBLIC_LEN)
  return key
}

const is_private_key = key => typeof key === 'string' && key.length === PRIVATE_LEN
const is_public_key  = key => typeof key === 'string' && key.length === PUBLIC_LEN + 1 + key.startsWith('0x')

const get_mind_by_private_key_local = id => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.startsWith('mind_'))
      continue
    const mind = JSON.parse(localStorage.getItem(key))
    if (mind && mind.id === id) {
      return mind
    }
  }
  return null
}

const get_mind_by_public_key_local = key => {
  const target = localStorage.getItem(`mind_${key}`)
  if (!target) return null
  return JSON.parse(target)
}

const get_ip = () => {
  return new Promise(resolve => {
    const url = 'https://api.ipify.org?format=json'
    axios
      .get(url)
      .then(resp => resp.json())
      .then(resp => resolve(resp.ip))
      .catch(error => {
        console.error(error)
        resolve('')
      })
  })
}

export default {
  get_time,
  get_url_end_node,
  get_color,
  get_left_time,
  calc_distance,
  calc_angle,
  generate_key,
  generate_public_key,
  is_private_key,
  is_public_key,
  get_mind_by_public_key_local,
  get_mind_by_private_key_local,
  get_text_color,
  get_bg_color,
  get_border_color,
  get_ip
}