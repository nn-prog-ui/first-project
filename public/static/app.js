// グローバル変数
let allApplications = [];
let allCategories = [];
let currentTarget = 'individual'; // 'individual' or 'corporate'
let currentFilters = {
  target: 'individual',
  category: '',
  keyword: '',
  hasDeadline: false,
  hasAmount: false
};

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

async function initializeApp() {
  try {
    // 初期ターゲットを設定
    currentFilters.target = currentTarget;
    
    // カテゴリと申請データを取得
    await Promise.all([
      loadCategories(currentTarget),
      loadApplications({ target: currentTarget })
    ]);
    
    // UI要素のイベントリスナーを設定
    setupEventListeners();
    
    // 初期表示
    updateUI();
    renderCategories();
    renderApplications(allApplications);
    
  } catch (error) {
    console.error('初期化エラー:', error);
    showError('データの読み込みに失敗しました。ページを再読み込みしてください。');
  }
}

// カテゴリデータを取得
async function loadCategories(target = 'individual') {
  try {
    const response = await fetch(`/api/categories?target=${target}`);
    if (!response.ok) throw new Error('カテゴリデータの取得に失敗');
    allCategories = await response.json();
    
    // セレクトボックスをクリアして再構築
    const categorySelect = document.getElementById('categoryFilter');
    categorySelect.innerHTML = '<option value="">すべてのカテゴリ</option>';
    
    allCategories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = `${category.icon} ${category.name}`;
      categorySelect.appendChild(option);
    });
  } catch (error) {
    console.error('カテゴリ取得エラー:', error);
    throw error;
  }
}

// 申請データを取得
async function loadApplications(filters = {}) {
  try {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    const response = await fetch(`/api/applications?${params}`);
    if (!response.ok) throw new Error('申請データの取得に失敗');
    const fetchedApplications = await response.json();
    
    // 全データを常に保持（フィルタなしの場合）
    if (!filters || Object.keys(filters).length === 0 || (filters.target && Object.keys(filters).length === 1)) {
      allApplications = fetchedApplications;
    }
    
    return fetchedApplications;
  } catch (error) {
    console.error('申請データ取得エラー:', error);
    throw error;
  }
}

// 全申請データをロード（カテゴリ件数計算用）
async function loadAllApplicationsForTarget(target) {
  try {
    const response = await fetch(`/api/applications?target=${target}`);
    if (!response.ok) throw new Error('全申請データの取得に失敗');
    return await response.json();
  } catch (error) {
    console.error('全申請データ取得エラー:', error);
    return [];
  }
}

// イベントリスナーの設定
function setupEventListeners() {
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const searchBtn = document.getElementById('searchBtn');
  const individualTab = document.getElementById('individualTab');
  const corporateTab = document.getElementById('corporateTab');
  
  // ターゲット切り替え
  individualTab.addEventListener('click', () => switchTarget('individual'));
  corporateTab.addEventListener('click', () => switchTarget('corporate'));
  
  // 検索ボタンクリック
  searchBtn.addEventListener('click', handleSearch);
  
  // Enterキーで検索
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });
  
  // カテゴリ変更時に自動検索
  categoryFilter.addEventListener('change', handleSearch);
}

// 検索処理
async function handleSearch() {
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  
  currentFilters = {
    target: currentTarget,
    keyword: searchInput.value.trim(),
    category: categoryFilter.value,
    hasDeadline: false,
    hasAmount: false
  };
  
  try {
    showLoading();
    const filteredApplications = await loadApplications(currentFilters);
    renderApplications(filteredApplications);
  } catch (error) {
    showError('検索に失敗しました。再度お試しください。');
  } finally {
    hideLoading();
  }
}

// カテゴリ別フィルター
async function filterByCategory(categoryId) {
  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.value = categoryId;
  
  currentFilters.category = categoryId;
  currentFilters.target = currentTarget;
  
  try {
    showLoading();
    const filteredApplications = await loadApplications(currentFilters);
    renderApplications(filteredApplications);
  } catch (error) {
    showError('フィルタリングに失敗しました。');
  } finally {
    hideLoading();
  }
}

// カテゴリグリッドの表示
function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;
  
  const categoryCount = getCategoryCount();
  
  grid.innerHTML = allCategories.map(category => `
    <div 
      class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer border-2 border-transparent hover:border-blue-200"
      onclick="filterByCategory('${category.id}')"
    >
      <div class="text-3xl text-center mb-2">${category.icon}</div>
      <h3 class="font-semibold text-center text-gray-800">${category.name}</h3>
      <p class="text-sm text-gray-600 text-center mt-1">${category.description}</p>
      <div class="text-center mt-2">
        <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
          ${categoryCount[category.id] || 0}件
        </span>
      </div>
    </div>
  `).join('');
}

// カテゴリ別の件数を取得
function getCategoryCount() {
  const count = {};
  allCategories.forEach(cat => count[cat.id] = 0);
  allApplications.forEach(app => {
    if (count.hasOwnProperty(app.category)) {
      count[app.category]++;
    }
  });
  return count;
}



// ローディング表示
function showLoading() {
  const container = document.getElementById('applicationsList');
  if (!container) return;
  
  container.innerHTML = `
    <div class="text-center py-8">
      <div class="animate-spin text-blue-600 text-3xl mb-4">⏳</div>
      <p class="text-gray-600">検索中...</p>
    </div>
  `;
}

// ローディング非表示
function hideLoading() {
  // renderApplications で内容が置き換わるため、特に処理不要
}

// エラー表示
function showError(message) {
  const container = document.getElementById('applicationsList');
  if (!container) return;
  
  container.innerHTML = `
    <div class="text-center py-8">
      <div class="text-red-500 text-4xl mb-4">⚠️</div>
      <h3 class="text-lg font-semibold text-red-600 mb-2">エラーが発生しました</h3>
      <p class="text-gray-600">${message}</p>
    </div>
  `;
}

// ターゲット切り替え処理
async function switchTarget(target) {
  if (currentTarget === target) return;
  
  currentTarget = target;
  currentFilters.target = target;
  currentFilters.category = ''; // カテゴリをリセット
  
  // UI更新
  updateUI();
  
  // 検索入力をクリア
  const searchInput = document.getElementById('searchInput');
  searchInput.value = '';
  
  // カテゴリフィルターもクリア
  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.value = '';
  
  try {
    showLoading();
    
    // カテゴリと申請データを再読み込み
    await Promise.all([
      loadCategories(target),
      loadApplications({ target })
    ]);
    
    // 表示更新
    renderCategories();
    renderApplications(allApplications);
    
  } catch (error) {
    showError('データの読み込みに失敗しました。');
  } finally {
    hideLoading();
  }
}

// UI要素の更新
function updateUI() {
  const individualTab = document.getElementById('individualTab');
  const corporateTab = document.getElementById('corporateTab');
  const searchInput = document.getElementById('searchInput');
  const searchTitle = document.getElementById('searchTitle');
  const applicationsTitle = document.getElementById('applicationsTitle');
  
  // タブの見た目を更新
  if (currentTarget === 'individual') {
    individualTab.className = 'px-4 py-2 rounded-md text-sm font-medium transition-colors bg-white text-blue-600';
    corporateTab.className = 'px-4 py-2 rounded-md text-sm font-medium transition-colors text-white hover:bg-blue-400';
    
    searchInput.placeholder = 'キーワードで検索（例：結婚、引越し、出産）';
    searchTitle.textContent = '手続きを探す';
    applicationsTitle.textContent = '申請・手続き一覧';
  } else {
    corporateTab.className = 'px-4 py-2 rounded-md text-sm font-medium transition-colors bg-white text-blue-600';
    individualTab.className = 'px-4 py-2 rounded-md text-sm font-medium transition-colors text-white hover:bg-blue-400';
    
    searchInput.placeholder = 'キーワードで検索（例：助成金、補助金、創業）';
    searchTitle.textContent = '助成金を探す';
    applicationsTitle.textContent = '助成金・補助金一覧';
  }
}

// 申請リストの表示（法人向け対応）
function renderApplications(applications) {
  const container = document.getElementById('applicationsList');
  if (!container) return;
  
  if (applications.length === 0) {
    const emptyMessage = currentTarget === 'corporate' 
      ? '該当する助成金が見つかりません' 
      : '該当する申請が見つかりません';
    
    container.innerHTML = `
      <div class="text-center py-8">
        <div class="text-gray-400 text-4xl mb-4">🔍</div>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">${emptyMessage}</h3>
        <p class="text-gray-500">検索条件を変更して再度お試しください。</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = applications.map(app => {
    const categoryInfo = allCategories.find(cat => cat.id === app.category);
    const categoryName = categoryInfo ? categoryInfo.name : 'その他';
    const categoryIcon = categoryInfo ? categoryInfo.icon : '📋';
    
    // 法人向けか個人向けかでスタイルを変える
    const targetBadge = app.target === 'corporate' 
      ? '<span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full ml-2">🏢 法人向け</span>'
      : '<span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full ml-2">👤 個人向け</span>';
    
    return `
      <div class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
        <div class="flex justify-between items-start mb-3">
          <h3 class="text-lg font-semibold text-gray-800">
            <a href="/application/${app.id}" class="hover:text-blue-600 transition-colors">
              ${app.title}
            </a>
          </h3>
          <div class="shrink-0 ml-2">
            <span class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
              ${categoryIcon} ${categoryName}
            </span>
            ${targetBadge}
          </div>
        </div>
        
        <p class="text-gray-600 mb-4 leading-relaxed">${app.description}</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          ${app.amount ? `
            <div class="flex items-center">
              <span class="text-green-600 mr-2">💰</span>
              <div>
                <div class="text-xs text-gray-500">${app.target === 'corporate' ? '助成金額' : '支給額・金額'}</div>
                <div class="font-semibold text-green-600">${app.amount}</div>
              </div>
            </div>
          ` : ''}
          
          ${app.deadline ? `
            <div class="flex items-center">
              <span class="text-red-600 mr-2">⏰</span>
              <div>
                <div class="text-xs text-gray-500">${app.target === 'corporate' ? '申請期限' : '提出期限'}</div>
                <div class="font-semibold text-red-600">${app.deadline}</div>
              </div>
            </div>
          ` : ''}
          
          <div class="flex items-center">
            <span class="text-blue-600 mr-2">🏢</span>
            <div>
              <div class="text-xs text-gray-500">${app.target === 'corporate' ? '申請先' : '提出先'}</div>
              <div class="font-semibold">${app.location}</div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-between items-center pt-4 border-t border-gray-100">
          <div class="text-sm text-gray-500">
            必要書類: ${app.requiredDocuments.length}点
          </div>
          <a 
            href="/application/${app.id}" 
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            詳細を見る
          </a>
        </div>
      </div>
    `;
  }).join('');
}

// ユーティリティ関数: スムーズスクロール
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}