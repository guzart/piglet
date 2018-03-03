import test from 'ava'
import SuccessResult from '@lib/shared/SuccessResult'
import { emailSignUp } from './index'

test('user signs up using email and password', t => {
  const result = emailSignUp({ email: 'hello', password: 'asads' })
  t.true(result instanceof SuccessResult)
})
