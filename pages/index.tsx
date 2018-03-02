import Link from 'next/link'

import Layout from '../components/Layout'

export interface Post {
  id: string
  title: string
}

export function getPosts(): Post[] {
  return [
    { id: 'hello-nextjs', title: 'Hello Next.js' },
    { id: 'learn-nextjs', title: 'Learn Next.js is awesome' },
    { id: 'deploy-nextjs', title: 'Deploy apps with ZEIT' }
  ]
}

const PostLink = ({ post }: { post: Post }) => (
  <li>
    <Link as={`/p/${post.id}`} href={`/post?id=${post.id}`}>
      <a>{post.title}</a>
    </Link>
    <style jsx>{`
      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        color: blue;
        font-family: 'Arial';
        text-decoration: none;
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </li>
)

const IndexPage = () => (
  <Layout>
    <h1>My Blog</h1>
    <ul>{getPosts().map(post => <PostLink key={post.id} post={post} />)}</ul>
    <style jsx>{`
      h1,
      a {
        font-family: 'Arial';
      }

      ul {
        padding: 0;
      }

      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </Layout>
)

export default IndexPage
