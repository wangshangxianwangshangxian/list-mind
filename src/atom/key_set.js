import init_key_storage from "./init_key"

export default key => {
  const temp = localStorage.getItem('key')
  if (!temp) {
    init_key_storage()
  }
  
  const keys = JSON.parse(localStorage.getItem('key'))
  if (keys.includes(key))
    return
  keys.push(key)
  localStorage.setItem('key', JSON.stringify(keys))
}