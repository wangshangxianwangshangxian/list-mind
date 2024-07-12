import cookie_get from "../utils/cookie_get"
import generate_key from "../utils/generate_key"

export default () => {
  const target = cookie_get('token')
  if (target)
    return
  
  const token = generate_key()
  document.cookie = 'token=' + token
}