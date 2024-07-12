export default key => {
  let cookie_arrs = document.cookie.split(";")

  for (let i = 0; i < cookie_arrs.length; i++) {
    let [cookie_key, value] = cookie_arrs[i].split("=")
    if (cookie_key.trim() === key) {
      return decodeURIComponent(value)
    }
  }
  return null
}