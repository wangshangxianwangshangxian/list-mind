import ERRORCODE from "@/utils/ERRORCODE"
import { get, post } from "@/utils/network"

export default async address => {
  const resp = await get('get-analyze-data', { address })
  if (resp.code === ERRORCODE.SUCCESS) {
    const data = { address }
    post('set-analyze-mind-view', data)
  }
}