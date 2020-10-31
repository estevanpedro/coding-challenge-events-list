import React from "react"
import "./styles.css"

interface PropsTypes {
  children?: React.ReactNode
  className?: string
}

export default ({ children, className }: PropsTypes) => {
  return <span className={className ? className : "primary"}>{children}</span>
}
