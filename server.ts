import { PostQueryParams } from './pages/post'

const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const port = parseInt(process.env.PORT || '', 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = new Koa()
    const router = new Router()

    router.get('/p/:id', async (ctx: any) => {
      const actualPage = '/post'
      const queryParams: PostQueryParams = { id: ctx.params.id }
      await app.render(ctx.req, ctx.res, actualPage, queryParams)
      ctx.respond = false
    })

    router.get('*', async (ctx: any) => {
      await handle(ctx.req, ctx.res)
      ctx.respond = false
    })

    server.use(async (ctx: any, next: any) => {
      ctx.res.statusCode = 200
      await next()
    })

    server.use(router.routes())
    server.listen(port, (err: Error) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch((err: Error) => {
    console.error(err.stack)
    process.exit(1)
  })
