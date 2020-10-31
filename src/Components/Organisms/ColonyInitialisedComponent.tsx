import React from "react"
import moment from "moment"
import { Column, Text, Item, Avatar } from "../index"

export default ({ event }: any) => {
  return (
    <Item>
      <Avatar randomString={event.raw.blockHash} />
      <Column>
        <Text>Congratulations! It's a beautiful baby colony!</Text>
        <Text>{moment.unix(event.date).format("d MMM")}</Text>
      </Column>
    </Item>
  )
}
