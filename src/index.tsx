import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import { applications, categories, getCategoryName, getCategoriesByTarget, getApplicationsByTarget } from './data'
import { SearchFilters, ApplicationTarget } from './types'

const app = new Hono()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Use JSX renderer for HTML pages
app.use(renderer)

// API Routes
app.get('/api/applications', (c) => {
  const { target, category, keyword, hasDeadline, hasAmount } = c.req.query() as SearchFilters
  
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
    return c.json(getCategoriesByTarget(target as ApplicationTarget))
  }
  
  return c.json(categories)
})

// Main page
app.get('/', (c) => {
  return c.render(
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold flex items-center">
            <span className="mr-3">🏛️</span>
            市役所申請ガイド
          </h1>
          <p className="text-blue-100 mt-2">個人・法人の申請・助成金手続きを分かりやすくご案内</p>
          
          {/* Target Toggle */}
          <div className="mt-4 flex space-x-1 bg-blue-500 rounded-lg p-1 w-fit">
            <button 
              id="individualTab"
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors bg-white text-blue-600"
            >
              👤 個人向け
            </button>
            <button 
              id="corporateTab"
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors text-white hover:bg-blue-400"
            >
              🏢 法人向け
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="mr-2">🔍</span>
            <span id="searchTitle">手続きを探す</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input 
              type="text" 
              id="searchInput"
              placeholder="キーワードで検索"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select 
              id="categoryFilter"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">すべてのカテゴリ</option>
            </select>
            <button 
              id="searchBtn"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              検索
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8" id="categoriesGrid">
          {/* Categories will be loaded by JavaScript */}
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6" id="applicationsTitle">申請・手続き一覧</h2>
          <div id="applicationsList" className="space-y-4">
            {/* Applications will be loaded by JavaScript */}
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 市役所申請ガイド. このサイトは参考用です。最新情報は各自治体にお問い合わせください。</p>
        </div>
      </footer>
    </div>
  )
})

// Application detail page
app.get('/application/:id', (c) => {
  const id = c.req.param('id')
  const application = applications.find(app => app.id === id)
  
  if (!application) {
    return c.render(
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">申請が見つかりません</h1>
          <a href="/" className="text-blue-600 hover:underline">トップページに戻る</a>
        </div>
      </div>
    )
  }
  
  return c.render(
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <nav className="mb-2">
            <a href="/" className="text-blue-200 hover:text-white">← トップページに戻る</a>
          </nav>
          <h1 className="text-2xl font-bold">{application.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-blue-500 px-3 py-1 rounded-full text-sm">
              {getCategoryName(application.category)}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              application.target === 'corporate' 
                ? 'bg-purple-500 text-white' 
                : 'bg-green-500 text-white'
            }`}>
              {application.target === 'corporate' ? '🏢 法人向け' : '👤 個人向け'}
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">📋 申請内容</h2>
              <p className="text-gray-700 leading-relaxed">{application.description}</p>
            </div>

            {/* 法人向けのストーリー表示 */}
            {application.story && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 text-purple-800 flex items-center">
                  <span className="mr-2">📝</span>
                  活用事例・ストーリー
                </h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {application.story}
                </div>
              </div>
            )}

            {/* 申請要件（法人向けのみ） */}
            {application.eligibilityRequirements && application.eligibilityRequirements.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 text-blue-800">📊 申請要件</h2>
                <ul className="space-y-2">
                  {application.eligibilityRequirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-1">•</span>
                      <span className="text-blue-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">📄 必要書類</h2>
              <ul className="space-y-2">
                {application.requiredDocuments.map((doc, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {application.notes.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-yellow-800">⚠️ 注意事項</h2>
                <ul className="space-y-2">
                  {application.notes.map((note, index) => (
                    <li key={index} className="text-yellow-700">
                      • {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-4 text-gray-800">📍 基本情報</h3>
              <div className="space-y-3">
                {application.amount && (
                  <div>
                    <span className="text-sm text-gray-500">💰 支給額・金額</span>
                    <p className="font-semibold text-green-600">{application.amount}</p>
                  </div>
                )}
                {application.deadline && (
                  <div>
                    <span className="text-sm text-gray-500">⏰ 提出期限</span>
                    <p className="font-semibold text-red-600">{application.deadline}</p>
                  </div>
                )}
                <div>
                  <span className="text-sm text-gray-500">🏢 提出先</span>
                  <p className="font-semibold">{application.location}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">🏛️ 担当課</span>
                  <p className="font-semibold">{application.department}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-blue-800">💡 ワンポイント</h3>
              <p className="text-blue-700 text-sm">
                事前に電話で確認すると、スムーズに手続きできます。不明な点があれば、遠慮なく担当課にお問い合わせください。
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
})

export default app
