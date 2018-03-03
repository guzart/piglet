export type ValidationErrors = { [key: string]: string[] }

export default class ValidationError extends Error {
  errors: ValidationErrors

  constructor(errors: ValidationErrors, message?: string) {
    super(message || 'Validation errors')
    this.errors = errors
  }
}
