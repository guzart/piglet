import test from 'ava'
import { emailSignUp } from './index'

const validEmail = 'hello@example.com'
const validPassword = 'asdfasdf'

test('user signs up using email and password', t => {
  t.true(emailSignUp({ email: validEmail, password: validPassword }).isSuccess)
})

test('user sign up fails if email is invalid', t => {
  t.true(emailSignUp({ email: 'hello', password: validPassword }).isFailure)
})

test('user sign up fails if password is too short', t => {
  t.true(emailSignUp({ email: validEmail, password: '1234567' }).isFailure)
  t.true(emailSignUp({ email: validEmail, password: '12345678' }).isSuccess)
})

test('user sign up fails if email is already registered', t => {
  const email = 'hello@example.com'
  t.true(emailSignUp({ email, password: validPassword }).isFailure)
})
