import generate_address from "@/utils/generate_address"
import get_keys from "./get_keys"

// 通过传递公钥，看下有没有对应的私钥
export default address => {
  const keys   = get_keys()
  const target = keys.find(a => generate_address(a) === address)
  return target
}