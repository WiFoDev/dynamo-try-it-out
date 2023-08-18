import { NextResponse } from "next/server";
import { ddbDocClient } from "../../../../lib/dynamodbClient";
import { DeleteCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

export async function GET(
  request: Request,
  { params: { username } }: { params: { username: string } }
) {
  const command = new GetCommand({
    TableName: process.env.USERS_TABLE_NAME,
    Key: {
      Username: username,
    },
    // ExpressionAttributeNames: {
    //   "#u": "Username",
    //   "#a": "Age",
    // },
    // ProjectionExpression: "#u, #a",
  });

  const response = await ddbDocClient.send(command);

  if (!response.Item) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ data: response.Item });
}

export async function DELETE(
  request: Request,
  { params: { username } }: { params: { username: string } }
) {
  try {
    const command = new DeleteCommand({
      TableName: process.env.USERS_TABLE_NAME,
      Key: {
        Username: username,
      },
    });
    await ddbDocClient.send(command);
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
  return NextResponse.json({ data: "User deleted" });
}
