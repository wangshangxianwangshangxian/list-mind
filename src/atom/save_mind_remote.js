import get_time from "@/utils/get_time"
import post from "@/utils/post"
import axios from "axios"
import get_key from "./get_key"

export default async mind => {
  mind.update_time = get_time()
  mind.nonce       += 1
  const data        = {
    key: get_key(mind.address),
    mind
  }
  const resp       = await post('save-remote', data)
  if (resp.code === 'success') {
    localStorage.setItem(`mind_${mind.address}`, JSON.stringify(mind))
  }
}