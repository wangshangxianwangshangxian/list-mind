import { ec } from "elliptic"
export default () => {
  const key_pair = (new ec('secp256k1')).genKeyPair()
  const key      = key_pair.getPrivate().toString('hex')
  return key
}