import { BG_COLOR, BORDER_COLOR, COLOR, PRIVATE_LEN, TEXT_COLOR, TIMESTAMP } from "@/stores/constant"
import axios from "axios"
import html2canvas from 'html2canvas'
import get_time from "./get_time"

const get_time_offset = (offset, format = 'YYYY-MM-DD') => {
  const target   = Date.now() + TIMESTAMP.DAY * offset
  const date_str = get_time(target, format)
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

export const html2image = async (el, download = false, file_name) => {
  try {
    const canvas = await html2canvas(el)
    const image  = canvas.toDataURL('image/png')
    if (download) {
      const link = document.createElement('a')
      link.href = image
      link.download = file_name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
    return image
  } catch (error) {
    return ''
  }
}

export default {
  get_color,
  get_left_time,
  calc_distance,
  calc_angle,
  get_text_color,
  get_bg_color,
  get_border_color,
  get_ip,
  get_time_offset
}