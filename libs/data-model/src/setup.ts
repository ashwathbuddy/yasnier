import {
  DynamoDBClient,
  BatchWriteItemCommand,
  BatchWriteItemCommandInput,
  WriteRequest,
  CreateTableCommand,
  CreateTableCommandInput,
} from '@aws-sdk/client-dynamodb';

import { DB_SCHEMA } from './utils/marshal';
import { DB_SAMPLE } from './sample';

const ddbClient = new DynamoDBClient({ endpoint: 'http://localhost:8000', region: 'eu-central-1' });

// create schema
const schemaInputs: CreateTableCommandInput[] = DB_SCHEMA;
for (const input of schemaInputs) {
  const inputCmd = input as unknown as CreateTableCommandInput;
  const createTable = async function () {
    try {
      const results = await ddbClient.send(new CreateTableCommand(inputCmd));
      console.log(results);
    } catch (err) {
      console.error(err);
    }
  };
  await createTable();
}

// // input data
const chunkSize = 10;
const batchWriteSamples = async function () {
  try {
    for (const key in DB_SAMPLE) {
      const array: [] = DB_SAMPLE[key]!;
      for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, Math.min(i + chunkSize, array.length));
        for (const items of chunk) {
          const record: { [name: string]: WriteRequest[] } = {};
          record[key] = [items];
          const input: BatchWriteItemCommandInput = {
            RequestItems: record,
          };
          await ddbClient.send(new BatchWriteItemCommand(input));
          // const results =
          // console.log(results);
        }
      }
    }
  } catch (err) {
    // console.log('schema', util.inspect(DB_SCHEMA, { showHidden: false, depth: null, colors: true }));
    console.error(`Error: ${err}`);
  }
};
batchWriteSamples();
