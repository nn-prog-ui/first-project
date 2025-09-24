import { Application, CategoryInfo, ApplicationCategory } from './types'

// カテゴリ情報
export const categories: CategoryInfo[] = [
  { id: 'marriage', name: '結婚関連', description: '婚姻届、結婚祝い金など', icon: '💑' },
  { id: 'moving', name: '引越し関連', description: '転入・転出届、住民票など', icon: '🏠' },
  { id: 'birth', name: '出産・子育て関連', description: '出生届、児童手当、保育園など', icon: '👶' },
  { id: 'elderly', name: '高齢者関連', description: '介護保険、敬老祝い金など', icon: '👴' },
  { id: 'disability', name: '障害者関連', description: '障害者手帳、福祉サービスなど', icon: '🦽' },
  { id: 'employment', name: '就労関連', description: '失業給付、就労支援など', icon: '💼' },
  { id: 'housing', name: '住宅関連', description: '住宅確保給付金、住宅改修など', icon: '🏘️' },
  { id: 'medical', name: '医療関連', description: '医療費助成、健康診断など', icon: '🏥' },
  { id: 'other', name: 'その他', description: 'その他の申請・手続き', icon: '📋' }
]

// 申請データ
export const applications: Application[] = [
  // 結婚関連
  {
    id: 'marriage-001',
    title: '婚姻届',
    category: 'marriage',
    description: '結婚する際に提出する届出書類。法的に夫婦関係を成立させるために必要です。',
    amount: null,
    deadline: '結婚後すみやかに（遡及不可）',
    location: '市民課窓口（1階）',
    department: '市民課',
    requiredDocuments: [
      '婚姻届書（証人2名の署名・押印必要）',
      '戸籍謄本（本籍地以外で提出する場合）',
      '本人確認書類（運転免許証、パスポートなど）',
      '印鑑（認印可）'
    ],
    notes: [
      '証人は成人（18歳以上）である必要があります',
      '本籍地での提出の場合、戸籍謄本は不要です',
      '土日祝日も宿直室で受付可能です'
    ],
    keywords: ['結婚', '婚姻', '夫婦', '届出', '戸籍']
  },
  {
    id: 'marriage-002',
    title: '結婚新生活支援補助金',
    category: 'marriage',
    description: '新婚世帯の住居費や引越し費用を支援する補助金制度です。',
    amount: '最大30万円',
    deadline: '婚姻届提出から1年以内',
    location: '子育て支援課窓口（2階）',
    department: '子育て支援課',
    requiredDocuments: [
      '申請書',
      '婚姻届受理証明書',
      '住民票（夫婦の記載があるもの）',
      '住宅の売買契約書または賃貸借契約書',
      '引越し業者の領収書',
      '所得証明書（夫婦分）'
    ],
    notes: [
      '夫婦合算所得が400万円未満の世帯が対象',
      '市内に住所を有すること',
      '他の自治体で同様の補助を受けていないこと'
    ],
    keywords: ['結婚', '新生活', '補助金', '住居', '引越し']
  },

  // 引越し関連
  {
    id: 'moving-001',
    title: '転入届',
    category: 'moving',
    description: '他の市町村から当市に住所を移した際に提出する届出です。',
    amount: null,
    deadline: '転入から14日以内',
    location: '市民課窓口（1階）',
    department: '市民課',
    requiredDocuments: [
      '転出証明書（前住所地で発行）',
      '本人確認書類',
      '印鑑',
      'マイナンバーカードまたは通知カード'
    ],
    notes: [
      '家族全員分の手続きが必要です',
      '国民健康保険の加入手続きも同時に行えます',
      '印鑑登録も同時申請可能です'
    ],
    keywords: ['転入', '住所変更', '引越し', '住民票']
  },
  {
    id: 'moving-002',
    title: '住居確保給付金',
    category: 'moving',
    description: '離職等により住居を失った方、または失うおそれのある方に家賃相当額を支給します。',
    amount: '月額上限4万円（最大9ヶ月）',
    deadline: '離職から2年以内',
    location: '生活福祉課窓口（1階）',
    department: '生活福祉課',
    requiredDocuments: [
      '申請書',
      '本人確認書類',
      '離職証明書または廃業届',
      '住宅の賃貸借契約書',
      '家賃の領収書',
      '通帳のコピー',
      '求職活動を行っていることを証明する書類'
    ],
    notes: [
      '収入・資産要件があります',
      'ハローワークでの求職活動が必要です',
      '生活保護受給者は対象外です'
    ],
    keywords: ['住居', '家賃', '給付金', '失業', '支援']
  },

  // 出産・子育て関連
  {
    id: 'birth-001',
    title: '出生届',
    category: 'birth',
    description: '子どもが生まれた際に提出する届出書類です。',
    amount: null,
    deadline: '出生から14日以内',
    location: '市民課窓口（1階）',
    department: '市民課',
    requiredDocuments: [
      '出生届書（医師または助産師の証明必要）',
      '母子健康手帳',
      '印鑑',
      '本人確認書類'
    ],
    notes: [
      '父または母が届出人になれます',
      '里帰り出産の場合も出生地で提出可能です',
      '土日祝日も宿直室で受付可能です'
    ],
    keywords: ['出生', '赤ちゃん', '届出', '戸籍']
  },
  {
    id: 'birth-002',
    title: '児童手当',
    category: 'birth',
    description: '中学校卒業まで（15歳到達後最初の3月31日まで）の児童を養育している方に支給されます。',
    amount: '月額1万円〜1万5千円',
    deadline: '出生・転入から15日以内',
    location: '子育て支援課窓口（2階）',
    department: '子育て支援課',
    requiredDocuments: [
      '認定請求書',
      '請求者の健康保険証',
      '請求者名義の通帳',
      '印鑑',
      '所得証明書（転入の場合）'
    ],
    notes: [
      '所得制限があります',
      '公務員は勤務先での申請となります',
      '支給は申請の翌月分からです'
    ],
    keywords: ['児童手当', '子ども', '支給', '子育て']
  },
  {
    id: 'birth-003',
    title: '出産育児一時金',
    category: 'birth',
    description: '出産にかかる費用の負担軽減のため、健康保険から支給される一時金です。',
    amount: '50万円',
    deadline: '出産から2年以内',
    location: '保険年金課窓口（1階）',
    department: '保険年金課',
    requiredDocuments: [
      '出産育児一時金支給申請書',
      '医療機関等の領収書・明細書',
      '母子健康手帳',
      '健康保険証',
      '振込先口座の通帳',
      '印鑑'
    ],
    notes: [
      '直接支払制度を利用した場合は差額のみ申請',
      '死産の場合も妊娠85日以降であれば対象',
      '国民健康保険加入者が対象'
    ],
    keywords: ['出産', '一時金', '健康保険', '支給']
  },

  // 高齢者関連
  {
    id: 'elderly-001',
    title: '介護保険被保険者証',
    category: 'elderly',
    description: '65歳になった方に交付される介護保険の被保険者証です。',
    amount: null,
    deadline: '65歳到達月',
    location: '高齢福祉課窓口（2階）',
    department: '高齢福祉課',
    requiredDocuments: [
      '本人確認書類',
      '印鑑'
    ],
    notes: [
      '65歳到達月に自動的に郵送されます',
      '紛失時は再発行可能です',
      '要介護認定を受ける際に必要です'
    ],
    keywords: ['介護保険', '高齢者', '65歳', '被保険者証']
  },

  // 医療関連
  {
    id: 'medical-001',
    title: '子ども医療費助成',
    category: 'medical',
    description: '中学校卒業まで（15歳到達後最初の3月31日まで）の子どもの医療費を助成します。',
    amount: '医療費の自己負担分',
    deadline: '対象となってから随時',
    location: '子育て支援課窓口（2階）',
    department: '子育て支援課',
    requiredDocuments: [
      '申請書',
      '子どもの健康保険証',
      '印鑑',
      '所得証明書（転入の場合）'
    ],
    notes: [
      '所得制限があります',
      '県外受診時は償還払いとなります',
      '入院時の食事代は対象外です'
    ],
    keywords: ['子ども', '医療費', '助成', '健康保険']
  },

  // その他
  {
    id: 'other-001',
    title: 'マイナンバーカード',
    category: 'other',
    description: 'プラスチック製のICチップ付きカードで、本人確認書類として利用できます。',
    amount: null,
    deadline: 'なし（随時申請可能）',
    location: '市民課窓口（1階）',
    department: '市民課',
    requiredDocuments: [
      '申請書',
      '本人確認書類',
      '住民基本台帳カード（お持ちの場合）',
      '通知カード'
    ],
    notes: [
      '申請から受取まで約1ヶ月かかります',
      '15歳未満の方は法定代理人の同行が必要です',
      'オンライン申請も可能です'
    ],
    keywords: ['マイナンバー', 'カード', '本人確認', 'IC']
  }
]

// カテゴリ別の申請数を取得
export function getApplicationCountByCategory(): Record<ApplicationCategory, number> {
  const counts: Record<ApplicationCategory, number> = {
    marriage: 0, moving: 0, birth: 0, elderly: 0, disability: 0,
    employment: 0, housing: 0, medical: 0, other: 0
  }
  
  applications.forEach(app => {
    counts[app.category]++
  })
  
  return counts
}

// カテゴリIDから名前を取得
export function getCategoryName(categoryId: ApplicationCategory): string {
  const category = categories.find(c => c.id === categoryId)
  return category ? category.name : 'その他'
}