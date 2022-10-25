import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';
import { AppController } from '../typings';

class HealthController implements AppController {
  public handler = async (request: Request, response: ResponseToolkit) => {
    const healthcheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
    };
    return response.response(healthcheck).code(200);
  };

  public plugins = {
    'hapi-swagger': {
      responses: {
        200: {
          description: 'Success',
          schema: Joi.object({
            uptime: Joi.number().required()
              .description('The uptime of the server'),
            message: Joi.string().required()
              .description('The status of the server. Should be OK'),
            timestamp: Joi.number().required()
              .description('The timestamp of the server'),
          }).label('Healthcheck'),
        },
      },
    },
  };

  public options = {
    tags: ['api', 'health'],
    auth: false,
    description: 'Healthcheck',
    notes: 'Returns uptime and message',
  };
}

export default HealthController;
