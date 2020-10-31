import React from "react"
import LoadingPng from "../../Assets/YourColonyYourRules_01.svg"
import { PropsTypes, EventType } from "./Types"
import {
  ColonyInitialisedComponent,
  ColonyRoleSetComponent,
  PayoutClaimedComponent,
  DomainAddedComponent,
  Container,
  ListItems,
} from "../../Components/index"

//** This component renders a list of all event */
export default ({ readToRender, events, loadedAddress }: PropsTypes) => {
  return (
    <Container>
      {readToRender && loadedAddress ? (
        <ListItems>
          {events &&
            events.allEvents.map((event: EventType, index: number) => {
              if (event.parsed.name === "DomainAdded") {
                return <DomainAddedComponent event={event} key={index} />
              }
              if (event.parsed.name === "ColonyRoleSet") {
                return <ColonyRoleSetComponent event={event} key={index} />
              }
              if (event.parsed.name === "PayoutClaimed") {
                return (
                  <PayoutClaimedComponent
                    event={event}
                    userAddress={event.userAddress}
                    key={index}
                  />
                )
              }
              if (event.parsed.name === "ColonyInitialised") {
                return <ColonyInitialisedComponent event={event} key={index} />
              } else {
                return <></>
              }
            })}
        </ListItems>
      ) : (
        <>
          <img src={LoadingPng} width={100} />
          <p>Loading</p>
        </>
      )}
    </Container>
  )
}
