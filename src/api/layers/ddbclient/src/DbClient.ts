import { DynamoDB, DynamoDBClientConfig, WriteRequest } from '@aws-sdk/client-dynamodb';
import {
  DeleteCommand,
  DeleteCommandInput,
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
  QueryCommand,
  QueryCommandInput,
  ScanCommand,
  ScanCommandInput,
  UpdateCommand,
  UpdateCommandInput,
  BatchWriteCommand,
  BatchWriteCommandInput,
} from '@aws-sdk/lib-dynamodb';

export { BatchWriteCommandInput };

const defaultClientConfig = process.env['AWS_SAM_LOCAL']
  ? {
      endpoint: `http://${process.env['DDBEndpoint']}`,
    }
  : {
      apiVersion: '2012-08-10',
      region: 'eu-central-1',
    };

class DbClient {
  ddbDocClient;

  constructor(config: DynamoDBClientConfig = defaultClientConfig) {
    const ddbClient = new DynamoDB(config);

    const marshallOptions = {
      // Whether to automatically convert empty strings, blobs, and sets to `null`.
      convertEmptyValues: false, // false, by default.
      // Whether to remove undefined values while marshalling.
      removeUndefinedValues: true, //TODO false, by default.
      // Whether to convert typeof object to map attribute.
      convertClassInstanceToMap: true, // false, by default.
    };

    const unmarshallOptions = {
      // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
      wrapNumbers: false, // false, by default.
    };

    const translateConfig = { marshallOptions, unmarshallOptions };

    // Create the DynamoDB Document client.
    this.ddbDocClient = DynamoDBDocumentClient.from(ddbClient, translateConfig);
  }

  async query(params: QueryCommandInput) {
    try {
      // TODO try GetCommand instead https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-example-dynamodb-utilities.html
      const data = await this.ddbDocClient.send(new QueryCommand(params));
      return data?.Items;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async get(params: GetCommandInput) {
    try {
      const data = await this.ddbDocClient.send(new GetCommand(params));
      return data?.Item;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async put(params: PutCommandInput) {
    try {
      const data = await this.ddbDocClient.send(new PutCommand(params));
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async batchPut(params: BatchWriteCommandInput) {
    try {
      const data = await this.ddbDocClient.send(new BatchWriteCommand(params));
      return data;
      // await ddbClient.send(new BatchWriteItemCommand(input));
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async delete(params: DeleteCommandInput) {
    try {
      const data = await this.ddbDocClient.send(new DeleteCommand(params));
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async update(params: UpdateCommandInput) {
    try {
      const data = await this.ddbDocClient.send(new UpdateCommand(params));
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async scan(params: ScanCommandInput) {
    try {
      // TODO try GetCommand instead https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-example-dynamodb-utilities.html
      const data = await this.ddbDocClient.send(new ScanCommand(params));
      return data?.Items;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export { DbClient };
