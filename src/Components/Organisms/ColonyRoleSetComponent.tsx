import React from "react"
import { utils } from "ethers"
import moment from "moment"
import { Column, Text, Item, Avatar } from "../index"

export default ({ event }: any) => {
  const domainId = new utils.BigNumber(event.parsed.values.domainId).toString()
  return (
    <Item>
      <Avatar randomString={event.raw.transactionHash} />
      <Column>
        <Text>
          {event.parsed.values.role} role assigned to user{" "}
          {event.parsed.values.user}
          in domain {domainId}
          {}
        </Text>
        <Text>{moment.unix(event.date).format("d MMM")}</Text>
      </Column>
    </Item>
  )
}
