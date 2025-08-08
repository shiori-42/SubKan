import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Settings, User, CreditCard, Info, X, Plus } from 'lucide-react-native'
import { useBilling } from '@/hooks/useBilling'

const SettingsScreen = () => {
  const { billingInfo, setIsUpgradeDialogOpen, handleCancelSubscription } =
    useBilling()

  const handleAddSubscription = () => {
    // メイン画面に戻ってサブスクリプション追加
    console.log('サブスクリプション追加')
  }

  const settingsItems = [
    {
      id: 'account',
      title: 'アカウント',
      icon: <User size={20} color="#6b7280" />,
      items: [
        {
          label: 'メールアドレス',
          value: 'shimeshime0123@gmail.com',
          type: 'info',
        },
        {
          label: '会員ステータス',
          value: billingInfo.isPremium ? 'プレミアム会員' : '無料会員',
          type: billingInfo.isPremium ? 'premium' : 'free',
        },
      ],
    },
    {
      id: 'billing',
      title: '課金',
      icon: <CreditCard size={20} color="#6b7280" />,
      items: [
        {
          label: '月額料金',
          value: billingInfo.isPremium
            ? `¥${billingInfo.monthlyFee.toLocaleString()}`
            : '無料',
          type: 'info',
        },
        {
          label: '課金周期',
          value: '30日ごと',
          type: 'info',
        },
      ],
    },
    {
      id: 'about',
      title: 'アプリについて',
      icon: <Info size={20} color="#6b7280" />,
      items: [
        {
          label: 'バージョン',
          value: '1.0.0',
          type: 'info',
        },
        {
          label: '開発者',
          value: 'サブスク管理チーム',
          type: 'info',
        },
      ],
    },
  ]

  const getValueColor = (type: string) => {
    switch (type) {
      case 'premium':
        return 'text-orange-600 font-semibold'
      case 'free':
        return 'text-gray-600'
      default:
        return 'text-gray-800'
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="p-4">
          {/* ヘッダー */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-gray-800">設定</Text>
            <View className="flex-row items-center">
              <View className="mr-3">
                <Text className="text-sm text-gray-600">プレミアム会員</Text>
                <Text className="text-xs text-gray-500">
                  次回課金:{' '}
                  {billingInfo.nextBillingDate.toLocaleDateString('ja-JP')}
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleCancelSubscription}
                className="bg-red-500 py-1 px-3 rounded"
              >
                <Text className="text-white text-xs font-medium">解約</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 設定項目 */}
          {settingsItems.map((section) => (
            <View
              key={section.id}
              className="bg-white rounded-lg mb-4 shadow-sm"
            >
              <View className="flex-row items-center p-4 border-b border-gray-100">
                {section.icon}
                <Text className="text-lg font-semibold text-gray-800 ml-2">
                  {section.title}
                </Text>
              </View>

              {section.items.map((item, index) => (
                <View
                  key={index}
                  className={`p-4 ${
                    index < section.items.length - 1
                      ? 'border-b border-gray-100'
                      : ''
                  }`}
                >
                  <View className="flex-row justify-between items-center">
                    <Text className="text-gray-600">{item.label}</Text>
                    <Text className={getValueColor(item.type)}>
                      {item.value}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* フッター追加ボタン */}
      <TouchableOpacity
        onPress={handleAddSubscription}
        className="absolute bottom-6 right-6 bg-orange-500 w-14 h-14 rounded-full items-center justify-center shadow-lg"
      >
        <Plus size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default SettingsScreen
