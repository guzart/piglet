import { validation, Validation } from 'folktale'

const { Success, Failure } = validation

const EMAIL_REGEXP = new RegExp(
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
)

export interface ValidationTuple<T> extends Array<keyof T | string[]> {
  0: keyof T
  1: string[]
  length: 2
}

export type Validator<T> = (value: T) => Validation<string[], T>

export const notEmpty: Validator<string> = (value: string) =>
  value.trim() ? Success(value) : Failure(["can't be empty"])

export const validEmail: Validator<string> = (email: string) =>
  EMAIL_REGEXP.test(email) ? Success(email) : Failure(['is invalid'])

export const minLength = (min: number): Validator<string> => (value: string) =>
  value.length >= min
    ? Success(value)
    : Failure([`must have at least ${min} characters`])
