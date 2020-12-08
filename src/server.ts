import * as env from 'env-var'

import { app, logger, shutdownHandlers } from './loaders'

const PORT = env.get('PORT').default('4000').asIntPositive()

const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`)
})

shutdownHandlers.init(server)
