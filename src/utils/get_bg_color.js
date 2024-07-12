import { BG_COLOR } from "./constant"

export default () => {
  const keys  = Object.keys(BG_COLOR)
  const r     = Math.floor(Math.random() * keys.length)
  const color = BG_COLOR[keys[r]]
  return color
}