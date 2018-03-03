import * as React from 'react'
import Layout from '../components/Layout'
import Form from '../components/Form'

interface SignUpData {
  email: string
  password: string
  rememberMe: boolean
}

export default class SignUpPage extends React.Component {
  handleSubmit(data: Partial<SignUpData>) {
    console.log(data)
  }

  render() {
    return (
      <Layout className="IndexPage">
        <h1>Sign Up</h1>
        <Form onSubmit={this.handleSubmit}>
          <label htmlFor="user-email">Email</label>
          <input id="user-email" type="email" name="email" />
          <label htmlFor="user-password">Password</label>
          <input id="user-password" type="password" name="password" />
          <label htmlFor="user-remember-me">Remember me?</label>
          <input id="user-remember-me" type="checkbox" name="rememberMe" />
          <input type="hidden" name="rememberMe" value="off" />
          <button type="submit">Sign Up</button>
        </Form>
      </Layout>
    )
  }
}
