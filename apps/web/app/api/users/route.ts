import { PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { ddbDocClient } from "../../../lib/dynamodbClient";
import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";

interface CreateUserDTO {
  username: string;
  age?: number;
  name?: string;
}

export interface UpdateUserDTO extends Partial<CreateUserDTO> {}

export async function POST(req: Request) {
  const body: CreateUserDTO = await req.json();
  const command = new PutCommand({
    TableName: process.env.USERS_TABLE_NAME,
    Item: {
      Username: body.username,
      Age: 25,
      Name: "John Doe",
    },
    // ExpressionAttributeNames: {
    //   "#u": "Username",
    // },
    // ConditionExpression: "attribute_not_exists(#u)",
  });
  try {
    await ddbDocClient.send(command);
  } catch (e) {
    if (e.name === "ConditionalCheckFailedException") {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: e }, { status: 500 });
  }
  return NextResponse.json({ username: body.username }, { status: 201 });
}

export async function PUT(req: Request) {
  const body: Partial<CreateUserDTO> = await req.json();
  try {
    // const setCommand = new UpdateCommand({
    //   TableName: process.env.USERS_TABLE_NAME,
    //   Key: {
    //     Username: body.username,
    //   },
    //   ExpressionAttributeNames: {
    //     "#n": "Name",
    //     "#a": "Age",
    //   },
    //   ExpressionAttributeValues: {
    //     ":n": body.name,
    //     ":a": body.age,
    //   },
    //   UpdateExpression: "SET #n = :n, #a = :a",
    // });

    const command = new UpdateCommand({
      TableName: process.env.USERS_TABLE_NAME,
      Key: {
        Username: body.username,
      },
      ExpressionAttributeNames: {
        "#a": "Age",
      },
      UpdateExpression: "REMOVE #a",
    });
    await ddbDocClient.send(command);
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }

  return NextResponse.json({ username: body.username }, { status: 200 });
}
