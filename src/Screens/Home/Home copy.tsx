import React, { useEffect, useState } from "react"
import colonyEventHandler from "../../Hooks/colonyEventHandler"
import Blockies from "../../Hooks/Blockies"
import { utils } from "ethers"
import {
  Column,
  Text,
  Container,
  ListItems,
  Item,
  Avatar,
} from "../../Components/index"
import colonyClient from "../../Hooks/colonyClient"
import { getBlockTime } from "@colony/colony-js"
import { InfuraProvider } from "ethers/providers"

export default () => {
  const provider = new InfuraProvider()
  const wei = new utils.BigNumber(10)
  const [events, setEvents] = useState<any>()
  const [loaded, setLoaded] = useState<any>(false)
  const [payoutsUserAddress, setPayoutsUserAddress] = useState<any>([])
  const [instance, setInstance] = useState<any>()

  useEffect(() => {
    const getEventLogs = async () => {
      const instance = await colonyClient()
      setInstance(instance)
      const events = await colonyEventHandler(instance)
      setEvents(events)
    }
    getEventLogs()
  }, [])

  const getBlockTime = async (singleLog: any) => {
    const logTime: any = await getBlockTime(singleLog.blockHash)
    return logTime
  }

  const humanReadableAmount = (singleLog: any) => {
    return new utils.BigNumber(singleLog.values.amount)
  }

  const humanReadableFundingPotId = (singleLog: any) => {
    return new utils.BigNumber(singleLog.values.fundingPotId).toString()
  }

  let addresses: any = []
  return (
    <Container>
      <ListItems>
        {events &&
          events.payoutClaimedParsedLogs.map((data: any, index: any) => {
            const token = events.payoutClaimedParsedLogs[index].values.token
            const singleLog = events.payoutClaimedParsedLogs[index]
            const fundingPotId = humanReadableFundingPotId(singleLog)
            const amount = humanReadableAmount(singleLog)
              .div(wei.pow(18))
              .toNumber()
            let newArray = payoutsUserAddress
            return (
              <Item>
                <Avatar address={fundingPotId} />
                <Column>
                  <Text>
                    User {loaded && newArray[index]} claimed {amount}
                    {token} payout from pot {fundingPotId}.
                  </Text>
                  <Text>{index}</Text>
                </Column>
              </Item>
            )
          })}
      </ListItems>
    </Container>
  )
}

//
//
//

// (onFulfilled, onRejected)
// const onFulfilled = (e: any) => {
//   return e
// }
// const onRejected = (e: any) => {
//   console.log("[onRejected] e:", e)
//   return "onRejected"
// }

// const getUserAddress = async (fundingPotId: any) => {
//   const { associatedTypeId } = await instance.getFundingPot(fundingPotId)
//   const { recipient: userAddress } = await instance.getPayment(
//     associatedTypeId
//   )
//   return userAddress
// }

// if (index <= 5) {
//   const userAddress = getUserAddress(fundingPotId)
//   userAddress.then(function (result) {
//     newArray.push(result)

//     // if (index === events.eventLogs.length - 1) {
//     if (index === 5) {
//       // setPayoutsUserAddress(newArray)
//       setLoaded(true)
//       // console.log("last index", index)
//     }
//   })
// }
