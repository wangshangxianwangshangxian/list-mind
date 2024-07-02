import elliptic from 'elliptic'
import { Web3 } from 'web3'
import generate_address from './generate_address'
import generate_key from './generate_key'

// key private key
// data object
export default (data) => {
  const web3        = new Web3()
  const ec          = new elliptic.ec('secp256k1')
  const private_key = generate_key()

  const hash        = web3.utils.sha3(JSON.stringify(data))
  const key         = ec.keyFromPrivate(private_key)
  const signature   = key.sign(hash).toDER('hex')
  const address     = generate_address(key, false)
  return {
    address,
    signature,
    data
  }
}