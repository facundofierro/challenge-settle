import * as HapiSwagger from 'hapi-swagger';

const swaggerOptions: HapiSwagger.RegisterOptions = {
  info: {
    title: 'Settle challenge API Documentation',
  },
  schemes: ['http'],
  documentationPath: '/documentation',
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  security: [{ Bearer: [] }],
};

export default swaggerOptions;
