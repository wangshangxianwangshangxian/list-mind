import generate_public_key from "./generate_public_key"
import utils from "./utils"

export default key => {
  if (utils.is_private_key(key)) {
    return generate_public_key(key)
  }
  else if (utils.is_public_key(key)) {
    return key
  }

  return ''
}