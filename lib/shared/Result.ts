export default class Result<R = {}, E = Error> {
  result: R | null
  error: E | null

  constructor(result: R | null, error: E | null) {
    this.result = result
    this.error = error
  }

  get isFailure() {
    return this.error != null
  }

  get isSuccess() {
    return !this.isFailure
  }
}
