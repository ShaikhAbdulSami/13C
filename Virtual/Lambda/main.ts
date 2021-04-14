import AllLolly from "./Lolly"
import AddLolly from "./AddLolly"
import { LollyType } from "./lollyType"
import GetByPath from "./GetByPath"

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
      case "GetByPath":
        return await GetByPath(event.arguments.link)
    default:
      return null
  }
}