import { COLOR, PRIVATE_LEN, PUBLIC_LEN, TIMESTAMP } from "@/stores/constant"
import { ec } from "elliptic"

const get_time = (time_stamp = Date.now(), format = 'YYYY-MM-DD hh:mm:ss') => {
  const d       = new Date(time_stamp)
  const year    = String(d.getFullYear())    .padStart(4, '0')
  const month   = String(d.getMonth() + 1)   .padStart(2, '0')
  const date    = String(d.getDate())        .padStart(2, '0')
  const hours   = String(d.getHours())       .padStart(2, '0')
  const minutes = String(d.getMinutes())     .padStart(2, '0')
  const seconds = String(d.getSeconds())     .padStart(2, '0')
  const millsec = String(d.getMilliseconds()).padEnd(3, '0')

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

const get_color = () => {
  const keys = Object.keys(COLOR)
  const r = Math.floor(Math.random() * keys.length)
  const target = keys[r]
  return COLOR[target]
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

export default {
  get_time,
  get_url_end_node,
  get_color,
  get_left_time,
  calc_distance,
  calc_angle,
  generate_key,
  generate_public_key
}