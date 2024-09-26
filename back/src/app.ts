import fastify from 'fastify';
import {env} from './config/env'
import { routes } from './routes';

export const app = fastify();

app.setErrorHandler((error, _, reply) => {
  if (error.validation) {
    return reply
      .status(400)
      .send({ message: 'Erro de validação', details: error.validation });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // DataDog
  }

  return reply.status(500).send({ message: 'Erro interno do servidor.' });
});

app.register(routes)