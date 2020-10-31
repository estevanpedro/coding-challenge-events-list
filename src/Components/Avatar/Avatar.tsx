import React from "react"
import Blockies from "../../Hooks/Blockies"
import "./styles.css"

export default ({ address }: any) => {
  const src = Blockies(address)
  return <img className="avatar" src={src} />
}
