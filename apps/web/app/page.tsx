import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { Button, Header } from "ui";
import AddUserForm from "./components/AddUserForm";
import GetUserForm from "./components/GetUserForm";
import UpdateUserForm from "./components/UpdateUserForm";
import DeleteUserForm from "./components/DeleteUserForm";

export const client = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export default async function Page() {
  return (
    <>
      <h3>Add user Form</h3>
      <AddUserForm />
      <h3>Get User Form</h3>
      <GetUserForm />
      <h3>Update User Form</h3>
      <UpdateUserForm />
      <h3>Delete User Form</h3>
      <DeleteUserForm />
    </>
  );
}
