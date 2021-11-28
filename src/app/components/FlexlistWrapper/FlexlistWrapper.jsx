import React from "react"

export default function FlexlistWrapper({children}) {
  return(
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly",
      flexWrap: "wrap",
      gap: "50px 50px",
      padding: "0px 160px",
      margin: "auto 0px",
    }}>
      {children}
    </div>
  )
}
