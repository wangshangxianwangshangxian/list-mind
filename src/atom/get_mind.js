import { get } from "@/utils/network"

const get_mind = async address => {
  return await get('get-mind-data', { address })
}

export default get_mind