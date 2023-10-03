import { Account } from '@ems/data-models';
import { LoginParams } from '@ems/api-interfaces';
import { DbClient } from '/opt/nodejs/ddbclient';
import { response } from '/opt/nodejs/api-responses';

export class NotFoundError extends Error {
  public readonly statusCode = 404;

  constructor() {
    super('User not found or invalid password');
  }

  serializeErrors(): { message: string }[] {
    return [{ message: this.message }];
  }
}

const ddbClient = new DbClient();

export const loginHandler = async (event: {
  httpMethod: string;
  body: string;
  path?: string;
  headers?: { 'Access-Control-Allow-Origin': '*' };
}) => {
  if (event.httpMethod !== 'POST') {
    throw new Error(`Login only accept POST method, you tried: ${event.httpMethod}`);
  }
  const body = JSON.parse(event.body) as LoginParams;
  const params = {
    TableName: process.env['TABLE_NAME'],
    KeyConditionExpression: 'email = :e',
    ExpressionAttributeValues: { ':e': body.username },
  };
  try {
    const data = await ddbClient.query(params);
    console.log('LOGIN DATA: ', data);
    if (data?.length == 1) {
      const account = data[0] as Account; //TODO add support for multiple accounts associated to the same user
      if (account.password === body.password) {
        account.password = undefined;
        return response.success(
          200,
          {},
          account,
        );
      }
    } else throw new Error('Logic error');
    throw new NotFoundError();
  } catch (error) {
    if (error instanceof NotFoundError) {
      // return response(event, error.statusCode, { errors: error.serializeErrors() });
      return response.error(error.statusCode, {}, error);
    }
    return response.error(500);
  }
};
