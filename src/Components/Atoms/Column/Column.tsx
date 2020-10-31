import React from "react"
import "./styles.css"

interface PropsTypes {
  children?: React.ReactNode
}

export default ({ children }: PropsTypes) => {
  return <div className="column">{children}</div>
}
