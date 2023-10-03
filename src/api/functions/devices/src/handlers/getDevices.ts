import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
// import { LoginParams } from '@ems/api-interfaces';
import { DbClient } from '/opt/nodejs/ddbclient';
import { response } from '/opt/nodejs/api-responses';
// import { Device } from '@ems/data-models';

const dbClient = new DbClient();

export async function getDevices(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  if (event.httpMethod !== 'GET') {
    throw new Error(`devices only accept GET method, you tried: ${event.httpMethod}`);
  }

  if (!event.pathParameters) throw new Error('Logic error');
  const accountId = event.pathParameters['accountId'];

  // let startKey = undefined;
  // if (body.AccountID != '' && body.DeviceID != '') {
  //   startKey = { AccountID: body.AccountID, DeviceID: body.DeviceID };
  // }

  const params = {
    TableName: process.env['TABLE_NAME'],
    KeyConditionExpression: 'accountId = :id',
    ExpressionAttributeValues: { ':id': accountId },
    // Limit: body.Limit,
    // ExclusiveStartKey: startKey,
  };

  try {
    const items = await dbClient.query(params);
    return response.success(200, {}, items);
  } catch (err: unknown) {
    const e = err as Error;
    return response.error(400, {}, e);
  }
}
