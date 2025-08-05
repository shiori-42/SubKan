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
    category: '仕事・ビジネス',
    color: 'bg-purple-100 text-purple-800',
  },
  {
    id: '4',
    name: 'Microsoft 365',
    amount: 1284,
    cycle: '月額',
    nextPayment: new Date('2025-08-10'),
    category: '仕事・ビジネス',
    color: 'bg-blue-100 text-blue-800',
  },
  {
    id: '5',
    name: 'iCloud+',
    amount: 130,
    cycle: '月額',
    nextPayment: new Date('2025-08-25'),
    category: 'クラウド・ストレージ',
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
    category: 'クラウド・ストレージ',
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
    category: '仕事・ビジネス',
    color: 'bg-gray-100 text-gray-800',
  },
]

// カテゴリのデータをエクスポート
export const mockCategories: string[] = [
  'エンターテイメント',
  '仕事・ビジネス',
  'クラウド・ストレージ',
  '健康・フィットネス',
  'その他',
]
