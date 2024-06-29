import get_address from "@/utils/get_address"
import { get } from "@/utils/network"

const get_mind = async key => {
  key = get_address(key)
  return await get('get-mind-data', { address: key })
}

export default get_mind