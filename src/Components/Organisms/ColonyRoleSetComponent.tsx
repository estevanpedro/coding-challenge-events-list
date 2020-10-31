import React from "react"
import { utils } from "ethers"
import moment from "moment"
import { Column, Text, Item, Avatar } from "../index"
import { ColonyRole } from "@colony/colony-js"
import { EventType } from "../../Screens/Home/Types"

export default ({ event }: EventType | any) => {
  const domainId = new utils.BigNumber(event.parsed.values.domainId).toString()
  const roleNumber = event.parsed.values.role
  return (
    <Item>
      <Avatar randomString={event.raw.transactionHash} />
      <Column>
        <Text>
          <Text className={"primaryBold"}>
            {Object.values(ColonyRole)[roleNumber]}
          </Text>{" "}
          role assigned to user{" "}
          <Text className={"primaryBold"}>{event.parsed.values.user}</Text> in
          domain <Text className={"primaryBold"}>{domainId}</Text>
        </Text>
        <Text className={"secondary"}>
          {moment(event.date).format("D MMM YYYY")}
        </Text>
      </Column>
    </Item>
  )
}
