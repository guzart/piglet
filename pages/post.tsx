import React from 'react'
import Layout from '../components/Layout.js'
import { Context, TopComponentProps } from 'next'
import Error from 'next/error'

import { getPosts, Post } from './index'

export interface PostQueryParams {
  id: string
}

interface Props {
  post: Post
}

class PostPage extends React.Component<
  TopComponentProps<Props, PostQueryParams>
> {
  static getInitialProps(context: Context<PostQueryParams>): Props {
    const { query } = context
    const post = getPosts().find(p => p.id === query.id)
    if (!post) {
      let error = new Error('Post not found')
      error.code = 'ENOENT'
      throw error
    }

    return { post }
  }

  render() {
    const { post } = this.props
    return (
      <Layout>
        <h1>{post.title}</h1>
        <p>This is the blog post content.</p>
      </Layout>
    )
  }
}

export default PostPage
