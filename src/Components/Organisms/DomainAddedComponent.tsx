import React from "react"
import { utils } from "ethers"
import moment from "moment"
import { Column, Text, Item, Avatar } from "../index"
import { EventType } from "../../Screens/Home/Types"

export default ({ event }: EventType | any) => {
  const domainId = new utils.BigNumber(event.parsed.values.domainId).toString()
  return (
    <Item>
      <Avatar randomString={event.raw.blockHash} />
      <Column>
        <Text>
          Domain <Text className={"primaryBold"}>{domainId}</Text> added.
        </Text>
        <Text className={"secondary"}>
          {moment(event.date).format("D MMM")}
        </Text>
      </Column>
    </Item>
  )
}
