import { responseStatusMap, ResponseStatus } from '@utils/service'

class APIError extends Error {
  statusCode: number

  status: ResponseStatus

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.status = responseStatusMap.get(statusCode)
  }
}

export default APIError
