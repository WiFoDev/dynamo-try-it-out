import * as cdk from "aws-cdk-lib";
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new Table(this, "UsersTable", {
      partitionKey: { name: "Username", type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    new cdk.CfnOutput(this, "TableNameOutput", { value: table.tableName });
  }
}
