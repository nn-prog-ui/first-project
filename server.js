import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import app from './src/index.js'

// 静的ファイル配信を追加
app.use('/static/*', serveStatic({ root: './public' }))

const port = process.env.PORT || 3000

console.log(`🚀 Server is running on port ${port}`)
console.log(`🌐 Access: http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})