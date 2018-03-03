import test from 'ava'
import SuccessResult from '@lib/shared/SuccessResult'
import { emailSignUp } from './index'
import ErrorResult from '@lib/shared/ErrorResult'

test('user signs up using email and password', t => {
  const result = emailSignUp({ email: 'hello@example.com', password: 'asdf' })
  t.true(result instanceof SuccessResult)
})

test('user sign up fails if email is invalid', t => {
  const result = emailSignUp({ email: 'hello', password: 'asdf' })
  t.true(result instanceof ErrorResult)
})

test('user sign up fails if email is already registered', t => {
  const email = 'hello@example.com'
  const result = emailSignUp({ email, password: 'asdf' })
  t.true(result instanceof ErrorResult)
})
