import { TEXT_COLOR } from "./constant"

export default () => {
  const keys  = Object.keys(TEXT_COLOR)
  const r     = Math.floor(Math.random() * keys.length)
  const color = TEXT_COLOR[keys[r]]
  return color
}