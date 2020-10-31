import React, { useEffect, useState } from "react"
import Home from "./Home"
import colonyClient from "../../Hooks/colonyClient"
import colonyEventHandler from "../../Hooks/colonyEventHandler"
import useInfura from "../../Hooks/axios"
import { LogProps, EventType } from "./Types"
import { utils } from "ethers"

//** This index is used to treat the data, getting, connecting and sorting all events*/
export default () => {
  // getting error with log[] type in events (that's why: any)
  const [events, setEvents] = useState<any>()
  // no instance type found in documentation of colony
  const [instance, setInstance] = useState<any>()
  const { getTimeByBlockHash, getAddressByTransactionHash } = useInfura()
  const [loadedDates, setLoadedDates] = useState<boolean>(false)
  const [loadedAddress, setLoadedAddress] = useState<boolean>(false)
  const [readToRender, setReadToRender] = useState<boolean>(false)

  //
  // address

  // const getAddress = async (singleEvent: any) => {
  //   // if (events) {
  //   // console.log("events: ", events.allEvents[0].parsed)

  //   // if (singleEvent) {
  //   const humanReadableFundingPotId = new utils.BigNumber(
  //     singleEvent.parsed.values.fundingPotId
  //   ).toString()
  //   const { associatedTypeId } = await instance.getFundingPot(
  //     humanReadableFundingPotId
  //   )
  //   const { recipient: userAddress } = await instance.getPayment(
  //     associatedTypeId
  //   )
  //   console.log("userAddress: ", userAddress)
  //   // }

  //   // const address = await getAddressByTransactionHash(
  //   //   singleEvent.raw.transactionHash.toString()
  //   // )
  //   return userAddress
  // }

  //
  //** Getting the events */
  useEffect(() => {
    const getEventLogs = async () => {
      const instance = await colonyClient()
      setInstance(instance)
      const events = await colonyEventHandler(instance)
      setEvents(events)
    }
    getEventLogs()
  }, [])

  //** Getting the dates and grouping */
  useEffect(() => {
    events &&
      events.allEvents.forEach((e: LogProps, index: number) => {
        getTimeByBlockHash(e.blockHash).then(date => {
          events.allEvents[index] = {
            parsed: instance.interface.parseLog(events.allEvents[index]),
            raw: events.allEvents[index],
            date: date,
          }
          //** setTimeout used to wait promise to solve before it renders */
          if (index === events.allEvents.length - 1) {
            setTimeout(function () {
              setLoadedDates(true)
            }, 1000)
          }
        })
      })
  }, [events])

  useEffect(() => {
    if (loadedDates) {
      events.allEvents.forEach((e: any, index: number) => {
        if (e.parsed.name === "PayoutClaimed") {
          const getAddress = async () => {
            const humanReadableFundingPotId = new utils.BigNumber(
              e.parsed.values.fundingPotId
            ).toString()
            const { associatedTypeId } = await instance.getFundingPot(
              humanReadableFundingPotId
            )
            const { recipient: userAddress } = await instance.getPayment(
              associatedTypeId
            )
            return userAddress
          }
          getAddress().then(address => {
            events.allEvents[index].userAddress = address
          })
        }
        if (index === events.allEvents.length - 1) {
          setTimeout(function () {
            setLoadedAddress(true)
          }, 2000)
        }
      })
    }
  }, [loadedDates])

  //** Sorting by date */
  useEffect(() => {
    if (loadedAddress) {
      events &&
        events.allEvents.sort(function (a: EventType, b: EventType) {
          return b.date - a.date
        })
      events && setReadToRender(true)
    }
  }, [loadedDates, loadedAddress])

  return (
    <Home
      readToRender={readToRender}
      events={events}
      loadedAddress={loadedAddress}
    />
  )
}
