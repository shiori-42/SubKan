import { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView, // SafeAreaViewをインポート
} from 'react-native'
import { BarChart3, Plus, Tag, X } from 'lucide-react-native'
import { mockSubscriptions, Subscription } from '@/data/mockData'

interface AnalyticsViewProps {
  subscriptions?: Subscription[]
  categories?: string[]
  onAddCategory?: (category: string) => void
  onRemoveCategory?: (category: string) => void
}

export function AnalyticsView({
  subscriptions = mockSubscriptions,
  categories = [],
  onAddCategory = () => {},
  onRemoveCategory = () => {},
}: AnalyticsViewProps) {
  const [newCategory, setNewCategory] = useState('')
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)

  const categoryAnalysis = subscriptions.reduce(
    (acc, sub) => {
      if (!acc[sub.category]) {
        acc[sub.category] = { total: 0, count: 0, services: [] }
      }
      acc[sub.category].total += sub.amount
      acc[sub.category].count += 1
      acc[sub.category].services.push(sub)
      return acc
    },
    {} as Record<
      string,
      { total: number; count: number; services: Subscription[] }
    >
  )

  const totalMonthly = subscriptions.reduce((sum, sub) => sum + sub.amount, 0)
  const sortedCategories = Object.entries(categoryAnalysis).sort(
    ([, a], [, b]) => b.total - a.total
  )

  const categoryColors = {
    エンターテイメント: 'bg-red-100 text-red-800 border-red-300',
    ビジネス: 'bg-blue-100 text-blue-800 border-blue-300',
    クラウド: 'bg-green-100 text-green-800 border-green-300',
    その他: 'bg-purple-100 text-purple-800 border-purple-300',
  }

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      onAddCategory(newCategory.trim())
      setNewCategory('')
      setIsAddCategoryOpen(false)
    }
  }

  return (
    // 修正点2: SafeAreaViewでラップ
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF7ED' }}>
      {/* ScrollViewにパディングを追加 (p-4) */}
      <ScrollView className="p-4">
        {/* カテゴリ管理 */}
        <View className="bg-white rounded-lg border border-gray-200 shadow-lg">
          <View className="p-3 sm:p-6 pb-3 sm:pb-6">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Tag
                  className="w-6 h-6"
                  color="#f97316"
                  style={{ marginRight: 16 }}
                />
                <View className="space-y-0.5">
                  <Text className="text-lg text-gray-800 font-bold">
                    カテゴリ管理
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setIsAddCategoryOpen(true)}
                className="bg-orange-500 rounded-md py-1.5 px-3 flex-row items-center"
              >
                <Plus className="w-4 h-4 mr-1" color="white" />
                <Text className="text-white text-sm font-medium">追加</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="p-3 sm:p-6 pt-0">
            <View className="flex-row flex-wrap gap-2">
              {(() => {
                // デフォルトカテゴリ
                const defaultCategories = [
                  'エンターテイメント',
                  'ビジネス',
                  'クラウド',
                  'フィットネス',
                  'その他',
                ]
                // 現在存在するカテゴリを取得（サブスクリプションから）
                const existingCategories = [
                  ...new Set(subscriptions.map((sub) => sub.category)),
                ]
                // デフォルトカテゴリ、現在存在するカテゴリ、追加されたカテゴリを結合
                const allCategories = [
                  ...new Set([
                    ...defaultCategories,
                    ...existingCategories,
                    ...categories,
                  ]),
                ]

                return allCategories.map((category) => {
                  const isDefault = defaultCategories.includes(category)

                  return (
                    <View key={category} className="flex-row items-center">
                      <View className="border border-gray-200 rounded-full px-2 py-0.5">
                        <Text className="text-xs text-gray-800">
                          {category}
                        </Text>
                      </View>
                      {!isDefault && (
                        <TouchableOpacity
                          className="ml-1 h-5 w-5 p-0 items-center justify-center"
                          onPress={() => onRemoveCategory(category)}
                        >
                          <X size={16} className="text-red-500" />
                        </TouchableOpacity>
                      )}
                    </View>
                  )
                })
              })()}
            </View>
          </View>
        </View>

        {/* カテゴリ別分析 */}
        <View className="bg-white rounded-lg border border-gray-200 shadow-lg mt-6">
          <View className="p-3 sm:p-6 pb-3 sm:pb-6">
            <View className="flex-row items-center">
              <BarChart3
                className="w-6 h-6"
                color="#a855f7"
                style={{ marginRight: 16 }}
              />
              <View className="space-y-0.5">
                <Text className="text-lg text-gray-800 font-bold">
                  カテゴリ別支出分析
                </Text>
              </View>
            </View>
          </View>
          <View className="p-3 sm:p-6 pt-0 space-y-3 sm:space-y-4">
            {sortedCategories.map(([category, data]) => {
              const percentage =
                totalMonthly > 0
                  ? Math.round((data.total / totalMonthly) * 100)
                  : 0
              const categoryColor =
                categoryColors[category as keyof typeof categoryColors] ||
                categoryColors['その他']

              return (
                <View key={category} className="space-y-2 sm:space-y-3">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center space-x-2 sm:space-x-3 flex-1">
                      <View className="border border-gray-200 rounded-full px-2 py-0.5">
                        <Text className="text-xs text-gray-800">
                          {category}
                        </Text>
                      </View>
                      <Text className="text-xs sm:text-sm text-gray-700 font-medium">
                        {data.count}件のサービス
                      </Text>
                    </View>
                    <View className="text-right flex-shrink-0">
                      <Text className="text-lg sm:text-xl font-bold text-gray-900">
                        ¥{data.total.toLocaleString()}
                      </Text>
                      <Text className="text-sm sm:text-base text-orange-600 font-semibold text-right">
                        {percentage}%
                      </Text>
                    </View>
                  </View>

                  {/* プログレスバー */}
                  <View className="w-full bg-gray-300 rounded-full h-3">
                    {/* 修正点1: シンプルなオレンジ色に戻す */}
                    <View
                      className="bg-orange-500 h-3 rounded-full shadow-sm"
                      style={{ width: `${percentage}%` }}
                    />
                  </View>

                  {/* サービス一覧 */}
                  <View className="ml-2 sm:ml-4 space-y-1">
                    {data.services.map((service) => (
                      <View
                        key={service.id}
                        className="flex-row items-center justify-between"
                      >
                        <Text
                          className="text-xs sm:text-sm text-gray-800 font-medium flex-1"
                          numberOfLines={1}
                        >
                          {service.name}
                        </Text>
                        <Text className="text-xs sm:text-sm text-gray-900 font-semibold ml-2">
                          ¥{service.amount.toLocaleString()}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )
            })}
            {sortedCategories.length === 0 && (
              <View className="items-center py-6 sm:py-8">
                <BarChart3 className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mb-3" />
                <Text className="text-sm sm:text-base text-gray-600">
                  分析するサブスクリプションがありません
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Modal (修正なし) */}
        <Modal
          visible={isAddCategoryOpen}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsAddCategoryOpen(false)}
        >
          {/* ... Modalの中身は省略 ... */}
        </Modal>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AnalyticsView
