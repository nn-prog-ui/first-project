import { Hono } from 'hono'
import { cors } from 'hono/cors'
// 静的ファイルはserver.jsで処理
// rendererは不要
import { applications, categories, getCategoryName, getCategoriesByTarget, getApplicationsByTarget } from './data.js'
// types.jsは不要

const app = new Hono()

// Enable CORS for API routes
app.use('/api/*', cors())

// 静的ファイルはserver.jsで処理されます

// HTML はc.html()で直接レンダリング

// API Routes
app.get('/api/applications', (c) => {
  const { target, category, keyword, hasDeadline, hasAmount } = c.req.query()
  
  let filteredApps = [...applications]
  
  // Filter by target (individual/corporate)
  if (target) {
    filteredApps = filteredApps.filter(app => app.target === target)
  }
  
  // Filter by category
  if (category) {
    filteredApps = filteredApps.filter(app => app.category === category)
  }
  
  // Filter by keyword
  if (keyword) {
    const searchTerm = keyword.toLowerCase()
    filteredApps = filteredApps.filter(app => 
      app.title.toLowerCase().includes(searchTerm) ||
      app.description.toLowerCase().includes(searchTerm) ||
      app.keywords.some(k => k.toLowerCase().includes(searchTerm)) ||
      (app.story && app.story.toLowerCase().includes(searchTerm))
    )
  }
  
  // Filter by deadline existence
  if (hasDeadline === 'true') {
    filteredApps = filteredApps.filter(app => app.deadline !== null)
  }
  
  // Filter by amount existence
  if (hasAmount === 'true') {
    filteredApps = filteredApps.filter(app => app.amount !== null)
  }
  
  return c.json(filteredApps)
})

app.get('/api/applications/:id', (c) => {
  const id = c.req.param('id')
  const application = applications.find(app => app.id === id)
  
  if (!application) {
    return c.json({ error: 'Application not found' }, 404)
  }
  
  return c.json(application)
})

app.get('/api/categories', (c) => {
  const { target } = c.req.query()
  
  if (target && (target === 'individual' || target === 'corporate')) {
    return c.json(getCategoriesByTarget(target))
  }
  
  return c.json(categories)
})

// Main page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>市役所申請ガイド</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body class="bg-gray-50">
        <div class="min-h-screen bg-gray-50">
          <header class="bg-blue-600 text-white shadow-lg">
            <div class="container mx-auto px-4 py-6">
              <h1 class="text-3xl font-bold flex items-center">
                <span class="mr-3">🏛️</span>
                市役所申請ガイド
              </h1>
              <p class="text-blue-100 mt-2">個人・法人の申請・助成金手続きを分かりやすくご案内</p>
              
              <div class="mt-4 flex space-x-1 bg-blue-500 rounded-lg p-1 w-fit">
                <button 
                  id="individualTab"
                  class="px-4 py-2 rounded-md text-sm font-medium transition-colors bg-white text-blue-600"
                >
                  👤 個人向け
                </button>
                <button 
                  id="corporateTab"
                  class="px-4 py-2 rounded-md text-sm font-medium transition-colors text-white hover:bg-blue-400"
                >
                  🏢 法人向け
                </button>
              </div>
            </div>
          </header>

          <main class="container mx-auto px-4 py-8">
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 class="text-xl font-semibold mb-4 flex items-center">
                <span class="mr-2">🔍</span>
                <span id="searchTitle">手続きを探す</span>
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input 
                  type="text" 
                  id="searchInput"
                  placeholder="キーワードで検索"
                  class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select 
                  id="categoryFilter"
                  class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">すべてのカテゴリ</option>
                </select>
                <button 
                  id="searchBtn"
                  class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  検索
                </button>
              </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8" id="categoriesGrid">
            </div>

            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-semibold mb-6" id="applicationsTitle">申請・手続き一覧</h2>
              <div id="applicationsList" class="space-y-4">
              </div>
            </div>
          </main>

          <footer class="bg-gray-800 text-white py-8 mt-16">
            <div class="container mx-auto px-4 text-center">
              <p>&copy; 2024 市役所申請ガイド. このサイトは参考用です。最新情報は各自治体にお問い合わせください。</p>
            </div>
          </footer>
        </div>
        <script src="/static/app.js"></script>
      </body>
    </html>
  `)
})

// Application detail page
app.get('/application/:id', (c) => {
  const id = c.req.param('id')
  const application = applications.find(app => app.id === id)
  
  if (!application) {
    return c.html(`
      <!DOCTYPE html>
      <html lang="ja">
        <head>
          <meta charset="UTF-8" />
          <title>申請が見つかりません</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-50">
          <div class="min-h-screen bg-gray-50 flex items-center justify-center">
            <div class="text-center">
              <h1 class="text-2xl font-bold text-gray-800 mb-4">申請が見つかりません</h1>
              <a href="/" class="text-blue-600 hover:underline">トップページに戻る</a>
            </div>
          </div>
        </body>
      </html>
    `)
  }
  
  const targetBadge = application.target === 'corporate' 
    ? 'bg-purple-500 text-white' 
    : 'bg-green-500 text-white'
  const targetText = application.target === 'corporate' ? '🏢 法人向け' : '👤 個人向け'
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <title>${application.title} - 市役所申請ガイド</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body class="bg-gray-50">
        <div class="min-h-screen bg-gray-50">
          <header class="bg-blue-600 text-white shadow-lg">
            <div class="container mx-auto px-4 py-4">
              <nav class="mb-2">
                <a href="/" class="text-blue-200 hover:text-white">← トップページに戻る</a>
              </nav>
              <h1 class="text-2xl font-bold">${application.title}</h1>
              <div class="flex items-center gap-2 mt-2">
                <span class="bg-blue-500 px-3 py-1 rounded-full text-sm">
                  ${getCategoryName(application.category)}
                </span>
                <span class="px-3 py-1 rounded-full text-sm ${targetBadge}">
                  ${targetText}
                </span>
              </div>
            </div>
          </header>

          <main class="container mx-auto px-4 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div class="lg:col-span-2">
                <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 class="text-xl font-semibold mb-4">📋 申請内容</h2>
                  <p class="text-gray-700 leading-relaxed">${application.description}</p>
                </div>

                ${application.story ? `
                  <div class="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6 mb-6">
                    <h2 class="text-xl font-semibold mb-4 text-purple-800 flex items-center">
                      <span class="mr-2">📝</span>
                      活用事例・ストーリー
                    </h2>
                    <div class="text-gray-700 leading-relaxed whitespace-pre-line">
                      ${application.story}
                    </div>
                  </div>
                ` : ''}

                ${application.eligibilityRequirements && application.eligibilityRequirements.length > 0 ? `
                  <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h2 class="text-xl font-semibold mb-4 text-blue-800">📊 申請要件</h2>
                    <ul class="space-y-2">
                      ${application.eligibilityRequirements.map(req => `
                        <li class="flex items-start">
                          <span class="text-blue-600 mr-2 mt-1">•</span>
                          <span class="text-blue-700">${req}</span>
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                ` : ''}

                <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 class="text-xl font-semibold mb-4">📄 必要書類</h2>
                  <ul class="space-y-2">
                    ${application.requiredDocuments.map(doc => `
                      <li class="flex items-start">
                        <span class="text-green-500 mr-2 mt-1">✓</span>
                        <span>${doc}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>

                ${application.notes.length > 0 ? `
                  <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h2 class="text-xl font-semibold mb-4 text-yellow-800">⚠️ 注意事項</h2>
                    <ul class="space-y-2">
                      ${application.notes.map(note => `
                        <li class="text-yellow-700">• ${note}</li>
                      `).join('')}
                    </ul>
                  </div>
                ` : ''}
              </div>

              <div class="space-y-6">
                <div class="bg-white rounded-lg shadow-md p-6">
                  <h3 class="font-semibold mb-4 text-gray-800">📍 基本情報</h3>
                  <div class="space-y-3">
                    ${application.amount ? `
                      <div>
                        <span class="text-sm text-gray-500">💰 支給額・金額</span>
                        <p class="font-semibold text-green-600">${application.amount}</p>
                      </div>
                    ` : ''}
                    ${application.deadline ? `
                      <div>
                        <span class="text-sm text-gray-500">⏰ 提出期限</span>
                        <p class="font-semibold text-red-600">${application.deadline}</p>
                      </div>
                    ` : ''}
                    <div>
                      <span class="text-sm text-gray-500">🏢 提出先</span>
                      <p class="font-semibold">${application.location}</p>
                    </div>
                    <div>
                      <span class="text-sm text-gray-500">🏛️ 担当課</span>
                      <p class="font-semibold">${application.department}</p>
                    </div>
                  </div>
                </div>

                <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 class="font-semibold mb-3 text-blue-800">💡 ワンポイント</h3>
                  <p class="text-blue-700 text-sm">
                    事前に電話で確認すると、スムーズに手続きできます。不明な点があれば、遠慮なく担当課にお問い合わせください。
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  `)
})

export default app
