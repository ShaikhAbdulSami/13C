import * as AWS from "aws-sdk"
//import { CodePipeline } from "aws-sdk"
//import { pipeline } from "stream"
import { LollyType } from "./lolly"

const AddLolly = async (addlolly: LollyType) => {
  const Client = new AWS.DynamoDB.DocumentClient()
  const codepipeline = new AWS.CodePipeline();
  const params: any = {
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Item: addlolly,
  }
  try {
    await Client.put(params).promise()
    // await codepipeline.startPipelineExecution({
    //   name: 'LollyServerStack-GatsbyPipelineA39796C7-1SGY2E8I290CN'
    // }).promise()
    return addlolly
  } catch (error) {
    return error.toString()
  }
}

export default AddLolly