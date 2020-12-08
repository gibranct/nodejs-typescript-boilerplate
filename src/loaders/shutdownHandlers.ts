import { createHttpTerminator } from 'http-terminator'

import logger from './logger'

const isInProduction = process.env.NODE_ENV === 'production'

const init = (server: any) => {
  const httpTerminator = createHttpTerminator({
    server,
  })

  if (isInProduction) {
    process.on('SIGTERM', async () => {
      logger.info('SIGTERM signal received: closing HTTP server')
      await httpTerminator.terminate()
      process.exit(1)
    })

    process.on('SIGINT', async () => {
      logger.info('SIGINT signal received: closing HTTP server')
      await httpTerminator.terminate()
      process.exit(1)
    })
  }
}

export default {
  init,
}
