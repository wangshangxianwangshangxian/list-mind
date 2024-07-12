import { BORDER_COLOR } from "./constant"

export default () => {
  const keys  = Object.keys(BORDER_COLOR)
  const r     = Math.floor(Math.random() * keys.length)
  const color = BORDER_COLOR[keys[r]]
  return color
}