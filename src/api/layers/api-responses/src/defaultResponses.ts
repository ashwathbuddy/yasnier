import { APIGatewayProxyResult } from 'aws-lambda';

const defaultHeaders = {
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with',
  'Access-Control-Allow-Origin': '*', // TODO: Allow from anywhere
  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE,PATCH',
};

export interface IResponse<T> {
  data: T;
  code: string;
  error: string;
}

const response = {
  success: <T>(data: T, statusCode: number = 200, headers: any = defaultHeaders): APIGatewayProxyResult => {
    const responseBody: IResponse<T> = {
      data,
      code: 'SUCCESS',
      error: '',
    };

    const response: APIGatewayProxyResult = {
      statusCode,
      headers: {
        'Content-Type': 'application/json',
        ...defaultHeaders,
        ...headers,
      },
      body: JSON.stringify(responseBody),
    };

    console.info(`response from: statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
  },
  error: (error: string, statusCode: number = 500, headers: any = defaultHeaders): APIGatewayProxyResult => {
    const responseBody: IResponse<{}> = {
      data: {},
      code: 'ERROR',
      error,
    };

    const response: APIGatewayProxyResult = {
      statusCode,
      headers: {
        'Content-Type': 'application/json',
        ...defaultHeaders,
        ...headers,
      },
      body: JSON.stringify(responseBody),
    };

    console.log(error);

    return response;
  },
};

export { response };
