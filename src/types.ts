// 申請データの型定義
export interface Application {
  id: string
  title: string
  category: ApplicationCategory
  description: string
  amount: string | null
  deadline: string | null
  location: string
  department: string
  requiredDocuments: string[]
  notes: string[]
  keywords: string[]
}

export type ApplicationCategory = 
  | 'marriage'      // 結婚関連
  | 'moving'        // 引越し関連
  | 'birth'         // 出産・子育て関連
  | 'elderly'       // 高齢者関連
  | 'disability'    // 障害者関連
  | 'employment'    // 就労関連
  | 'housing'       // 住宅関連
  | 'medical'       // 医療関連
  | 'other'         // その他

export interface CategoryInfo {
  id: ApplicationCategory
  name: string
  description: string
  icon: string
}

export interface SearchFilters {
  category?: ApplicationCategory
  keyword?: string
  hasDeadline?: boolean
  hasAmount?: boolean
}