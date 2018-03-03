import ErrorResult from 'lib/shared/ErrorResult'
import Result from 'lib/shared/Result'
import ValidationError from 'lib/shared/ValidationError'
import User from './User'
import SuccessResult from 'lib/shared/SuccessResult'

export interface EmailSignUp {
  email: string
  password: string
}

function isEmailAlreadyRegistered(_email: string) {
  return false
}

function isValidEmail(_email: string): boolean {
  return true
}

export function emailSignUp(info: EmailSignUp): Result<User, ValidationError> {
  if (isValidEmail(info.email)) {
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
