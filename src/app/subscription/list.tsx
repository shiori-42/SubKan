// src/app/subscription/list.tsx
import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SummaryCard from '@/component/SummaryCard'
import SubscriptionCard from '@/component/SubscriptionCard'
import { CreditCard, Calendar, BarChart3 } from 'lucide-react-native'
import { mockSubscriptions, Subscription } from '@/data/mockData'

/**
 * サブスクリプション一覧画面のメインコンポーネント
 * サマリーカード、サブスクリプション一覧、編集・削除機能を含む
 */
const ListView = (): React.JSX.Element => {
  // サブスクリプションデータの状態管理（初期値はmockData）
  const [subscriptions, setSubscriptions] =
    useState<Subscription[]>(mockSubscriptions)

  // ===== サブスクリプション集計ロジック =====

  // 月額系（月額、週額、3ヶ月、6ヶ月）と年額に分類
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

  // 月額系の合計を計算（異なる周期を月額に統一）
  const totalMonthly = monthlySubscriptions.reduce((sum, sub) => {
    switch (sub.cycle) {
      case '週額':
        // 週額を月額に換算：週額 × 4.33
        // 理由：1ヶ月は約4.33週（365日 ÷ 7日 ÷ 12ヶ月）
        return sum + sub.amount * 4.33
      case '3ヶ月':
        // 3ヶ月を月額に換算：3ヶ月額 ÷ 3
        return sum + sub.amount / 3
      case '6ヶ月':
        // 6ヶ月を月額に換算：6ヶ月額 ÷ 6
        return sum + sub.amount / 6
      default:
        // 月額はそのまま
        return sum + sub.amount
    }
  }, 0)

  // 年額の合計（換算不要）
  const totalYearly = yearlySubscriptions.reduce(
    (sum, sub) => sum + sub.amount,
    0
  )

  // ===== アクション関数 =====

  const handleEdit = (subscription: Subscription) => {
    console.log('Edit:', subscription.name)
    // TODO: 編集ダイアログを開く処理を実装
  }

  const deleteSubscription = (id: string) => {
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== id))
  }

  // ===== データ処理 =====

  // 支払い日が近い順にソート
  const sortedSubscriptions = [...subscriptions].sort(
    (a, b) => a.nextPayment.getTime() - b.nextPayment.getTime()
  )

  return (
    <View className="p-4 bg-orange-50 flex-1">
      {/* サマリーカード */}
      <View className="flex-row gap-3">
        <SummaryCard
          icon={<CreditCard size={20} color="#f97316" />}
          title="月額サービス"
          value={`¥${Math.round(totalMonthly).toLocaleString()}`}
          serviceCount={`${monthlySubscriptions.length}個`}
        />
        <SummaryCard
          icon={<Calendar size={20} color="#ec4899" />}
          title="年額サービス"
          value={`¥${totalYearly.toLocaleString()}`}
          serviceCount={`${yearlySubscriptions.length}個`}
        />
        <SummaryCard
          icon={<BarChart3 size={20} color="#a855f7" />}
          title="月換算"
          value={`¥${Math.round(totalMonthly + totalYearly / 12).toLocaleString()}`}
          serviceCount={`${subscriptions.length}個`}
        />
      </View>

      {/* サブスクリプション一覧 */}
      <View className="bg-white rounded-lg border border-gray-200 shadow-lg flex-1 mt-4">
        <View className="p-4 pb-2">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg text-gray-800 font-bold">
              サブスクリプション一覧
            </Text>
            {subscriptions.length > 0 && (
              <Text className="text-sm text-gray-800">
                {subscriptions.length}件のサービス
              </Text>
            )}
          </View>
        </View>
        <FlatList
          data={sortedSubscriptions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SubscriptionCard
              subscription={item}
              onEdit={handleEdit}
              onDelete={deleteSubscription}
            />
          )}
          ItemSeparatorComponent={() => <View className="h-4" />}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        />
      </View>
    </View>
  )
}

export default ListView
