import { app } from './app'
import cors from '@fastify/cors'
import {env} from './config/env'

app.register(cors)

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log(`🚀 HTTP server running in port ${env.PORT}`)
  })