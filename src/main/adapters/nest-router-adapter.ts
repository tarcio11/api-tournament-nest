import { Controller } from '@/presentation/controllers';
import { Response } from 'express';

type Adapter = (controller: Controller) => any;

export const adaptNestRouter: Adapter = (controller) => async (body, response: Response) => {
  const { statusCode, data = {} } = await controller.handle(body);
  const json = [200, 201].includes(statusCode)
    ? data
    : {
        error: data.name,
        statusCode: data.status,
        message: data.message,
        timestamp: new Date().toISOString(),
      };
  response.status(statusCode).json(json);
};
