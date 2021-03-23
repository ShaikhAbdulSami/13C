import React from "react"
import Header from "../components/Header"

const NotFound = () => {
  return (
    <div>
      <Header />
      <div
        style={{
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "4rem",
        }}
      >

        <h1>Your lolly is in the freezer...</h1>
        <h1>Retry after 2-3 minutes😇</h1>
      </div>
    </div>
  )
}

export default NotFound
