import { validation, Validation } from 'folktale'

const { Success, Failure } = validation

const EMAIL_REGEXP = new RegExp(
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
)

export const notEmpty = (value: string): Validation<string[], string> =>
  value.trim() ? Success(value) : Failure(["can't be empty"])

export const validEmail = (email: string): Validation<string[], string> =>
  EMAIL_REGEXP.test(email) ? Success(email) : Failure(['is invalid'])

export const minLength = (
  min: number,
  value: string
): Validation<string[], string> =>
  value.length >= min
    ? Success(value)
    : Failure([`must have at least ${min} characters`])
