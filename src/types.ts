// 申請データの型定義
export interface Application {
  id: string
  title: string
  category: ApplicationCategory
  target: ApplicationTarget  // 新追加: 対象者（個人/法人）
  description: string
  story?: string  // 新追加: 活用ストーリー（法人向け）
  amount: string | null
  deadline: string | null
  location: string
  department: string
  requiredDocuments: string[]
  eligibilityRequirements?: string[]  // 新追加: 申請要件
  notes: string[]
  keywords: string[]
}

// 申請対象者の型定義
export type ApplicationTarget = 'individual' | 'corporate'  // 個人/法人

export type ApplicationCategory = 
  // 個人向けカテゴリ
  | 'marriage'      // 結婚関連
  | 'moving'        // 引越し関連
  | 'birth'         // 出産・子育て関連
  | 'elderly'       // 高齢者関連
  | 'disability'    // 障害者関連
  | 'employment'    // 就労関連
  | 'housing'       // 住宅関連
  | 'medical'       // 医療関連
  | 'other'         // その他
  // 法人向けカテゴリ
  | 'startup'       // 起業・創業支援
  | 'employment-support'  // 雇用関連助成金
  | 'training'      // 人材育成・研修
  | 'innovation'    // 技術開発・イノベーション
  | 'environment'   // 環境・エコ関連
  | 'digitization'  // デジタル化・DX
  | 'regional'      // 地域活性化
  | 'export'        // 輸出・海外展開
  | 'corporate-other' // その他法人向け

export interface CategoryInfo {
  id: ApplicationCategory
  name: string
  description: string
  icon: string
  target: ApplicationTarget  // 新追加: 対象者
}

export interface SearchFilters {
  target?: ApplicationTarget  // 新追加: 対象者フィルタ
  category?: ApplicationCategory
  keyword?: string
  hasDeadline?: boolean
  hasAmount?: boolean
}