import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "seasons",
    Item: {
        userId: event.requestContext.identity.cognitoIdentityId,
        seasonId: uuid.v1(),
        seasonName: data.seasonName,
        createdAt: Date.now()
      }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({status: false});
  }
}