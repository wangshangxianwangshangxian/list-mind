import { post } from "@/utils/network"

const save_remote = async mind => {
  const resp = await post('save', mind)
  return resp
}

export default save_remote