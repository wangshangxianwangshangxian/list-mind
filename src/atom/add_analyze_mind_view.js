import ERRORCODE from "@/stores/ERRORCODE"
import { get, post } from "@/utils/network"

const add_analyze_mind_view = async address => {
  const resp = await get('get-analyze-data', { address })
  if (resp.code === ERRORCODE.SUCCESS) {
    const data = { address }
    post('set-analyze-mind-view', data)
  }
}

export default add_analyze_mind_view