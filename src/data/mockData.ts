// データの型定義もこちらに移動します
export interface Subscription {
  id: string
  name: string
  amount: number
  cycle: string
  nextPayment: Date
  cancelDeadline?: Date
  category: string
  color: string
}

// 課金システム用の型定義
export interface BillingInfo {
  userId: string
  isPremium: boolean
  subscriptionStartDate: Date
  nextBillingDate: Date
  monthlyFee: number
  freeTrialUsed: boolean
}

// ユーザー情報の型定義
export interface User {
  id: string
  email: string
  billingInfo: BillingInfo
}

// // --- 型定義 ---
// interface Subscription {
//   id: string
//   name: string
//   amount: number
//   cycle: '週額' | '月額' | '3ヶ月' | '6ヶ月' | '年額'
//   nextPayment: Date
//   cancelDeadline?: Date
//   category: string
//   color: string
// }

export interface CalendarEvent {
  subscription: Subscription
  type: 'payment' | 'cancel'
}

// サブスクリプションのデータをエクスポート
export const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    amount: 1490,
    cycle: '月額',
    nextPayment: new Date('2025-09-15'),
    category: 'エンターテイメント',
    color: 'bg-red-100 text-red-800',
  },
  {
    id: '2',
    name: 'Spotify',
    amount: 980,
    cycle: '月額',
    nextPayment: new Date('2025-08-20'),
    cancelDeadline: new Date('2025-02-13'),
    category: 'エンターテイメント',
    color: 'bg-green-100 text-green-800',
  },
  {
    id: '3',
    name: 'Adobe Creative Cloud',
    amount: 6480,
    cycle: '月額',
    nextPayment: new Date('2025-10-01'),
    category: 'ビジネス',
    color: 'bg-purple-100 text-purple-800',
  },
  {
    id: '4',
    name: 'Microsoft 365',
    amount: 1284,
    cycle: '月額',
    nextPayment: new Date('2025-08-10'),
    category: 'ビジネス',
    color: 'bg-blue-100 text-blue-800',
  },
  {
    id: '5',
    name: 'iCloud+',
    amount: 130,
    cycle: '月額',
    nextPayment: new Date('2025-08-25'),
    category: 'クラウド',
    color: 'bg-gray-100 text-gray-800',
  },
  {
    id: '6',
    name: 'Amazon Prime',
    amount: 4900,
    cycle: '年額',
    nextPayment: new Date('2025-08-10'),
    category: 'エンターテイメント',
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    id: '7',
    name: 'YouTube Premium',
    amount: 1180,
    cycle: '月額',
    nextPayment: new Date('2025-08-10'),
    category: 'エンターテイメント',
    color: 'bg-red-100 text-red-800',
  },
  {
    id: '8',
    name: 'Dropbox Plus',
    amount: 12000,
    cycle: '年額',
    nextPayment: new Date('2025-08-10'),
    category: 'クラウド',
    color: 'bg-blue-100 text-blue-800',
  },
  {
    id: '9',
    name: 'Disney+',
    amount: 990,
    cycle: '月額',
    nextPayment: new Date('2025-09-12'),
    cancelDeadline: new Date('2025-08-15'),
    category: 'エンターテイメント',
    color: 'bg-purple-100 text-purple-800',
  },
  {
    id: '10',
    name: 'GitHub Pro',
    amount: 4800,
    cycle: '年額',
    nextPayment: new Date('2025-08-10'),
    category: 'ビジネス',
    color: 'bg-gray-100 text-gray-800',
  },
  {
    id: '11',
    name: 'Fitbit Premium',
    amount: 980,
    cycle: '月額',
    nextPayment: new Date('2025-08-15'),
    category: 'フィットネス',
    color: 'bg-green-100 text-green-800',
  },
  {
    id: '12',
    name: 'MyFitnessPal Premium',
    amount: 4800,
    cycle: '年額',
    nextPayment: new Date('2025-08-20'),
    category: 'フィットネス',
    color: 'bg-green-100 text-green-800',
  },
  {
    id: '13',
    name: 'HelloFresh',
    amount: 8000,
    cycle: '月額',
    nextPayment: new Date('2025-08-25'),
    category: '食品',
    color: 'bg-amber-100 text-amber-800',
  },
  {
    id: '14',
    name: 'Oisix',
    amount: 6000,
    cycle: '月額',
    nextPayment: new Date('2025-08-30'),
    category: '食品',
    color: 'bg-amber-100 text-amber-800',
  },
  {
    id: '15',
    name: 'Amazon Fresh',
    amount: 490,
    cycle: '月額',
    nextPayment: new Date('2025-09-05'),
    category: '食品',
    color: 'bg-amber-100 text-amber-800',
  },
  {
    id: '16',
    name: 'コストコ会員',
    amount: 5500,
    cycle: '年額',
    nextPayment: new Date('2025-09-10'),
    category: '日用品',
    color: 'bg-cyan-100 text-cyan-800',
  },
  {
    id: '17',
    name: 'ドラッグストア会員',
    amount: 0,
    cycle: '月額',
    nextPayment: new Date('2025-08-12'),
    category: '日用品',
    color: 'bg-cyan-100 text-cyan-800',
  },
  {
    id: '18',
    name: 'Sephora Beauty Pass',
    amount: 0,
    cycle: '年額',
    nextPayment: new Date('2025-08-18'),
    category: '美容',
    color: 'bg-pink-100 text-pink-800',
  },
  {
    id: '19',
    name: '美容院サブスク',
    amount: 3000,
    cycle: '月額',
    nextPayment: new Date('2025-08-22'),
    category: '美容',
    color: 'bg-pink-100 text-pink-800',
  },
  {
    id: '20',
    name: 'その他サービス',
    amount: 1500,
    cycle: '月額',
    nextPayment: new Date('2025-08-28'),
    category: 'その他',
    color: 'bg-orange-100 text-orange-800',
  },
]

// カテゴリのデータをエクスポート
export const mockCategories: string[] = [
  'エンターテイメント',
  'ビジネス',
  'クラウド',
  'フィットネス',
  'その他',
]

// 課金システム用のモックデータ
export const mockBillingInfo: BillingInfo = {
  userId: 'user1',
  isPremium: true,
  subscriptionStartDate: new Date('2025-01-15'),
  nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30日後
  monthlyFee: 330,
  freeTrialUsed: true,
}

export const mockUser: User = {
  id: 'user1',
  email: 'shimeshime0123@gmail.com',
  billingInfo: mockBillingInfo,
}
