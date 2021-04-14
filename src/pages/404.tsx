import React from "react"
import {Lolly} from "../components/Lolly"
import Header from "../components/Header"
import { useQuery, gql } from "@apollo/client"
import "../styles/404.css"
import Result from "../components/Result"

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
        <Header />
        <div className="lollyFormDiv">

            <div>
                <Lolly top={data.getLollyByPath.color1} middle={data.getLollyByPath.color2} bottom={data.getLollyByPath.color3} />
            </div>

            <Result link={data.getLollyByPath.link} reciever={data.getLollyByPath.reciever} sender={data.getLollyByPath.sender} message={data.getLollyByPath.message} />
        </div>
    </div>)}
    </div>
  )
}
