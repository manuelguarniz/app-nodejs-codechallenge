import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger.json';

export default [swaggerUI.serve, swaggerUI.setup(swaggerDocument)];
