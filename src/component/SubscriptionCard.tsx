import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Subscription } from '@/data/mockData'
import { Edit3, Trash2 } from 'lucide-react-native'

// --- Helper Functions (変更なし) ---
const formatDate = (date: Date) => {
  return date.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })
}
const getDaysUntil = (date: Date) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const targetDate = new Date(date)
  targetDate.setHours(0, 0, 0, 0)
  const diffTime = targetDate.getTime() - today.getTime()
  return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))
}
// --- Helper Functions End ---

const SubscriptionCard = ({
  subscription,
  onEdit,
  onDelete,
}: SubscriptionCardProps) => {
  const daysUntil = getDaysUntil(subscription.nextPayment)

  return (
    // 全体を囲むカード：背景色を白に、影を少し柔らかく
    <View
      className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 space-y-3"
      style={styles.card}
    >
      {/* 上部：アイコン、サービス名、金額、残り日数 */}
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-center flex-1">
          {/* 円形アイコン：背景色を薄いピンクに */}
          <View className="w-10 h-10 rounded-full bg-orange-300 items-center justify-center mr-3">
            <Text className="text-lg font-bold text-gray-800">
              {subscription.name.charAt(0)}
            </Text>
          </View>
          {/* サービス名と金額・カテゴリ */}
          <View>
            <Text className="text-base font-bold text-gray-800">
              {subscription.name}
            </Text>
            <View className="flex-row items-center mt-1">
              <Text className="text-sm text-gray-800">
                ¥{subscription.amount.toLocaleString()} / {subscription.cycle}
              </Text>
              {/* カテゴリバッジ */}
              <View className="px-2 py-0.5 ml-2 border border-gray-200 rounded-full">
                <Text className="text-xs text-gray-800">
                  {subscription.category}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* 残り日数バッジ */}
        {daysUntil === 0 && (
          <View className="px-2.5 py-1 bg-orange-400 rounded-md">
            <Text className="text-xs text-white font-semibold">今日</Text>
          </View>
        )}
      </View>

      {/* 中部：日付情報 */}
      <View className="bg-gray-50 rounded-lg p-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-sm text-gray-800">次回支払い</Text>
          <Text className="text-sm font-semibold text-gray-800">
            {formatDate(subscription.nextPayment)}
          </Text>
        </View>
      </View>

      {/* 下部：アクションボタン */}
      <View className="flex-row space-x-4">
        <Pressable
          className="flex-1 bg-gray-100 items-center justify-center py-3 px-4 rounded-xl flex-row"
          onPress={() => onEdit(subscription)}
        >
          <Edit3 color="#6b7280" size={16} style={styles.icon} />
          <Text className="text-sm font-medium text-gray-700">編集</Text>
        </Pressable>
        <Pressable
          className="flex-1 bg-red-50 items-center justify-center py-3 px-4 rounded-xl flex-row"
          onPress={() => onDelete(subscription.id)}
        >
          <Trash2 color="#ef4444" size={16} style={styles.icon} />
          <Text className="text-sm font-medium text-red-600">削除</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 8,
  },
})

// Propsの型定義は変更なし
interface SubscriptionCardProps {
  subscription: Subscription
  onEdit: (subscription: Subscription) => void
  onDelete: (id: string) => void
}

export default SubscriptionCard
