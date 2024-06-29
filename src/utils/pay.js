import { ENV, ENVIRONMENT, NETWORK, PAY, RECIPIENT } from "@/stores/constant"
import ERRORCODE from "@/stores/ERRORCODE"
import Web3 from "web3"
import { post } from "./network"


      
//   if (resp.code === ERRORCODE.SUCCESS) {
//     const data = {
//       type   : 'ether',
//       action : 'save remote',
//       params : {
//         from   : resp.data.from,
//         txhash : resp.data.txhash
//       }
//     }
//     const result = await post('pay', data)
//     resolve(result)
//   }
//   else {
//     console.error(resp.message)
//     resolve(resp)
//   }
// }

const pay_eth = async (resp, amount) => {
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
  const estimate_gas = await web3.eth.estimateGas({ from, to: RECIPIENT })
  const tx           = {
    from,
    to    : RECIPIENT,
    value : web3.utils.toWei(amount, 'ether'),
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

  resp.data = { from, tx_hash }
  // const info = {
  //   type   : PAY.ETHER,
  //   params : { from, tx_hash }
  // }
  // resp = await post('pay', info)
  return resp
}

const pay = (type, amount) => {
  return new Promise(async resolve => {
    let resp = {
      code    : ERRORCODE.SUCCESS,
      message : null,
      data    : null
    }

    if (type === PAY.ETHER) {
      try {
        resp = await pay_eth(resp, amount)
      }
      catch (e) {
        resp.data    = e.stack
        if (e.code === 4001) {
          resp.code    = ERRORCODE.PAY_ERROR
          resp.message = '切换网络 / 登录钱包异常'
        }
        else if (e.code === -32000) {
          resp.code    = ERRORCODE.PAY_ERROR
          resp.message = '输入异常'
        }
        else {
          debugger
          resp.code    = ERRORCODE.CODE_ERROR
          resp.message = '代码异常'
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