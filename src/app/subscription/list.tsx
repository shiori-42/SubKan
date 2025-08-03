// src/app/subscription/list.tsx
import { View, Text } from 'react-native'
import Header from '@/component/Header'
import SummaryCard from '@/component/SummaryCard'
import { CreditCard, Calendar, BarChart3 } from 'lucide-react-native'
import {
  mockSubscriptions as subscriptions,
  mockCategories,
  Subscription, // 型もインポート
} from '@/data/mockData'

/**
 * サブスクリプション一覧画面のメインコンポーネント
 * 月額・年額サービスの集計と表示を行う
 */
const List = (): React.JSX.Element => {
  // 月額系のサブスクリプションをフィルタリング（月額、週額、3ヶ月、6ヶ月）
  const monthlySubscriptions = subscriptions.filter(
    (sub) =>
      sub.cycle === '月額' ||
      sub.cycle === '週額' ||
      sub.cycle === '3ヶ月' ||
      sub.cycle === '6ヶ月'
  )
  const yearlySubscriptions = subscriptions.filter(
    (sub) => sub.cycle === '年額'
  )

  // 年額サービスの合計金額を計算
  const totalYearly = yearlySubscriptions.reduce(
    (sum, sub) => sum + sub.amount,
    0
  )

  // 月額系サービスの合計金額を計算（週額・3ヶ月・6ヶ月は月額に換算）
  const totalMonthly = monthlySubscriptions.reduce((sum, sub) => {
    // サイクルに応じて月額換算
    switch (sub.cycle) {
      case '週額':
        return sum + sub.amount * 4.33 // 週額を月額に換算（1ヶ月 = 4.33週）
      case '3ヶ月':
        return sum + sub.amount / 3 // 3ヶ月を月額に換算
      case '6ヶ月':
        return sum + sub.amount / 6 // 6ヶ月を月額に換算
      default:
        return sum + sub.amount // 月額はそのまま
    }
  }, 0)

  return (
    <View className="flex-1 bg-gray-100">
      {/* ヘッダーコンポーネント */}
      <Header />

      {/* サマリーカードの横並びレイアウト */}
      <View className="flex-row gap-2 p-4">
        {/* 月額サービスのサマリーカード */}
        <SummaryCard
          icon={<CreditCard size={20} color="#f97316" />}
          title="月額サービス"
          value={`¥${Math.round(totalMonthly).toLocaleString()}`}
          serviceCount={`${monthlySubscriptions.length}個`}
        />

        {/* 年額サービスのサマリーカード */}
        <SummaryCard
          icon={<Calendar size={20} color="#ec4899" />}
          title="年額サービス"
          value={`¥${totalYearly.toLocaleString()}`}
          serviceCount={`${yearlySubscriptions.length}個`}
        />

        {/* 月換算総額のサマリーカード */}
        <SummaryCard
          icon={<BarChart3 size={20} color="#a855f7" />}
          title="月換算"
          value={`¥${Math.round(totalMonthly + totalYearly / 12).toLocaleString()}`}
          serviceCount={`${subscriptions.length}個`}
        />
      </View>

      {/* サブスクリプション一覧のタイトルセクション */}
      <View>
        <Text className="text-lg sm:text-xl font-bold text-gray-800">
          サブスクリプション一覧
        </Text>
        {subscriptions.length > 0 && (
          <Text className="text-xs sm:text-sm text-gray-600">
            {subscriptions.length}件のサービス
          </Text>
        )}
      </View>
    </View>
  )
}

export default List
