import { View, Text, Pressable } from 'react-native'
import { Subscription } from '@/data/mockData'
import { Edit3, Trash2 } from 'lucide-react-native'
import { Card, Button } from '@/component/common'
import { formatDateWithDay, getDaysUntil } from '@/utils'

// Helper function to get category color classes
const getCategoryColor = (category: string) => {
  const categoryColors = {
    エンターテイメント: 'bg-pink-100 text-pink-800 border-pink-300',
    ビジネス: 'bg-blue-100 text-blue-800 border-blue-300',
    クラウド: 'bg-violet-100 text-violet-800 border-violet-300',
    フィットネス: 'bg-green-100 text-green-800 border-green-300',
    食品: 'bg-amber-100 text-amber-800 border-amber-300',
    日用品: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    美容: 'bg-pink-100 text-pink-800 border-pink-300',
    その他: 'bg-orange-100 text-orange-800 border-orange-300',
  }
  return (
    categoryColors[category as keyof typeof categoryColors] ||
    categoryColors['その他']
  )
}

interface SubscriptionCardProps {
  subscription: Subscription
  onEdit: (subscription: Subscription) => void
  onDelete: (id: string) => void
}

const SubscriptionCard = ({
  subscription,
  onEdit,
  onDelete,
}: SubscriptionCardProps) => {
  const daysUntil = getDaysUntil(subscription.nextPayment)

  return (
    <Card variant="elevated" padding="medium">
      {/* Header: Icon, service name, amount, remaining days */}
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-center flex-1">
          {/* Circular icon with light orange background */}
          <View className="w-10 h-10 rounded-full bg-orange-300 items-center justify-center mr-3">
            <Text className="text-lg font-bold text-gray-800">
              {subscription.name.charAt(0)}
            </Text>
          </View>
          {/* Service name, amount and category */}
          <View>
            <Text className="text-base font-bold text-gray-800">
              {subscription.name}
            </Text>
            <View className="flex-row items-center mt-1">
              <Text className="text-sm text-gray-800">
                ¥{subscription.amount.toLocaleString()} / {subscription.cycle}
              </Text>
              {/* Category badge */}
              <View
                className={`px-2 py-0.5 ml-2 rounded-full ${getCategoryColor(subscription.category)}`}
              >
                <Text className="text-xs text-gray-800">
                  {subscription.category}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Remaining days badge */}
        {daysUntil === 0 && (
          <View className="px-2.5 py-1 bg-orange-400 rounded-md">
            <Text className="text-xs text-white font-semibold">今日</Text>
          </View>
        )}
      </View>

      {/* Middle: Date information */}
      <View className="bg-gray-50 rounded-lg p-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-sm text-gray-800">次回支払い</Text>
          <Text className="text-sm font-semibold text-gray-800">
            {formatDateWithDay(subscription.nextPayment)}
          </Text>
        </View>
      </View>

      {/* Bottom: Action buttons */}
      <View className="flex-row space-x-4">
        <Button
          title="編集"
          onPress={() => onEdit(subscription)}
          variant="secondary"
          size="small"
          leftIcon={<Edit3 size={16} color="#6b7280" />}
        />
        <Button
          title="削除"
          onPress={() => onDelete(subscription.id)}
          variant="secondary"
          size="small"
          leftIcon={<Trash2 size={16} color="#ef4444" />}
        />
      </View>
    </Card>
  )
}

export default SubscriptionCard
