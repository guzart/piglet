declare module 'next/error'
declare module 'next/link'

declare module 'next' {
  import { ClientRequest, ClientResponse } from 'http'

  interface UrlProp<T = { [key: string]: any }> {
    /**
     * String of the current path excluding the query string
     */
    pathname: string

    /**
     * Object with the parsed query string. Defaults to {}
     */
    query: T

    /**
     * String of the actual path (including the query) shows in the browser
     */
    asPath: string

    /**
     * performs a pushState call with the given url
     */
    push(url: string, as?: string): void

    /**
     * performs a pushState call with the given url
     */
    replace(url: string, as?: string): void
  }

  export interface Context<T = { [key: string]: any }> {
    pathname: string
    query: T
    asPath: string
    req?: ClientRequest
    res?: ClientResponse
    jsonPageRes?: Response
    err?: Error
  }

  export type TopComponentProps<T, Q = {}> = T & {
    url: UrlProp<Q>
  }
}
