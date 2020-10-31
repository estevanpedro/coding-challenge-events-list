import { getLogs, getBlockTime } from "@colony/colony-js"
import { InfuraProvider } from "ethers/providers"
import useInfura from "./axios"

export default async instance => {
  const { getTimeByBlockHash } = useInfura()
  var gotAllDates = false
  const provider = new InfuraProvider()

  const payoutClaimed = instance.filters.PayoutClaimed()
  const payoutClaimedEventLogs = await getLogs(instance, payoutClaimed)
  const payoutClaimedParsedLogs = payoutClaimedEventLogs.map(event =>
    instance.interface.parseLog(event)
  )

  const colonyRoleSet = instance.filters.ColonyRoleSet()
  const roleEventLogs = await getLogs(instance, colonyRoleSet)
  const roleParsedLogs = roleEventLogs.map(event =>
    instance.interface.parseLog(event)
  )

  const domainAdded = instance.filters.DomainAdded()
  const domainAddedEventLogs = await getLogs(instance, domainAdded)
  const domainAddedParsedLogs = domainAddedEventLogs.map(event =>
    instance.interface.parseLog(event)
  )

  let allEvents = [
    ...payoutClaimedEventLogs,
    ...roleEventLogs,
    ...domainAddedEventLogs,
  ]

  // const logTime = await getBlockTime(provider, singleLog.blockHash)
  // console.log("logTime: ", logTime)
  // const getTime = async singleLog => {
  //   const logTime = await getBlockTime(provider, singleLog.blockHash)
  //   return logTime
  // }

  let allEventsByDate = []

  return {
    allEvents,
    // payoutClaimedParsedLogs,
    // roleParsedLogs,
    // domainAddedParsedLogs,
  }
}

// allEvents.forEach((e, index) => {
//   const eventDate = getTimeByBlockHash(e.blockHash)
//   allEvents[index].date = eventDate
// })
