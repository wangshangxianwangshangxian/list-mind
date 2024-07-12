import get_keys from "./get_keys"

export default key => {
  const keys  = get_keys(key)
  const index = keys.findIndex(a => a === key)
  keys.splice(index, 1)
  localStorage.setItem('key', JSON.stringify(keys))
}