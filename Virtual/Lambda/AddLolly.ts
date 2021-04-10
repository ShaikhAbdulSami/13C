import * as AWS from "aws-sdk"
//import { CodePipeline } from "aws-sdk"
//import { pipeline } from "stream"
import { LollyType } from "./lollyType"

const NewLolly = async (addlolly: LollyType) => {
  const Client = new AWS.DynamoDB.DocumentClient()
  const codepipeline = new AWS.CodePipeline();
  const params: any = {
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Item: addlolly,
  }
  try {
    await Client.put(params).promise()
    await codepipeline.startPipelineExecution({
      name:  'VirtualStack-GatsbyPipelineA39796C7-1R5W4E3H6D90D'
    }).promise()
    return addlolly
  } catch (error) {
    return error.toString()
  }
}

export default NewLolly