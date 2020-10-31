import React from "react"
import { utils } from "ethers"
import moment from "moment"
import { Column, Text, Item, Avatar } from "../index"
import { EventType } from "../../Screens/Home/Types"

export default ({ event, userAddress }: EventType | any) => {
  const wei = new utils.BigNumber(10)
  const token = event.parsed.values.token
  const singleLog = event.parsed
  const fundingPotId = new utils.BigNumber(
    singleLog.values.fundingPotId
  ).toString()
  const amount = new utils.BigNumber(singleLog.values.amount)
    .div(wei.pow(18))
    .toNumber()
  return (
    <Item>
      <Avatar randomString={event.raw.blockHash} />
      <Column>
        <Text>
          User <Text className={"primaryBold"}>{userAddress}</Text> claimed{" "}
          <Text className={"primaryBold"}>{amount}</Text>
          <Text className={"primaryBold"}>{token}</Text> payout from pot{" "}
          <Text className={"primaryBold"}>{fundingPotId}</Text>.
        </Text>
        <Text>{moment(event.date).format("D MMM")}</Text>
      </Column>
    </Item>
  )
}
