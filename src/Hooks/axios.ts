import axios from "axios"

const URL = "https://mainnet.infura.io/v3/30cc12fd512d47f39d4aa8a438a95efb"

const useInfura = () => {
  const getTimeByBlockHash = async (blockHash: string) => {
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

      return parseInt(response.data.result.timestamp)
    } catch (err) {
      return err
    }
  }

  const getAddressByTransactionHash = async (transactionHash: string) => {
    try {
      const response = await axios.post(
        `${URL}`,
        {
          jsonrpc: "2.0",
          method: "eth_getTransactionReceipt",
          params: [transactionHash],
          id: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      console.log("from: ", response.data.result.from)
      console.log("to: ", response.data.result.to)
      return response
    } catch (err) {
      return err
    }
  }

  return {
    getTimeByBlockHash,
    getAddressByTransactionHash,
  }
}
export default useInfura
