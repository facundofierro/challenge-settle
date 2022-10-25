import App from './server/app';
import RatesController from './controllers/ratesController';
import HealthController from './controllers/healthController';
import config from './config';

const app = new App({
  routes: [
    ['GET', '/rates', new RatesController()],
    ['GET', '/healthcheck', new HealthController()],
  ],
  serverPort: config.server.port,
});

export default app;
