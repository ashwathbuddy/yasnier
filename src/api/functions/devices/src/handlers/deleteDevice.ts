import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
// import { LoginParams } from '@ems/api-interfaces';
import { DbClient } from '/opt/nodejs/ddbclient';
import { response } from '/opt/nodejs/api-responses';
// import { Device } from '@ems/data-models';

const dbClient = new DbClient();

export async function deleteDevice(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  if (event.httpMethod !== 'DELETE') {
    throw new Error(`devices only accept DELETE method, you tried: ${event.httpMethod}`);
  }

  if (!event.pathParameters) throw new Error('Logic error');
  const accountId = event.pathParameters['accountId'];
  const id = event.pathParameters['id'];

  console.log('EVENT: ', event);

  const params = {
    TableName: process.env['TABLE_NAME'],
    Key: {
      accountId: accountId,
      id: id,
    },
    ReturnValues: 'ALL_OLD',
  };

  try {
    const items = await dbClient.delete(params);
    return response.success(items.Attributes, 200, {});
  } catch (err: unknown) {
    const e = err as Error;
    return response.error(e as unknown as string, 400, {});
  }
}
