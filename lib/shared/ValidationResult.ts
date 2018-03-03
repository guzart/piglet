import Result from '@lib/shared/Result'
import ValidationError, { ValidationErrors } from '@lib/shared/ValidationError'

export default class ValidationResult extends Result<null, ValidationError> {
  constructor(errors?: ValidationErrors) {
    const error = errors != null ? new ValidationError(errors) : null
    super(null, error)
  }

  merge(other: ValidationResult): ValidationResult {
    if (other.error) {
      if (!this.error) {
        return other
      }

      return new ValidationResult(
        Object.assign({}, other.error.errors, this.error.errors)
      )
    }

    return this
  }
}
