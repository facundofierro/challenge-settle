import Hapi, { Server } from '@hapi/hapi';
import Path from 'path';
import * as HapiSwagger from 'hapi-swagger';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import { AppRoute, AppParams } from '../typings';
import authScheme from './authScheme';
import swaggerOptions from './swaggerOptions';

class App {
  public server: Server;

  public port: number;

  public routes: AppRoute[];

  constructor(params: AppParams) {
    const { routes, serverPort } = params;
    this.port = serverPort;
    this.routes = routes;
    this.server = this.init();
  }

  public init() {
    this.server = Hapi.server({
      port: this.port,
      host: '0.0.0.0',
      routes: {
        files: {
          relativeTo: Path.join(__dirname, 'public'),
        },
      },
    });
    this.server.auth.scheme('basic', authScheme);
    this.server.auth.strategy('simple', 'basic');
    return this.server;
  }

  public registerRoutes = () => {
    const routes = this.routes.map((route: AppRoute) => {
      const [method, path, controller] = route;
      return {
        method,
        path,
        handler: controller.handler,
        options: {
          auth: 'simple',
          ...controller.options,
          validate: controller.validations,
          plugins: controller.plugins,
        },
      };
    });
    this.server.route(routes);
  };

  public listen = async () => {
    try {
      const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
        {
          plugin: Inert,
        },
        {
          plugin: Vision,
        },
        {
          plugin: HapiSwagger,
          options: swaggerOptions,
        },
      ];
      await this.server.register(plugins);
      await this.server.start();
      this.registerRoutes();
      console.log(`Server running on ${this.server?.info?.uri}`);
    } catch (error: any) {
      console.log(`Error starting server: ${error.message}`);
    }
  };

  public stop = async () => {
    try {
      await this.server.stop();
      console.log('Server stopped');
    } catch (error: any) {
      console.log(`Error stopping server: ${error.message}`);
    }
  };
}

export default App;
