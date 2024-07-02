import { post } from "@/utils/network"
import encrypt_signature from "@/utils/encrypt_signature"

const save_remote = async mind => {
  const data = encrypt_signature(mind)
  const param = {
    mind,
    unzip_address: data.address,
    signature    : data.signature
  }
  const resp = await post('save', param)
  return resp
}

export default save_remote