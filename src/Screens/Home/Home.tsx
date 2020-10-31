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
import useInfura from "../../Hooks/axios"

export default () => {
  const [readToRender, setReadToRender] = useState<boolean>(false)
  const { getTimeByBlockHash } = useInfura()
  const provider = new InfuraProvider()
  const wei = new utils.BigNumber(10)
  const [events, setEvents] = useState<any>()
  const [loaded, setLoaded] = useState<any>(false)
  const [loadedDates, setLoadedDates] = useState<any>(false)
  const [payoutsUserAddress, setPayoutsUserAddress] = useState<any>([])
  const [instance, setInstance] = useState<any>()
  const [eventsByDate, setEventsByDate] = useState<any>([])

  let allEventsByDate = []

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

  useEffect(() => {
    events &&
      events.allEvents.forEach((e: any, index: any) => {
        getTimeByBlockHash(e.blockHash).then(date => {
          events.allEvents[index] = {
            parsed: instance.interface.parseLog(events.allEvents[index]),
            raw: events.allEvents[index],
            date: date,
          }
          if (index === events.allEvents.length - 1) {
            setTimeout(function () {
              setLoadedDates(true)
            }, 1000)
          }
        })
      })
  }, [events])

  useEffect(() => {
    events &&
      events.allEvents.sort(function (a: any, b: any) {
        return b.date - a.date
      })

    events && setReadToRender(true)
  }, [loadedDates])
  console.log("events.allEvents: ", events && events.allEvents)
  console.log(readToRender)
  return (
    <Container>
      <ListItems>
        {readToRender === true ? (
          eventsByDate.map((event: any, index: any) => {
            console.log("event: ", event)
          })
        ) : (
          <>
            <p>Loading</p>
          </>
        )}
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
// {events &&
//           events.payoutClaimedParsedLogs.map((data: any, index: any) => {
//             const token = events.payoutClaimedParsedLogs[index].values.token
//             const singleLog = events.payoutClaimedParsedLogs[index]
//             const fundingPotId = humanReadableFundingPotId(singleLog)
//             const amount = humanReadableAmount(singleLog)
//               .div(wei.pow(18))
//               .toNumber()
//             return (
//               <Item>
//                 <Avatar address={fundingPotId} />
//                 <Column>
//                   <Text>
//                     User {"UserAddress"} claimed {amount}
//                     {token} payout from pot {fundingPotId}.
//                   </Text>
//                   <Text>{index}</Text>
//                 </Column>
//               </Item>
//             )
//           })}
//         {events &&
//           events.gotAllDates &&
//           events.allEventsByDate.map((data: any) => {
//             console.log(data)
//             return <p></p>
//           })}
