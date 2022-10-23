import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from '@hapi/joi';
import { AppController } from '../typings';
import getRates from '../services/ratesService';

class RatesController implements AppController {
  public handler = async (request: Request, response: ResponseToolkit) => {
    console.log('Request: ', request.payload);
    const { pairs, fee } = request.payload as { pairs: string[], fee: number };
    const rates = await getRates(pairs, fee);
    return response.response(rates);
  };

  public validations = {
    payload: Joi.object({
      pairs: Joi.array().items(Joi.string()).required(),
      fee: Joi.number().min(0).max(1).default(null),
    }),
  };

  public plugins = {
    'hapi-swagger': {
      responses: {
        200: {
          description: 'Success',
          schema: Joi.object({
            rates: Joi.object().pattern(Joi.string(), Joi.number()),
          }),
        },
      },
    },
  };
}

export default RatesController;
