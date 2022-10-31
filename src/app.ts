import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { getUF } from './uf';

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {

    const uf = await getUF();

    return {
        statusCode: 200,
        body: JSON.stringify({
            uf: uf,
        }),
    };
};