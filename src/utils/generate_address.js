import { PUBLIC_LEN } from "@/stores/constant"
import { ec } from "elliptic"

export default (key, zip = true) => {
  const curve   = new ec('secp256k1')
  const pair    = curve.keyFromPrivate(key)
  let address
  if (zip) {
    address = '0x' + pair.getPublic(true, 'hex').slice(-PUBLIC_LEN)
  }
  else {
    address = pair.getPublic().encode('hex').toString('hex')
  }
  return address
}