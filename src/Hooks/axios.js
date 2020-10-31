import { useCallback } from "react"
import axios from "axios"

const URL = "https://mainnet.infura.io/v3/30cc12fd512d47f39d4aa8a438a95efb"

const a = {
  jsonrpc: "2.0",
  method: "eth_getBlockByHash",
  params: [
    "0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35",
    false,
  ],
  id: 1,
}
const useInfura = () => {
  const getTimeByBlockHash = async blockHash => {
    try {
      const response = await axios.post(
        `${URL}`,
        {
          jsonrpc: "2.0",
          method: "eth_getBlockByHash",
          params: [blockHash, true],
          id: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      //   console.log(new Date(response.data.result.timestamp))
      //   console.log(parseInt(response.data.result.timestamp))
      //   console.log(response.data.result.timestamp)

      return parseInt(response.data.result.timestamp)
    } catch (err) {
      return err
    }
  }

  return {
    getTimeByBlockHash,
  }
}
export default useInfura
