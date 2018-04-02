import { result, validation } from 'folktale'
import {
  validEmail,
  minLength,
  notEmpty,
  ValidationTuple,
  Validator
} from '@lib/shared/validations/index'

export interface EmailSignUp {
  email: string
  password: string
}

type EmailSignUpValidation = ValidationTuple<EmailSignUp>

const isValidEmail: Validator<string> = (email: string) =>
  validation
    .of<string[], string>(email)
    .concat(notEmpty(email))
    .concat(validEmail(email))

const isValidPassword: Validator<string> = (password: string) =>
  validation
    .of<string[], string>(password)
    .concat(notEmpty(password))
    .concat(minLength(8)(password))

const canRegisterEmail = (email: string) => (
  emailAlreadyRegistered: (_: string) => Promise<boolean>
) =>
  emailAlreadyRegistered(email)
    ? result.Error<EmailSignUpValidation[], string>([
        ['email', ['is already in use']]
      ])
    : result.Ok<EmailSignUpValidation[], string>(email)

// TODO: Extract the key tuples boxing to a function
export const emailSignUp = (emailSignup: EmailSignUp) =>
  validation
    .of<EmailSignUpValidation[], EmailSignUp>(emailSignup)
    .concat(
      isValidEmail(emailSignup.email).mapFailure<EmailSignUpValidation[]>(f => [
        ['email', f]
      ])
    )
    .concat(
      isValidPassword(emailSignup.password).mapFailure<EmailSignUpValidation[]>(
        f => [['password', f]]
      )
    )
    .toResult()
    .map(canRegisterEmail)
