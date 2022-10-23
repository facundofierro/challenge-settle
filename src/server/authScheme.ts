import Hapi from '@hapi/hapi';
import Boom from 'boom';
import config from '../config';

const authScheme = () => ({
  authenticate: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
    const { authorization } = request.headers;
    if (!authorization) {
      throw Boom.unauthorized('Missing authorization header', 'custom');
    }
    const [scheme, key] = authorization.split(' ');
    if (scheme !== 'Bearer') {
      throw Boom.unauthorized('Invalid authorization scheme', 'custom');
    }
    if (key !== config.server.apiKey) {
      throw Boom.unauthorized('Invalid API KEY', 'custom');
    }
    return h.authenticated({ credentials: { key } });
  },
});

export default authScheme;
