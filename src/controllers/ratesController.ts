import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';
import { AppController } from '../typings';
import getRates from '../services/ratesService';

class RatesController implements AppController {
  public handler = async (request: Request, response: ResponseToolkit) => {
    // Sample call: http://localhost:3000/rates?fee=0.1&pairs=EURUSD,USDGBP
    const { fee, pairs } = request.query;
    console.log('Request: ', request.query);
    const parsedPairs = pairs.split(',');
    const rates = await getRates(parsedPairs, fee);
    return response.response(rates);
  };

  public validations = {
    query: Joi.object({
      fee: Joi.number().min(0).max(1)
        .description('Fee to apply. Must be a number between 0 and 1.'),
      pairs: Joi.string().required()
        .description('Comma separated pairs. Example: EURUSD,USDGBP'),
    }),
  };

  public options = {
    tags: ['api', 'rates'],
    description: 'Get rates and apply fee',
    notes: 'Returns rates for given pairs. Fee is applied to each rate',
  };

  public plugins = {
    'hapi-swagger': {
      responses: {
        200: {
          description: 'Success',
          schema: Joi.array().items(
            Joi.object({
              fee: Joi.number(),
              feeAmmount: Joi.number(),
              originalRate: Joi.number(),
              pair: Joi.object({
                from: Joi.string(),
                to: Joi.string(),
              }),
              rate: Joi.number(),
            }).label('Rate'),
          ).label('Rates'),
        },
      },
    },
  };
}

export default RatesController;
