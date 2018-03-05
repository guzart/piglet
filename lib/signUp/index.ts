import { validation, result } from 'folktale'
import { validEmail, minLength, notEmpty } from '@lib/shared/validations/index'

const { Success } = validation

export interface EmailSignUp {
  email: string
  password: string
}

type ValidationTuple<T> = [keyof T, string[]]

type EmailSignUpValidation = ValidationTuple<EmailSignUp>[]

const isValidEmail = (email: string) =>
  Success<string[], string>(email)
    .concat(notEmpty(email))
    .concat(validEmail(email))
    .mapFailure<EmailSignUpValidation>(f => [['email', f]])

const isValidPassword = (password: string) =>
  Success<string[], string>(password)
    .concat(notEmpty(password))
    .concat(minLength(8, password))
    .mapFailure<EmailSignUpValidation>(f => [['password', f]])

const canRegisterEmail = (_email: string) => {
  // return result.Error<EmailSignUpValidation, string>([
  //   [emailKey, ['is already in use']]
  // ])
  // TODO: Use Reader monad for repo access
  return result.Ok<EmailSignUpValidation, string>(_email)
}

export const emailSignUp = (info: EmailSignUp) =>
  isValidEmail(info.email)
    .concat(isValidPassword(info.password))
    .toResult()
    .chain<string>(canRegisterEmail)
    .map(_ => info)

// export interface GoogleSignUp {
//   email: string
//   idToken: string
// }
// export function googleSignUp(info: GoogleSignUp): Result<User> {}
