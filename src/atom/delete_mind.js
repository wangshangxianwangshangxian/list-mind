import generate_address from "@/utils/generate_address"
import is_address from "./is_address"

export default key => {
  const address = is_address(key) ? key : generate_address(key)
  localStorage.removeItem(`mind_${address}`)
}