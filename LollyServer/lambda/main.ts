import AllLolly from "./AllLolly"
import AddLolly from "./AddLolly"
import { LollyType } from "./lolly"
import getLollyByPath from "./getLollyByPath"

type AppsyncType = {
  info: {
    fieldName: string
  }
  arguments: {
    addlolly: LollyType
    link: string
  }
}

exports.handler = async (event: AppsyncType) => {
  switch (event.info.fieldName) {
    case "AllLolly":
      return await AllLolly()
    case "AddLolly":
      return await AddLolly(event.arguments.addlolly)
    case "getLollyByPath":
      return await getLollyByPath(event.arguments.link)
    default:
      return null
  }
}