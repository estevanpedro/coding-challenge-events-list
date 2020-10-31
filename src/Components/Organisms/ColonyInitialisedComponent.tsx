import React from "react"
import moment from "moment"
import { Column, Text, Item, Avatar } from "../index"
import { EventType } from "../../Screens/Home/Types"

export default ({ event }: EventType | any) => {
  return (
    <Item>
      <Avatar randomString={event.raw.blockHash} />
      <Column>
        <Text>Congratulations! It's a beautiful baby colony!</Text>
        <Text className={"secondary"}>
          {moment(event.date).format("D MMM")}
        </Text>
      </Column>
    </Item>
  )
}
