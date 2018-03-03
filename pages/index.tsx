import Link from 'next/link'
import Layout from '../components/Layout'
import './index.scss'

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
  <li className="PostLink">
    <Link as={`/p/${post.id}`} href={`/post?id=${post.id}`}>
      <a>{post.title}</a>
    </Link>
  </li>
)

const IndexPage = () => (
  <Layout className="IndexPage">
    <h1>My Blog</h1>
    <ul>{getPosts().map(post => <PostLink key={post.id} post={post} />)}</ul>
  </Layout>
)

export default IndexPage
