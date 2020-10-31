import React from "react"
import Blockies from "../../../Hooks/Blockies"
import "./styles.css"

interface PropsTypes {
  randomString: string
}

export default ({ randomString }: PropsTypes) => {
  const src = Blockies(randomString)
  return <img className="avatar" src={src} />
}
