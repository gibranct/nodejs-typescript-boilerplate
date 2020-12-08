import { QueryFailedError } from 'typeorm'
import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import ServiceUtils from '@utils/service'

import routes from '../routes'
import APIError from '../api/customErrors/APIError'

const app = express()

app.use(express.json({ limit: '50mb' }))

app.use(express.urlencoded({ extended: true }))

morgan.token('body', (req: express.Request) => {
  const isNotGet = req.method !== 'GET'
  const isNotAudio = !req.url.includes('audios')
  if (isNotGet && isNotAudio) {
    return JSON.stringify(req.body)
  }
  return 'body-empty'
})

app.use((req: Request, res: Response, next: NextFunction) => {
  const { offset, limit } = req.headers

  req.headers.offset = Number.isNaN(Number(offset)) ? 0 : offset
  req.headers.limit = Number.isNaN(Number(limit)) ? 100 : limit

  return next()
})

app.use(morgan(':date[iso] :method :url :status :body - :total-time ms'))

app.use('/api', routes)

app.use((error: APIError, req: Request, res: Response, next: NextFunction) => {
  const isInstanceOfQueryFailed = error instanceof QueryFailedError
  if (isInstanceOfQueryFailed) return next(error)
  res.status(error.statusCode || 400).json(
    ServiceUtils.getResponse({
      status: error.status,
      message: error.message,
    })
  )
  return next(false)
})

export default app
