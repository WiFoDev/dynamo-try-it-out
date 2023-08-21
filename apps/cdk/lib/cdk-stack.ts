import * as cdk from "aws-cdk-lib";
import {
  AttributeType,
  BillingMode,
  LocalSecondaryIndexProps,
  Table,
  CfnGlobalTable,
  ProjectionType,
} from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const orderTable = new Table(this, "UserOrdersTable", {
      partitionKey: { name: "Username", type: AttributeType.STRING },
      sortKey: { name: "OrderId", type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    orderTable.addLocalSecondaryIndex({
      indexName: "UserAmountIndex",
      sortKey: {
        name: "Amount",
        type: AttributeType.NUMBER,
      },
      projectionType: ProjectionType.KEYS_ONLY,
    });

    orderTable.addGlobalSecondaryIndex({
      indexName: "ReturnDataeOrderIdIndex",
      partitionKey: {
        name: "ReturnDate",
        type: AttributeType.STRING,
      },
      sortKey: {
        name: "OrderId",
        type: AttributeType.STRING,
      },
    });

    new cdk.CfnOutput(this, "OrdersTableName", { value: orderTable.tableName });
  }
}
