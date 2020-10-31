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

  return {
    getTimeByBlockHash,
  }
}
export default useInfura
