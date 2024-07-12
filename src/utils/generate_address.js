import { ec } from "elliptic"
import { PUBLIC_LEN } from "./constant"

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