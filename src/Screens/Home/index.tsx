import React, { useEffect, useState } from "react"
import Home from "./Home"
import colonyClient from "../../Hooks/colonyClient"
import colonyEventHandler from "../../Hooks/colonyEventHandler"
import useInfura from "../../Hooks/axios"
import { LogProps, EventType } from "./Types"

//** This index is used to treat the data, getting, connecting and sorting all events*/
export default () => {
  // getting error with log[] type in events (that's why: any)
  const [events, setEvents] = useState<any>()
  // no instance type found in documentation of colony
  const [instance, setInstance] = useState<any>()
  const { getTimeByBlockHash } = useInfura()
  const [loadedDates, setLoadedDates] = useState<boolean>(false)
  const [readToRender, setReadToRender] = useState<boolean>(false)

  //** Getting the events */
  useEffect(() => {
    const getEventLogs = async () => {
      const instance = await colonyClient()
      setInstance(instance)
      const events = await colonyEventHandler(instance)

      console.log(typeof events.allEvents[0])
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

  //** Sorting by date */
  useEffect(() => {
    events &&
      events.allEvents.sort(function (a: EventType, b: EventType) {
        return b.date - a.date
      })
    events && setReadToRender(true)
  }, [loadedDates])

  return <Home readToRender={readToRender} events={events} />
}
