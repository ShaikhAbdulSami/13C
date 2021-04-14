const AWS = require('aws-sdk');
const Client = new AWS.DynamoDB.DocumentClient();

async function getLollyByPath(link: string) {
    const params = {
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Key: { link: link }
    }
    try {
        const { Item } = await Client.get(params).promise()
        return Item
    } catch (err) {
        console.log('DynamoDB error: ', err)
    }
}

export default getLollyByPath