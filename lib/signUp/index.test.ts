import test from 'ava'
import { Result, maybe } from 'folktale'
import { emailSignUp } from './index'

const validEmail = 'hello@example.com'
const validPassword = 'asdfasdf'

const isFailure = (v: Result<any, any>) => v.toMaybe().equals(maybe.Nothing())
const isSuccess = (v: Result<any, any>) => !isFailure(v)

test('user signs up using email and password', t => {
  const out = emailSignUp({ email: validEmail, password: validPassword })
  t.true(isSuccess(out))
})

test('user sign up fails if email is invalid', t => {
  const out = emailSignUp({ email: 'hello', password: validPassword })
  t.true(isFailure(out))
})

test('user sign up fails if password is too short', t => {
  t.true(isFailure(emailSignUp({ email: validEmail, password: '1234567' })))
  t.true(isSuccess(emailSignUp({ email: validEmail, password: '12345678' })))
})

// test('user sign up fails if email is already registered', t => {
//   const emailAlreadyRegistered = (_: string) => Promise.resolve(true)
//   const out = emailSignUp({ email: validEmail, password: validPassword }).chain(
//     v => v(emailAlreadyRegistered)
//   )
//   t.true(isFailure(out))
// })
