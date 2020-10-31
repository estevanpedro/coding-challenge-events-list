import React from "react"
import { utils } from "ethers"
import moment from "moment"
import { Column, Text, Item, Avatar } from "../index"

export default ({ event }: any) => {
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
          User {"UserAddress"} claimed {amount}
          {token} payout from pot {fundingPotId}.
        </Text>
        <Text>{moment.unix(event.date).format("d MMM")}</Text>
      </Column>
    </Item>
  )
}
