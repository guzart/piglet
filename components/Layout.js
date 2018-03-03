import Head from 'next/head'
import Header from './Header'
import '../styles/index.scss'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const Layout = props => (
  <div className={props.className} style={layoutStyle}>
    <Head>
      <title>{props.title || ''}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="/_next/static/style.css" />
    </Head>
    <Header />
    {props.children}
  </div>
)

export default Layout
