import AllLolly from "./Lolly"
import AddLolly from "./AddLolly"
import { LollyType } from "./lollyType"

type AppsyncType = {
  info: {
    fieldName: string
  }
  arguments: {
    addlolly: LollyType
    // link: string
  }
}

exports.handler = async (event: AppsyncType) => {
  switch (event.info.fieldName) {
    case "AllLolly":
      return await AllLolly()
    case "AddLolly":
      return await AddLolly(event.arguments.addlolly)
    default:
      return null
  }
}