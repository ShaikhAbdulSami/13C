import * as AWS from "aws-sdk"
//import { CodePipeline } from "aws-sdk"
//import { pipeline } from "stream"
import { LollyType } from "./lollyType"
const client = new AWS.DynamoDB.DocumentClient()
const codepipeline = new AWS.CodePipeline();

  const NewLolly = async (addlolly: LollyType) => {
  const params: any = {
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Item: addlolly,
  }
  try {
    await client.put(params).promise()
    
    const result = await codepipeline.startPipelineExecution({
      name:  'VirtualStack-GatsbyPipelineA39796C7-1R5W4E3H6D90D'
    }).promise()
    console.log(result);
    return addlolly
  } catch (error) {
    return error.toString()
  }
}

export default NewLolly