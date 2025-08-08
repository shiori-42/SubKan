import React from 'react'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import { X, Check, Star } from 'lucide-react-native'

interface UpgradeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpgrade: () => void
  monthlyFee: number
}

const UpgradeDialog: React.FC<UpgradeDialogProps> = ({
  open,
  onOpenChange,
  onUpgrade,
  monthlyFee,
}) => {
  const features = [
    'サブスクリプション管理',
    '月額・年額の集計表示',
    'カテゴリ別分類',
    '支払い日管理',
    '追加・編集・削除機能',
    'データの永続化',
  ]

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
    >
      <View className="flex-1 bg-black/50 justify-center items-center p-4">
        <View className="bg-white rounded-2xl p-4 w-full max-w-xs">
          {/* ヘッダー */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-800">有料プラン</Text>
            <TouchableOpacity
              onPress={() => onOpenChange(false)}
              className="p-1"
            >
              <X size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* 価格表示 */}
          <View className="bg-orange-50 p-3 rounded-lg mb-4">
            <Text className="text-center text-xl font-bold text-gray-800">
              ¥{monthlyFee.toLocaleString()}/月
            </Text>
            <Text className="text-center text-xs text-gray-600 mt-1">
              初月無料
            </Text>
          </View>

          {/* 機能一覧 */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-800 mb-2">
              機能
            </Text>
            {features.slice(0, 3).map((feature, index) => (
              <View key={index} className="flex-row items-center mb-1">
                <Check size={12} color="#16a34a" />
                <Text className="text-xs text-gray-700 ml-1 flex-1">
                  {feature}
                </Text>
              </View>
            ))}
          </View>

          {/* 注意事項 */}
          <View className="bg-gray-50 p-2 rounded-lg mb-4">
            <Text className="text-xs text-gray-600 text-center">
              2ヶ月目以降¥{monthlyFee.toLocaleString()}
              /月。いつでもキャンセル可能。
            </Text>
          </View>

          {/* アクションボタン */}
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={() => onOpenChange(false)}
              className="flex-1 py-2 px-3 border border-gray-300 rounded-lg"
            >
              <Text className="text-center text-gray-700 text-sm font-medium">
                キャンセル
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onUpgrade()
                onOpenChange(false)
              }}
              className="flex-1 py-2 px-3 bg-orange-500 rounded-lg"
            >
              <Text className="text-center text-white text-sm font-medium">
                有料開始
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default UpgradeDialog
