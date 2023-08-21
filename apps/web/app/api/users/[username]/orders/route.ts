import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { dynamodbClient } from "db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params: { username } }) {
  try {
    const command = new QueryCommand({
      TableName: process.env.USER_ORDERS_TABLE_NAME,
      IndexName: "UserAmountIndex",
      KeyConditionExpression: "#u = :u AND #a > :a",
      ExpressionAttributeNames: {
        "#u": "Username",
        "#a": "Amount",
      },
      ExpressionAttributeValues: {
        ":u": {
          S: username,
        },
        ":a": {
          N: "100",
        },
      },
    });
    const res = await dynamodbClient.send(command);
    return NextResponse.json(res);
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
