import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { CreditCard, AlertCircle, CheckCircle } from 'lucide-react-native'
import { BillingInfo } from '@/data/mockData'

interface BillingStatusCardProps {
  billingInfo: BillingInfo
  onUpgrade?: () => void
  onManageSubscription?: () => void
}

const BillingStatusCard: React.FC<BillingStatusCardProps> = ({
  billingInfo,
  onUpgrade,
  onManageSubscription,
}) => {
  const today = new Date()
  const isInFreeTrial =
    !billingInfo.freeTrialUsed &&
    today.getTime() < billingInfo.nextBillingDate.getTime()

  const daysUntilBilling = Math.ceil(
    (billingInfo.nextBillingDate.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
  )

  const getStatusColor = () => {
    if (billingInfo.isPremium) return 'bg-orange-100 border-orange-300'
    if (isInFreeTrial) return 'bg-orange-100 border-orange-300'
    return 'bg-orange-100 border-orange-300'
  }

  const getStatusText = () => {
    if (billingInfo.isPremium) return null
    if (isInFreeTrial) return '無料トライアル中'
    return '無料'
  }

  const getStatusIcon = () => {
    if (billingInfo.isPremium) return null
    if (isInFreeTrial) return <CreditCard size={20} color="#f97316" />
    return <AlertCircle size={20} color="#ea580c" />
  }

  return (
    <View className={`p-4 rounded-lg border ${getStatusColor()} mb-4`}>
      {getStatusText() && (
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center">
            {getStatusIcon()}
            <Text className="text-lg font-bold text-gray-800 ml-2">
              {getStatusText()}
            </Text>
          </View>
        </View>
      )}

      {billingInfo.isPremium ? (
        <View>{/* 有料プランの場合は何も表示しない */}</View>
      ) : isInFreeTrial ? (
        <View>
          <Text className="text-gray-600 mb-2">無料トライアル期間中です</Text>
          <Text className="text-sm text-gray-500 mb-3">
            あと{daysUntilBilling}日で課金開始（月額¥
            {billingInfo.monthlyFee.toLocaleString()}）
          </Text>
          <TouchableOpacity
            onPress={onUpgrade}
            className="bg-orange-500 py-2 px-4 rounded-lg self-start"
          >
            <Text className="text-white font-medium">有料に移行</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text className="text-gray-600 mb-2">無料プランをご利用中です</Text>
          <Text className="text-sm text-gray-500 mb-3">
            継続利用には月額¥{billingInfo.monthlyFee.toLocaleString()}が必要です
          </Text>
          <TouchableOpacity
            onPress={onUpgrade}
            className="bg-orange-500 py-2 px-4 rounded-lg self-start"
          >
            <Text className="text-white font-medium">有料に移行</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default BillingStatusCard
