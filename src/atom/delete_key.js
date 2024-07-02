import generate_address from "@/utils/generate_address"

export default address => {
  const temp = localStorage.getItem('key')
  if (!temp) {
    return
  }

  const keys  = JSON.parse(temp)
  const index = keys.findIndex(key => {
    const private_2_address = generate_address(key)
    return private_2_address === address
  })
  if (index < 0)
    return
  keys.splice(index, 1)
  localStorage.setItem('key', JSON.stringify(keys))
}