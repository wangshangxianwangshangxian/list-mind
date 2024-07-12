import generate_address from "@/utils/generate_address"
import get_keys from "./get_keys"

export default address => {
  const keys = get_keys()
  return keys.find(a => {
    const _address = generate_address(a)
    return address === _address
  })
}