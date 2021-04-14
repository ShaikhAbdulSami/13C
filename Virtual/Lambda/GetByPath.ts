import * as AWS from "aws-sdk";

// to know more about promises()
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/using-promises.html

const client = new AWS.DynamoDB.DocumentClient();
const GetByPath = async (link: String) => {
  const params: any = {
    TableName: process.env.DYNAMODB_TABLE_NAME,
    key: {link: link}
  };
  try {
    const results = await client.query(params).promise();
    console.log(results)
    return results;
  } catch (error) {
    console.log("DynamoDB error: ", error);
    return error.toString();
  }
};
export default GetByPath;
