import * as AWS from "aws-sdk";

// to know more about promises()
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/using-promises.html

const Client = new AWS.DynamoDB.DocumentClient();
const AllLolly = async () => {
  const params: any = {
    TableName: process.env.DYNAMODB_TABLE_NAME,
  };
  try {
    const result = await Client.scan(params).promise();
    return result.Items;
  } catch (error) {
    console.log("DynamoDB error: ", error);
    return error.toString();
  }
};
export default AllLolly;
