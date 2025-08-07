import { View, Text } from 'react-native'
import { Subscription } from '@/data/mockData'
import { Edit3, Trash2, CreditCard, AlertTriangle } from 'lucide-react-native'
import { Card, ActionButton } from '@/component/common'

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

interface CalendarSubscriptionCardProps {
  subscription: Subscription
  onEdit: (subscription: Subscription) => void
  onDelete: (id: string) => void
  paymentTagType: 'payment' | 'cancel'
}

// Calendar-specific subscription card component
// Shows payment amount and cycle prominently instead of date information
const CalendarSubscriptionCard = ({
  subscription,
  onEdit,
  onDelete,
  paymentTagType,
}: CalendarSubscriptionCardProps) => {
  return (
    <Card variant="elevated" padding="medium">
      {/* Header: Icon, service name, category, payment tag */}
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-center flex-1">
          {/* Circular icon with light orange background */}
          <View className="w-10 h-10 rounded-full bg-orange-300 items-center justify-center mr-3">
            <Text className="text-lg font-bold text-gray-800">
              {subscription.name.charAt(0)}
            </Text>
          </View>
          {/* Service name and category */}
          <View>
            <Text className="text-base font-bold text-gray-800">
              {subscription.name}
            </Text>
            {/* Category badge */}
            <View
              className={`px-2 py-0.5 mt-1 self-start rounded-full ${getCategoryColor(subscription.category)}`}
            >
              <Text className="text-xs text-gray-800">
                {subscription.category}
              </Text>
            </View>
          </View>
        </View>
        {/* Payment tag */}
        {paymentTagType === 'payment' ? (
          <View className="flex-row items-center bg-blue-100 px-2.5 py-1 rounded-full">
            <CreditCard size={16} color="#2563eb" style={{ marginRight: 6 }} />
            <Text className="text-xs font-medium text-blue-800">支払い</Text>
          </View>
        ) : (
          <View className="flex-row items-center bg-red-100 px-2.5 py-1 rounded-full">
            <AlertTriangle
              size={16}
              color="#dc2626"
              style={{ marginRight: 6 }}
            />
            <Text className="text-xs font-medium text-red-800">解約期限</Text>
          </View>
        )}
      </View>

      {/* Middle: Payment amount and cycle information */}
      <View className="bg-gray-50 rounded-lg p-3 mt-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-sm text-gray-600">支払い金額</Text>
          <Text className="text-lg font-bold text-gray-800">
            ¥{subscription.amount.toLocaleString()}
          </Text>
        </View>
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-sm text-gray-600">支払いサイクル</Text>
          <Text className="text-sm font-semibold text-gray-800">
            {subscription.cycle}
          </Text>
        </View>
      </View>

      {/* Bottom: Action buttons */}
      <View className="flex-row space-x-4 mt-4 pt-4 border-t border-gray-200">
        <ActionButton
          title="編集"
          onPress={() => onEdit(subscription)}
          variant="edit"
          icon={<Edit3 size={16} color="#6b7280" />}
        />
        <ActionButton
          title="削除"
          onPress={() => onDelete(subscription.id)}
          variant="delete"
          icon={<Trash2 size={16} color="#ef4444" />}
        />
      </View>
    </Card>
  )
}

export default CalendarSubscriptionCard
