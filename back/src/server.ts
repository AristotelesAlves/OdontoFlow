import { app } from './app'
import {env} from './config/env'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log(`🚀 HTTP server running in port ${env.PORT}`)
  })