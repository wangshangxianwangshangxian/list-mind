import get_time from "@/utils/get_time"

export default mind => {
  mind.update_time = get_time()
  mind.nonce       += 1
  localStorage.setItem(`mind_${mind.address}`, JSON.stringify(mind))
}