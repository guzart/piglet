import Result from './Result'

export default class SuccessResult<R = {}> extends Result<R, null> {
  error: null
  result: R

  constructor(result: R) {
    super(result, null)
  }
}
