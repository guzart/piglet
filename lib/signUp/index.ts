import Result from '@lib/shared/Result'
import ValidationError from '@lib/shared/ValidationError'
import User from './User'
import SuccessResult from '@lib/shared/SuccessResult'
import ValidationResult from '@lib/shared/ValidationResult'

export interface EmailSignUp {
  email: string
  password: string
}

const EMAIL_REGEXP = new RegExp(
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
)

function isEmailAlreadyRegistered(_email: string) {
  return false
}

function isInvalidEmail(email: string): boolean {
  return EMAIL_REGEXP.test(email)
}

function validatePassword(password: string) {
  if (password.length < 8) {
    return new ValidationResult({
      password: ['must be at least 8 characters long']
    })
  }

  return new ValidationResult()
}

function validateEmail(email: string) {
  if (!isInvalidEmail(email)) {
    return new ValidationResult({ email: ['is invalid'] })
  }

  if (isEmailAlreadyRegistered(email)) {
    return new ValidationResult({ email: ['is already registered'] })
  }

  return new ValidationResult()
}

export function emailSignUp(info: EmailSignUp): Result<User, ValidationError> {
  const validationResult = validateEmail(info.email).merge(
    validatePassword(info.password)
  )

  if (validationResult.isFailure) {
    return validationResult
  }

  return new SuccessResult(new User())
}

// export interface GoogleSignUp {
//   email: string
//   idToken: string
// }
// export function googleSignUp(info: GoogleSignUp): Result<User> {}
