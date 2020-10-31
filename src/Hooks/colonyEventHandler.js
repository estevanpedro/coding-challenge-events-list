import { getLogs } from "@colony/colony-js"

export default async instance => {
  const colonyInitialised = instance.filters.ColonyInitialised()
  const colonyInitialisedEventLogs = await getLogs(instance, colonyInitialised)

  const payoutClaimed = instance.filters.PayoutClaimed()
  const payoutClaimedEventLogs = await getLogs(instance, payoutClaimed)

  const colonyRoleSet = instance.filters.ColonyRoleSet()
  const roleEventLogs = await getLogs(instance, colonyRoleSet)

  const domainAdded = instance.filters.DomainAdded()
  const domainAddedEventLogs = await getLogs(instance, domainAdded)

  let allEvents = [
    ...colonyInitialisedEventLogs,
    ...payoutClaimedEventLogs,
    ...roleEventLogs,
    ...domainAddedEventLogs,
  ]

  return {
    allEvents,
  }
}
