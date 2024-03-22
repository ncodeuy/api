import z from 'zod';
import { BadRequestError } from './errors/BadRequestError';
import {Request, Response} from 'express';

interface EndpointConfig {
  validation?: Record<string, any>; // FIXME: add more specific types.
  handler: (request: Request, response: Response) => Record<string, any> | void | null;  // FIXME: Add more specific types.
}

export function endpoint(apiEndpoint: EndpointConfig) {
  return async function (request: Request, response: Response) {
    try {
      // Validate the request body.
      if (apiEndpoint.validation) {
        const validation = apiEndpoint.validation.safeParse(request.body);
        if (!validation.success) throw new BadRequestError(validation.error.message);
      }

      // Execute the endpoint handler.
      const responsePayload = await apiEndpoint.handler(request, response) ;

      // Send the response.
      if (responsePayload) response.json(responsePayload);
      else response.send();
    } catch (error: any) {
      console.error(error);
      response.status(error.statusCode || 500).json({error: error.message });
    }
  }
};