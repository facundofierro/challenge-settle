import App from './server/app';
import RatesController from './controllers/ratesController';
import config from './config';

const app = new App({
  routes: [
    ['POST', '/rates', new RatesController()],
  ],
  serverPort: config.server.port,
});

export default app;
