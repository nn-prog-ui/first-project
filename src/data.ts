import { Application, CategoryInfo, ApplicationCategory, ApplicationTarget } from './types'

// カテゴリ情報
export const categories: CategoryInfo[] = [
  // 個人向けカテゴリ
  { id: 'marriage', name: '結婚関連', description: '婚姻届、結婚祝い金など', icon: '💑', target: 'individual' },
  { id: 'moving', name: '引越し関連', description: '転入・転出届、住民票など', icon: '🏠', target: 'individual' },
  { id: 'birth', name: '出産・子育て関連', description: '出生届、児童手当、保育園など', icon: '👶', target: 'individual' },
  { id: 'elderly', name: '高齢者関連', description: '介護保険、敬老祝い金など', icon: '👴', target: 'individual' },
  { id: 'disability', name: '障害者関連', description: '障害者手帳、福祉サービスなど', icon: '🦽', target: 'individual' },
  { id: 'employment', name: '就労関連', description: '失業給付、就労支援など', icon: '💼', target: 'individual' },
  { id: 'housing', name: '住宅関連', description: '住宅確保給付金、住宅改修など', icon: '🏘️', target: 'individual' },
  { id: 'medical', name: '医療関連', description: '医療費助成、健康診断など', icon: '🏥', target: 'individual' },
  { id: 'other', name: 'その他', description: 'その他の申請・手続き', icon: '📋', target: 'individual' },
  
  // 法人向けカテゴリ
  { id: 'startup', name: '起業・創業支援', description: 'スタートアップ、新規事業立ち上げ', icon: '🚀', target: 'corporate' },
  { id: 'employment-support', name: '雇用関連助成金', description: '従業員の雇用・育成支援', icon: '👥', target: 'corporate' },
  { id: 'training', name: '人材育成・研修', description: '従業員スキルアップ、研修費支援', icon: '📚', target: 'corporate' },
  { id: 'innovation', name: '技術開発・イノベーション', description: 'R&D、新技術開発支援', icon: '💡', target: 'corporate' },
  { id: 'environment', name: '環境・エコ関連', description: '省エネ、環境配慮型事業支援', icon: '🌱', target: 'corporate' },
  { id: 'digitization', name: 'デジタル化・DX', description: 'IT導入、デジタル変革支援', icon: '💻', target: 'corporate' },
  { id: 'regional', name: '地域活性化', description: '地方創生、地域貢献事業', icon: '🏛️', target: 'corporate' },
  { id: 'export', name: '輸出・海外展開', description: '海外進出、貿易促進支援', icon: '🌍', target: 'corporate' },
  { id: 'corporate-other', name: 'その他法人向け', description: 'その他の法人向け支援制度', icon: '🏢', target: 'corporate' }
]

// 申請データ
export const applications: Application[] = [
  // 個人向け申請（既存データ）
  {
    id: 'marriage-001',
    title: '婚姻届',
    category: 'marriage',
    target: 'individual',
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
    id: 'birth-001',
    title: '児童手当',
    category: 'birth',
    target: 'individual',
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
    id: 'marriage-002',
    title: '結婚新生活支援補助金',
    category: 'marriage',
    target: 'individual',
    description: '新婚世帯の住居費や引越し費用を支援する補助金制度です。',
    amount: '最大30万円',
    deadline: '婚姻届提出から1年以内',
    location: '子育て支援課窓口（２階）',
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
  {
    id: 'moving-001',
    title: '転入届',
    category: 'moving',
    target: 'individual',
    description: '他の市町村から当市に住所を移した際に提出する届出です。',
    amount: null,
    deadline: '転入から14日以内',
    location: '市民課窓口（１階）',
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
    target: 'individual',
    description: '離職等により住居を失った方、または失うおそれのある方に家賃相当額を支給します。',
    amount: '月額上限4万円（最大9ヶ月）',
    deadline: '離職から2年以内',
    location: '生活福祉課窓口（１階）',
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
  {
    id: 'birth-001',
    title: '出生届',
    category: 'birth',
    target: 'individual',
    description: '子どもが生まれた際に提出する届出書類です。',
    amount: null,
    deadline: '出生から14日以内',
    location: '市民課窓口（１階）',
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
    id: 'birth-003',
    title: '出産育児一時金',
    category: 'birth',
    target: 'individual',
    description: '出産にかかる費用の負担軽減のため、健康保険から支給される一時金です。',
    amount: '50万円',
    deadline: '出産から2年以内',
    location: '保険年金課窓口（１階）',
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
  {
    id: 'elderly-001',
    title: '介護保険被保険者証',
    category: 'elderly',
    target: 'individual',
    description: '65歳になった方に交付される介護保険の被保険者証です。',
    amount: null,
    deadline: '65歳到達月',
    location: '高齢福祉課窓口（２階）',
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
  {
    id: 'medical-001',
    title: '子ども医療費助成',
    category: 'medical',
    target: 'individual',
    description: '中学校卒業まで（15歳到達後最初の3月31日まで）の子どもの医療費を助成します。',
    amount: '医療費の自己負担分',
    deadline: '対象となってから随時',
    location: '子育て支援課窓口（２階）',
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
  {
    id: 'other-001',
    title: 'マイナンバーカード',
    category: 'other',
    target: 'individual',
    description: 'プラスチック製のICチップ付きカードで、本人確認書類として利用できます。',
    amount: null,
    deadline: 'なし（随時申請可能）',
    location: '市民課窓口（１階）',
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
  },

  // 法人向け助成金（新規追加）
  {
    id: 'startup-001',
    title: '創業支援助成金',
    category: 'startup',
    target: 'corporate',
    description: '新たに事業を開始する法人や個人事業主に対する創業資金の助成制度です。',
    story: '【活用事例】田中さん（35歳）がカフェを開業するケース\n\n田中さんは長年サラリーマンとして働いていましたが、夢だったカフェ経営を実現するため脱サラを決意。しかし開業資金が不足していました。\n\n創業支援助成金を活用することで：\n• 店舗改装費：150万円\n• 設備購入費：100万円\n• 運転資金：50万円\n合計300万円中、最大200万円の助成を受けることができました。\n\n現在は地域に愛される人気カフェとして順調に経営を続けています。',
    amount: '最大200万円（対象経費の2/3以内）',
    deadline: '創業から6ヶ月以内',
    location: '産業振興課窓口（3階）',
    department: '産業振興課',
    requiredDocuments: [
      '創業支援助成金交付申請書',
      '事業計画書',
      '収支計画書',
      '法人登記簿謄本（法人の場合）',
      '開業届（個人事業主の場合）',
      '見積書・契約書等の関係書類',
      '口座通帳の写し'
    ],
    eligibilityRequirements: [
      '市内で新たに事業を開始する法人または個人事業主',
      '創業から1年以内であること',
      '市税を滞納していないこと',
      '1年以上市内で事業を継続する意思があること'
    ],
    notes: [
      '事前相談が必須です（申請前に必ず産業振興課にご相談ください）',
      '助成金の交付は実績報告書提出後となります',
      '他の創業支援制度との併用はできません'
    ],
    keywords: ['創業', 'スタートアップ', '開業', '新規事業', '起業']
  },

  {
    id: 'employment-001',
    title: 'キャリアアップ助成金（正社員化コース）',
    category: 'employment-support',
    target: 'corporate',
    description: '有期雇用労働者を正規雇用労働者に転換した事業主に対する助成金です。',
    story: '【活用事例】製造業のB社（従業員30名）のケース\n\nB社では優秀なパート社員の山田さんを正社員として雇用したいと考えていました。しかし人件費の増加が経営を圧迫する懸念がありました。\n\nキャリアアップ助成金を活用した結果：\n• 山田さんを正社員として雇用（月給25万円）\n• 助成金57万円を受給\n• 山田さんのモチベーション向上により生産性アップ\n• 他のパート社員も正社員を目指すようになり職場全体が活性化\n\n現在、B社では計画的に有期雇用者の正社員転換を進めています。',
    amount: '1人あたり57万円（中小企業の場合）',
    deadline: '転換後6ヶ月経過後、2ヶ月以内',
    location: 'ハローワーク（市からの紹介状が必要）',
    department: '産業振興課（紹介状発行）',
    requiredDocuments: [
      'キャリアアップ計画書',
      '就業規則',
      '雇用契約書（転換前後）',
      '賃金台帳',
      '労働者名簿',
      '転換実施日を証明する書類'
    ],
    eligibilityRequirements: [
      '雇用保険の適用事業主であること',
      'キャリアアップ管理者を配置していること',
      'キャリアアップ計画を作成し、管轄労働局長の認定を受けていること',
      '転換後6ヶ月間継続雇用していること'
    ],
    notes: [
      'ハローワークでの手続きが必要です',
      '事前にキャリアアップ計画の認定を受けてください',
      '転換前後の労働条件を明確にしてください'
    ],
    keywords: ['正社員', '転換', '雇用', 'キャリアアップ', '人材']
  },

  {
    id: 'training-001',
    title: '人材開発支援助成金（特定訓練コース）',
    category: 'training',
    target: 'corporate',
    description: '労働者の職業能力開発を実施する事業主に対する訓練経費と訓練期間中の賃金の一部を助成する制度です。',
    story: '【活用事例】IT企業のC社（従業員15名）のケース\n\nC社では新しいプログラミング言語の習得が急務でしたが、外部研修費用が高額で躊躇していました。\n\n人材開発支援助成金を活用することで：\n• 社員5名がPython研修を受講（1人当たり20万円）\n• 訓練経費の助成：60万円（研修費100万円の60%）\n• 賃金助成：37.5万円（時間当たり760円×研修時間）\n• 合計97.5万円の助成を受給\n\n研修後、新技術を活用した新サービスの開発に成功し、売上が30%向上しました。',
    amount: '訓練経費の60%＋賃金助成760円/時間',
    deadline: '訓練開始日の1ヶ月前まで',
    location: 'ハローワーク（市からの紹介状が必要）',
    department: '産業振興課（紹介状発行）',
    requiredDocuments: [
      '事業内職業能力開発計画',
      '年間職業能力開発計画',
      '職業能力開発推進者選任届',
      '訓練計画届',
      '研修カリキュラム',
      '講師の経歴書',
      '訓練経費の見積書'
    ],
    eligibilityRequirements: [
      '雇用保険の適用事業主であること',
      '職業能力開発推進者を選任していること',
      '事業内職業能力開発計画を策定していること',
      '訓練時間が20時間以上であること'
    ],
    notes: [
      '計画届の提出が訓練開始1ヶ月前までに必要です',
      '訓練内容は職務に関連する必要があります',
      '訓練実施後の効果測定が求められます'
    ],
    keywords: ['研修', '訓練', '人材育成', 'スキルアップ', '能力開発']
  },

  {
    id: 'innovation-001',
    title: 'ものづくり補助金',
    category: 'innovation',
    target: 'corporate',
    description: '中小企業・小規模事業者等の生産性向上に資する革新的サービス開発・試作品開発・生産プロセスの改善を支援する補助金です。',
    story: '【活用事例】金属加工業のD社（従業員8名）のケース\n\nD社では従来の手作業による加工から自動化への転換を検討していましたが、設備投資額が大きく踏み切れずにいました。\n\nものづくり補助金を活用した結果：\n• 最新のNC旋盤を導入（総額800万円）\n• 補助金533万円を獲得（補助率2/3）\n• 加工時間を50%短縮\n• 品質の安定化を実現\n• 新規顧客開拓に成功し売上20%増\n\n現在は第2弾として検査設備の自動化も検討中です。',
    amount: '最大1,000万円（補助率2/3）',
    deadline: '年3回程度（公募スケジュールによる）',
    location: '商工会議所（申請サポート）',
    department: '産業振興課（相談窓口）',
    requiredDocuments: [
      '事業計画書',
      '技術面の説明資料',
      '事業の実施体制',
      '資金調達内訳',
      '事業実施スケジュール',
      '収支計画',
      '決算書（直近3年分）',
      '見積書'
    ],
    eligibilityRequirements: [
      '中小企業・小規模事業者であること',
      '付加価値額年率平均3%以上の増加を目標とすること',
      '給与支給総額年率平均1.5%以上の増加を目標とすること',
      '事業場内最低賃金を地域別最低賃金+30円以上とすること'
    ],
    notes: [
      '採択率は約50%程度です',
      '事業計画書の作成が重要なポイントです',
      '商工会議所での事前相談を強く推奨します'
    ],
    keywords: ['ものづくり', '設備投資', '生産性向上', '補助金', '技術革新']
  },

  {
    id: 'digitization-001',
    title: 'IT導入補助金',
    category: 'digitization',
    target: 'corporate',
    description: '中小企業・小規模事業者がITツールを導入する際の経費の一部を補助する制度です。',
    story: '【活用事例】建設業のE社（従業員12名）のケース\n\nE社では紙ベースの工程管理に限界を感じ、デジタル化を検討していました。しかしシステム導入費用とその効果に不安がありました。\n\nIT導入補助金を活用することで：\n• 工程管理システムを導入（総額180万円）\n• 補助金90万円を獲得（補助率1/2）\n• 工程の見える化により工期短縮30%\n• 材料ロス削減で原価10%改善\n• 顧客への進捗報告が自動化され信頼度向上\n\n投資回収は1年以内に完了し、現在は営業支援システムの導入も検討中です。',
    amount: '最大450万円（補助率1/2）',
    deadline: '年数回（公募スケジュールによる）',
    location: 'IT導入支援事業者経由',
    department: '産業振興課（相談窓口）',
    requiredDocuments: [
      '交付申請書',
      'ITツールの機能・仕様',
      '導入効果の説明資料',
      '事業計画書',
      '見積書',
      '決算書（直近分）',
      '履歴事項全部証明書'
    ],
    eligibilityRequirements: [
      '中小企業・小規模事業者であること',
      'IT導入支援事業者と契約すること',
      '補助事業を適切に遂行できる体制があること',
      '導入するITツールが事務局に登録されていること'
    ],
    notes: [
      'IT導入支援事業者選びが重要です',
      '導入効果の数値目標設定が必要です',
      '事業実績報告が義務付けられています'
    ],
    keywords: ['IT', 'デジタル化', 'DX', 'システム導入', '業務効率化']
  },

  {
    id: 'environment-001',
    title: '省エネ設備導入促進補助金',
    category: 'environment',
    target: 'corporate',
    description: '中小企業が省エネルギー効果の高い設備を導入する際の経費を補助する制度です。',
    story: '【活用事例】食品製造業のF社（従業員20名）のケース\n\nF社では電気代の高騰により利益を圧迫されていました。LED化や空調設備の更新を検討していましたが、初期投資額の大きさがネックでした。\n\n省エネ設備導入促進補助金を活用した結果：\n• LED照明への全面切り替え（150万円）\n• 高効率空調設備の導入（300万円）\n• 補助金225万円を獲得（補助率1/2）\n• 電気料金を年間180万円削減\n• CO2排出量を40%削減し環境貢献\n• 1.2年で投資回収完了\n\n現在は太陽光発電システムの導入も検討中です。',
    amount: '最大500万円（補助率1/2）',
    deadline: '年2回（7月、12月頃）',
    location: '環境政策課窓口（2階）',
    department: '環境政策課',
    requiredDocuments: [
      '補助金交付申請書',
      '省エネ効果計算書',
      '設備仕様書',
      '見積書',
      '設置場所の図面',
      '電気使用量実績（直近1年分）',
      '法人登記簿謄本'
    ],
    eligibilityRequirements: [
      '市内に事業所を有する中小企業であること',
      '省エネ効果が10%以上見込まれること',
      '市税を滞納していないこと',
      '環境関連法令を遵守していること'
    ],
    notes: [
      '省エネ効果の算定根拠が重要です',
      '設備導入前に必ず申請してください',
      '導入後の効果測定報告が必要です'
    ],
    keywords: ['省エネ', '環境', 'LED', '空調', 'CO2削減']
  }
]

// カテゴリ別の申請数を取得
export function getApplicationCountByCategory(): Record<ApplicationCategory, number> {
  const counts: Record<ApplicationCategory, number> = {
    marriage: 0, moving: 0, birth: 0, elderly: 0, disability: 0,
    employment: 0, housing: 0, medical: 0, other: 0,
    startup: 0, 'employment-support': 0, training: 0, innovation: 0, 
    environment: 0, digitization: 0, regional: 0, export: 0, 'corporate-other': 0
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

// 対象別にカテゴリを取得
export function getCategoriesByTarget(target: ApplicationTarget): CategoryInfo[] {
  return categories.filter(cat => cat.target === target)
}

// 対象別に申請を取得
export function getApplicationsByTarget(target: ApplicationTarget): Application[] {
  return applications.filter(app => app.target === target)
}