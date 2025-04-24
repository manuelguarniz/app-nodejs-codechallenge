import express from 'express';
import pino from 'pino';
import loggerConfig from './configs/logger.config';
import swaggerConfig from './configs/swagger.config';
import { errorHandler } from './middlewares/error-handler';
import healthRouters from './routes/health.route';

export const logger = pino({ name: 'server start' });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loggerConfig);

app.use('/api-docs', ...swaggerConfig);

app.use('/api/health', healthRouters);

app.use(errorHandler);

export default app;
