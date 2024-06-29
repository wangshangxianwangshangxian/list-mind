import get_address from "@/utils/get_address"

export default (key) => {
  key = get_address(key)
  try {
    const tmp = localStorage.getItem(`mind_${key}`)
    return JSON.parse(tmp)
  }
  catch (e) {
    return null
  }
}