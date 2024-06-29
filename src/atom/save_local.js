import MindStore from "@/stores/MindStore"
import get_time from "@/utils/get_time"

export default (mind = MindStore().mind) => {
  mind.update_time = get_time()
  localStorage.setItem(`mind_${mind.address}`, JSON.stringify(mind))
}