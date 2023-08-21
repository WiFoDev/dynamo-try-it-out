import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { dynamodbClient } from "db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const command = new ScanCommand({
      TableName: process.env.USER_ORDERS_TABLE_NAME,
      Select: "COUNT",
    });
    const res = await dynamodbClient.send(command);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
