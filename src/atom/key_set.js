export default key => {
  const keys = JSON.parse(localStorage.getItem('key'))
  if (keys.includes(key))
    return
  keys.push(key)
  localStorage.setItem('key', JSON.stringify(keys))
}