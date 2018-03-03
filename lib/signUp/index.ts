import ErrorResult from '@lib/shared/ErrorResult'
import Result from '@lib/shared/Result'
import ValidationError from '@lib/shared/ValidationError'
import User from './User'
import SuccessResult from '@lib/shared/SuccessResult'

export interface EmailSignUp {
  email: string
  password: string
}

function isEmailAlreadyRegistered(_email: string) {
  return false
}

const EMAIL_REGEXP = new RegExp(
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
)

function isInvalidEmail(email: string): boolean {
  return EMAIL_REGEXP.test(email)
}

export function emailSignUp(info: EmailSignUp): Result<User, ValidationError> {
  if (!isInvalidEmail(info.email)) {
    return new ErrorResult(new ValidationError({ email: ['is invalid'] }))
  }

  if (isEmailAlreadyRegistered(info.email)) {
    return new ErrorResult(
      new ValidationError({ email: ['is already registered'] })
    )
  }

  return new SuccessResult(new User())
}

// export interface GoogleSignUp {
//   email: string
//   idToken: string
// }
// export function googleSignUp(info: GoogleSignUp): Result<User> {}
