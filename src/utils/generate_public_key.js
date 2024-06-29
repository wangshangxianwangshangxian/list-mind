import { PUBLIC_LEN } from "@/stores/constant"
import { ec } from "elliptic"

export default private_key => {
  const curve = new ec('secp256k1')
  const pair  = curve.keyFromPrivate(private_key)
  const key   = '0x' + pair.getPublic(true, 'hex').slice(-PUBLIC_LEN)
  return key
}