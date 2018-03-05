import test from 'ava'
import { emailSignUp } from './index'
import { Result, maybe } from 'folktale'

const validEmail = 'hello@example.com'
const validPassword = 'asdfasdf'

const isFailure = (v: Result<any, any>) => v.toMaybe().equals(maybe.Nothing())
const isSuccess = (v: Result<any, any>) => !isFailure(v)

test('user signs up using email and password', t => {
  const result = emailSignUp({ email: validEmail, password: validPassword })
  t.true(isSuccess(result))
})

test('user sign up fails if email is invalid', t => {
  const result = emailSignUp({ email: 'hello', password: validPassword })
  t.true(isFailure(result))
})

test('user sign up fails if password is too short', t => {
  t.true(isFailure(emailSignUp({ email: validEmail, password: '1234567' })))
  t.true(isSuccess(emailSignUp({ email: validEmail, password: '12345678' })))
})

// test('user sign up fails if email is already registered', t => {
//   const email = 'hello@example.com'
//   t.true(isFailure(emailSignUp({ email, password: validPassword })))
// })
