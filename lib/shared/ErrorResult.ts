import Result from './Result'

export default class ErrorResult<E = Error> extends Result<null, E> {
  error: E
  result: null

  constructor(error: E) {
    super(null, error)
  }
}
