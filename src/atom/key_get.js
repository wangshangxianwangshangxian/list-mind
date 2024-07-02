import generate_address from "@/utils/generate_address"

export default address => {
  const keys = JSON.parse(localStorage.getItem('key'))
  const flag = keys.find(key => generate_address(key) === address)
  return flag
}