import MindStore from "@/stores/MindStore"
import get_address from "@/utils/get_address"

export default key => {
  key = get_address(key)
  MindStore().mind = null
  MindStore().blocks.length = 0
  localStorage.removeItem(`mind_${key}`)
}