import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DbClient } from '/opt/nodejs/ddbclient';
import { response } from '/opt/nodejs/api-responses';
import { Device } from '@ems/data-models';

const dbClient = new DbClient();

export async function addDevice(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  if (event.httpMethod !== 'PUT') {
    throw new Error(`devices only accept PUT method, you tried: ${event.httpMethod}`);
  }
  if (!event.body || event.body == '') {
    throw new Error(`incorrect body format: ${event.body}`);
  }
  const body = JSON.parse(event.body) as Device;
  const params = {
    TableName: process.env['TABLE_NAME'],
    Item: {
      id: body.id,
      accountId: body.accountId,
      model: { name: body.model.name, power: body.model.power },
      createdAt: body.createdAt,
    },
    ReturnValues: 'ALL_OLD', // to return the updated attributes in the response
  };
  try {
    const data = await dbClient.put(params);
    const statusCode = data.Attributes ? 200 : 201;
    return response.success(statusCode, {}, data.Attributes);
  } catch (err: unknown) {
    const e = err as Error;
    return response.error(400, {}, e);
  }
}
