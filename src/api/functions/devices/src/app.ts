import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { deleteDevice } from './handlers/deleteDevice';
import { getDevices } from './handlers/getDevices';
import { DbClient } from '/opt/nodejs/ddbclient';

export const dbClient = new DbClient();

export async function proxyHandle(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  switch (`${event.httpMethod} ${event.resource}`) {
    case 'GET /api/devices/{accountId}':
      return getDevices(event);
    case 'DELETE /api/devices/{accountId}/{id}':
      return deleteDevice(event);
    default:
      throw new Error(`invalid route key for ${JSON.stringify(event, null, 2)}, you tried: ${event.path}`);
  }
}
