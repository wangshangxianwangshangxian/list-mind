import { ENV, ENVIRONMENT, NETWORK, PAY } from "@/stores/constant"
import ERRORCODE from "@/utils/ERRORCODE"
import Web3 from "web3"

const pay_eth = async (resp, to, amount, data) => {
  if (!window.ethereum) {
    resp.code    = ERRORCODE.PAY_ERROR
    resp.message = '未安装MetaMask'
    return resp
  }

  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: ENVIRONMENT === ENV.DEV ? NETWORK.SEPOLIA : NETWORK.ETHER }],
  })
  await window.ethereum.request({ method: 'eth_requestAccounts' })
  
  const web3         = new Web3(window.ethereum)
  const [ from ]     = await web3.eth.getAccounts()
  const estimate_gas = 51000n
  const tx           = {
    from,
    to,
    value : web3.utils.toWei(amount, 'ether'),
    data,
    gas   : web3.utils.toHex(estimate_gas)
  }
  const tx_hash = await ethereum.request({ method: 'eth_sendTransaction', params: [tx], })

  // 查询交易是否上链
  while (1) {
    await new Promise(succ => setTimeout(succ, 1000))
    try {
      const flag = await web3.eth.getTransactionReceipt(tx_hash)
      if (flag) break
    }
    catch (e) {
      continue
    }
  }

  resp.data = { tx_hash }
  return resp
}

const pay = (type, to, amount, data) => {
  return new Promise(async resolve => {
    let resp = {
      code    : ERRORCODE.SUCCESS,
      message : null,
      data    : null
    }

    if (type === PAY.ETHER) {
      try {
        resp = await pay_eth(resp, to, amount, data)
      }
      catch (e) {
        resp.data    = e.stack
        if (e.code === 4001) {
          resp.code    = ERRORCODE.PAY_ERROR
          resp.message = '支付异常'
        }
        else if (e.code === -32000) {
          resp.code    = ERRORCODE.PAY_ERROR
          resp.message = '输入异常'
        }
        else {
          resp.code    = ERRORCODE.CODE_ERROR
          resp.message = '代码异常'
          resp.data    = e
        }
      }
    }
    else {
      resp.code    = ERRORCODE.NOT_FOUND
      resp.message = '找不到支付方式'
    }

    resolve(resp)
  })
}

export default pay