import React from "react"
import {Lolly} from "../components/Lolly"
import Header from "../components/Header"
import { useQuery, gql } from "@apollo/client"
import "../styles/404.css"

const GET_LOLLY_BY_PATH = gql`
  query get_lollies($link: String!) {
    getLollyByPath(link: $link) {
      color1
      color2
      color3
      link
      message
      reciever
      sender
    }
  }
`

export default function NotFound({ location }) {
  //var queryLollies = location.pathname.slice(0, 9)
  var queryPath = location.pathname.split('/')[2]

  const { loading, error, data } = useQuery(GET_LOLLY_BY_PATH, {
    variables: { link: `${queryPath}` },
  })

  return (
    <div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div>
          <Header/>
          <h5 className="sharableLinkContainer">Your sharable link: </h5>{" "}
          <span className="sharableLink">
            {" "}
            {`http://localhost:8888/lolly/${data.getLollyByPath.link}`}
          </span>
          <div className="recievedContentContainer">
            <Lolly
              className="lollyRecieved"
              top={data.getLollyByPath.color1}
              middle={data.getLollyByPath.color2}
              bottom={data.getLollyByPath.color3}
            />

            <div className="recievedTextContainer">
              <h3>HI {data.getLollyByPath.reciever.toUpperCase()}</h3>
              <p>{data.getLollyByPath.message}</p>
              <h4>From: {data.getLollyByPath.sender}</h4>
            </div>
          </div>
        </div>
      )} : (
        <div className="pageNotFound">{error}</div>
      )
    </div>
  )
}
