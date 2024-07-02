import MindStore from "@/stores/MindStore"
import delete_key from "./delete_key"

export default address => {
  MindStore().mind = null
  MindStore().blocks.length = 0
  delete_key(address)
  localStorage.removeItem(`mind_${address}`)
}