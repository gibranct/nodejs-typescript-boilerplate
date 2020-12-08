import { IncomingHttpHeaders } from 'http'

declare module 'http' {
  interface IncomingHttpHeaders {
    limit?: number
    offset?: number
    isadmin?: boolean
    login: string
  }
}
