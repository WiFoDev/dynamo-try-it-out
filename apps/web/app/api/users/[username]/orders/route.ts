import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { dynamodbClient } from "db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params: { username } }) {
  try {
    // const command = new QueryCommand({
    //   TableName: process.env.USER_ORDERS_TABLE_NAME,
    //   ExpressionAttributeNames: {
    //     "#u": "Username",
    //     "#o": "OrderId",
    //     "#a": "Amount",
    //   },
    //   ExpressionAttributeValues: {
    //     ":u": {
    //       S: username,
    //     },
    //     ":startDate": {
    //       S: "20170101",
    //     },
    //     ":endDate": {
    //       S: "20180101",
    //     },
    //   },
    //   KeyConditionExpression: "#u = :u AND #o BETWEEN :startDate AND :endDate",
    //   ProjectionExpression: "#a",
    // });
    const command = new QueryCommand({
      TableName: process.env.USER_ORDERS_TABLE_NAME,
      KeyConditionExpression: "#username = :username AND begins_with(#o,:o)",
      FilterExpression: "#amount > :amount",
      ExpressionAttributeNames: {
        "#username": "Username",
        "#amount": "Amount",
        "#o": "OrderId",
      },
      ExpressionAttributeValues: {
        ":username": {
          S: username,
        },
        ":amount": {
          N: "100",
        },
        ":o": {
          S: "20170609",
        },
      },
    });
    const res = await dynamodbClient.send(command);
    return NextResponse.json(res);
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
