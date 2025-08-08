// src/app/subscription/list.tsx
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SummaryCard from '@/component/SummaryCard'
import SubscriptionCard from '@/component/SubscriptionCard'
import AddSubscriptionDialog from '@/component/AddSubscriptionDialog'
import UpgradeDialog from '@/component/UpgradeDialog'
import { CreditCard, Calendar, BarChart3, Plus } from 'lucide-react-native'
import { mockSubscriptions, Subscription } from '@/data/mockData'
import { useBilling } from '@/hooks/useBilling'

interface ListViewProps {
  subscriptions?: Subscription[]
  setSubscriptions?: React.Dispatch<React.SetStateAction<Subscription[]>>
}

/**
 * サブスクリプション一覧画面のメインコンポーネント
 * サマリーカード、サブスクリプション一覧、編集・削除機能を含む
 */
const ListView = ({
  subscriptions: propSubscriptions,
  setSubscriptions: propSetSubscriptions,
}: ListViewProps): React.JSX.Element => {
  // サブスクリプションデータの状態管理
  const [localSubscriptions, setLocalSubscriptions] =
    useState<Subscription[]>(mockSubscriptions)

  const subscriptions = propSubscriptions || localSubscriptions
  const setSubscriptions = propSetSubscriptions || setLocalSubscriptions

  // ダイアログの状態管理
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingSubscription, setEditingSubscription] =
    useState<Subscription | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // 課金状態管理
  const {
    billingInfo,
    isUpgradeDialogOpen,
    setIsUpgradeDialogOpen,
    handleUpgrade,
    handleCancelSubscription,
  } = useBilling()

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
    setEditingSubscription(subscription)
    setIsEditing(true)
    setIsAddDialogOpen(true)
  }

  const handleAdd = () => {
    // 有料プランでない場合は課金を促す
    if (!billingInfo.isPremium && billingInfo.freeTrialUsed) {
      setIsUpgradeDialogOpen(true)
      return
    }

    setEditingSubscription(null)
    setIsEditing(false)
    setIsAddDialogOpen(true)
  }

  const handleAddSubscription = (subscriptionData: any) => {
    if (isEditing && editingSubscription) {
      // 編集モード
      setSubscriptions((prev) =>
        prev.map((sub) =>
          sub.id === editingSubscription.id
            ? { ...subscriptionData, id: sub.id, color: sub.color }
            : sub
        )
      )
    } else {
      // 新規追加モード
      const newSubscription: Subscription = {
        ...subscriptionData,
        id: Date.now().toString(),
        color: 'bg-gray-100 text-gray-800',
      }
      setSubscriptions((prev) => [...prev, newSubscription])
    }
    setIsAddDialogOpen(false)
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
        {!billingInfo.isPremium &&
        billingInfo.freeTrialUsed &&
        subscriptions.length === 0 ? (
          <View className="flex-1 justify-center items-center p-8">
            <Text className="text-lg text-gray-600 text-center mb-4">
              有料に移行して
            </Text>
            <Text className="text-lg text-gray-600 text-center mb-6">
              サブスクリプション管理を始めましょう
            </Text>
            <TouchableOpacity
              onPress={() => setIsUpgradeDialogOpen(true)}
              className="bg-orange-500 py-3 px-6 rounded-lg"
            >
              <Text className="text-white font-medium text-lg">有料に移行</Text>
            </TouchableOpacity>
          </View>
        ) : (
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
        )}
      </View>

      {/* フッター追加ボタン */}
      <TouchableOpacity
        onPress={handleAdd}
        className="absolute bottom-6 right-6 bg-orange-500 w-14 h-14 rounded-full items-center justify-center shadow-lg"
      >
        <Plus size={24} color="white" />
      </TouchableOpacity>

      {/* サブスクリプション追加・編集ダイアログ */}
      <AddSubscriptionDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={handleAddSubscription}
        categories={[
          'エンターテイメント',
          'ビジネス',
          'クラウド',
          'フィットネス',
          '食品',
          '日用品',
          '美容',
          'その他',
        ]}
        editingSubscription={editingSubscription}
        isEditing={isEditing}
      />

      {/* アップグレードダイアログ */}
      <UpgradeDialog
        open={isUpgradeDialogOpen}
        onOpenChange={setIsUpgradeDialogOpen}
        onUpgrade={handleUpgrade}
        monthlyFee={billingInfo.monthlyFee}
      />
    </View>
  )
}

export default ListView
