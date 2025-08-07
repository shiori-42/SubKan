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
  StyleSheet,
} from 'react-native'
import {
  BarChart3,
  Plus,
  Tag,
  X,
  PieChart,
  AlignLeft,
} from 'lucide-react-native'
import { DoughnutChart } from '@/component/DoughnutChart'
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
  const [editingCategory, setEditingCategory] = useState('')
  const [newCategoryName, setNewCategoryName] = useState('')
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false)
  const [showDoughnutChart, setShowDoughnutChart] = useState(false)

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

  // デフォルトカテゴリ
  const defaultCategories = [
    'エンターテイメント',
    'ビジネス',
    'クラウド',
    'その他',
    'フィットネス',
  ]

  // 既存のサブスクリプションからカテゴリを取得
  const existingCategories = Object.keys(categoryAnalysis)

  // 表示するカテゴリ：デフォルト + 既存 + ユーザー追加
  const allCategories = [
    ...new Set([...defaultCategories, ...existingCategories, ...categories]),
  ]

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

  const handleEditCategory = () => {
    if (newCategoryName.trim() && newCategoryName.trim() !== editingCategory) {
      // カテゴリ名を変更する処理（実際の実装では親コンポーネントに通知）
      console.log(
        `カテゴリ名を変更: ${editingCategory} → ${newCategoryName.trim()}`
      )
      setNewCategoryName('')
      setIsEditCategoryOpen(false)
    }
  }

  const openEditModal = (category: string) => {
    setEditingCategory(category)
    setNewCategoryName(category)
    setIsEditCategoryOpen(true)
  }

  // カテゴリの色を取得する関数
  const getCategoryBackgroundColor = (category: string) => {
    const colorMap = {
      エンターテイメント: '#fdf2f8', // pink-50
      ビジネス: '#eff6ff', // blue-50
      クラウド: '#f5f3ff', // violet-50
      フィットネス: '#f0fdf4', // green-50
      食品: '#fffbeb', // amber-50
      日用品: '#ecfeff', // cyan-50
      美容: '#fdf2f8', // pink-50
      その他: '#fff7ed', // orange-50
    }
    return colorMap[category as keyof typeof colorMap] || colorMap['その他']
  }

  // プログレスバー用のカテゴリ色取得関数
  const getCategoryColorForProgress = (category: string) => {
    const progressColors = {
      エンターテイメント: '#ec4899', // pink-500
      ビジネス: '#3b82f6', // blue-500
      クラウド: '#8b5cf6', // violet-500
      フィットネス: '#10b981', // emerald-500
      その他: '#f97316', // orange-500
    }
    return (
      progressColors[category as keyof typeof progressColors] ||
      progressColors['その他']
    )
  }

  return (
    // 修正点2: SafeAreaViewでラップ
    <SafeAreaView style={{ flex: 1 }}>
      {/* ScrollViewにパディングを追加 (p-4) */}
      <ScrollView className="p-4 space-y-4 sm:space-y-6">
        {/* カテゴリ管理と分析 */}
        <View className="bg-white rounded-lg border border-gray-200 shadow-md">
          {/* カテゴリ管理ヘッダー */}
          <View className="p-3 sm:p-6 pb-3 sm:pb-6">
            <View className="flex-row items-center">
              <Tag
                className="w-6 h-6"
                color="#f97316"
                style={styles.headerIcon}
              />
              <View>
                <Text className="text-base sm:text-lg text-gray-800 font-bold">
                  カテゴリ管理
                </Text>
                <Text className="text-xs text-gray-500 mt-1">
                  タップして好きなカテゴリ名に編集できます
                </Text>
              </View>
            </View>
          </View>

          {/* カテゴリ管理コンテンツ */}
          <View className="p-3 sm:p-6 pt-0">
            <View className="flex-row flex-wrap gap-2">
              {allCategories.map((category) => {
                const isDefault = defaultCategories.includes(category)
                const isUserAdded =
                  categories.includes(category) &&
                  !defaultCategories.includes(category)

                return (
                  <View key={category} className="flex-row items-center">
                    <TouchableOpacity
                      onPress={() => openEditModal(category)}
                      className={`py-1 px-2.5 rounded-full ${categoryColors[category as keyof typeof categoryColors] || categoryColors['その他']} active:opacity-70`}
                    >
                      <Text className="text-xs text-gray-700">{category}</Text>
                    </TouchableOpacity>
                    {isUserAdded && (
                      <TouchableOpacity
                        className="ml-1 h-5 w-5 p-0 items-center justify-center"
                        onPress={() => onRemoveCategory(category)}
                      >
                        <X size={16} className="text-red-500" />
                      </TouchableOpacity>
                    )}
                  </View>
                )
              })}
              {allCategories.length === 0 && (
                <Text className="text-gray-500 text-xs sm:text-sm">
                  まだカテゴリが作成されていません
                </Text>
              )}
            </View>
          </View>

          {/* カテゴリ分析ヘッダー */}
          <View className="p-3 sm:p-6 pb-3 sm:pb-6 pt-0 mt-12">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <BarChart3
                  className="w-6 h-6"
                  color="#a855f7"
                  style={styles.headerIcon}
                />
                <Text className="text-base sm:text-lg text-gray-800 font-bold">
                  カテゴリ別支出分析
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowDoughnutChart(!showDoughnutChart)}
                className="flex-row items-center bg-purple-100 py-1.5 rounded-md"
                style={styles.toggleButton}
              >
                {showDoughnutChart ? (
                  <AlignLeft style={styles.toggleIcon} color="#a855f7" />
                ) : (
                  <PieChart style={styles.toggleIcon} color="#a855f7" />
                )}
                <Text className="text-sm font-medium text-purple-700">
                  {showDoughnutChart ? 'リスト' : 'グラフ'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* カテゴリ分析コンテンツ */}
          <View className="p-3 sm:p-6 pt-0 space-y-3 sm:space-y-4">
            {showDoughnutChart ? (
              // ドーナツグラフ表示
              <View className="items-center py-6">
                <DoughnutChart
                  data={sortedCategories.map(([category, data]) => ({
                    category,
                    total: data.total,
                    percentage:
                      totalMonthly > 0
                        ? Math.round((data.total / totalMonthly) * 100)
                        : 0,
                  }))}
                  size={250}
                  strokeWidth={25}
                />
              </View>
            ) : (
              // リスト表示
              <>
                {sortedCategories.map(([category, data]) => {
                  const percentage =
                    totalMonthly > 0
                      ? Math.round((data.total / totalMonthly) * 100)
                      : 0
                  const categoryColor =
                    categoryColors[category as keyof typeof categoryColors] ||
                    categoryColors['その他']

                  return (
                    <View
                      key={category}
                      className="space-y-3 sm:space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center space-x-3 flex-1">
                          <View
                            className={`py-1.5 px-3 rounded-full ${categoryColor}`}
                          >
                            <Text className="text-sm text-gray-700 font-medium">
                              {category}
                            </Text>
                          </View>
                          <Text className="text-sm text-gray-700 font-medium">
                            {data.count}件のサービス
                          </Text>
                        </View>
                        <View className="text-right flex-shrink-0 ml-4">
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
                        <View
                          className="h-3 rounded-full"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor:
                              getCategoryColorForProgress(category),
                          }}
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
              </>
            )}
          </View>
        </View>

        {/* カテゴリ編集モーダル */}
        <Modal
          visible={isEditCategoryOpen}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsEditCategoryOpen(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
          >
            <Pressable
              onPress={() => setIsEditCategoryOpen(false)}
              className="flex-1 justify-center items-center bg-black/60 p-4"
            >
              <Pressable className="w-full bg-orange-50 rounded-lg p-4">
                <View style={styles.modalHeader}>
                  <Tag style={styles.modalIcon} color="#f97316" />
                  <Text style={styles.modalTitle}>
                    カテゴリ名を編集できます
                  </Text>
                </View>
                <View style={styles.modalContent}>
                  <TextInput
                    value={newCategoryName}
                    onChangeText={setNewCategoryName}
                    placeholder="カテゴリ名を入力..."
                    placeholderTextColor="#9ca3af"
                    style={[
                      styles.modalInput,
                      {
                        backgroundColor:
                          getCategoryBackgroundColor(editingCategory),
                      },
                    ]}
                    onSubmitEditing={handleEditCategory}
                  />
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      onPress={() => setIsEditCategoryOpen(false)}
                      style={styles.cancelButton}
                    >
                      <Text style={styles.cancelButtonText}>キャンセル</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleEditCategory}
                      disabled={
                        !newCategoryName.trim() ||
                        newCategoryName.trim() === editingCategory
                      }
                      style={[
                        styles.saveButton,
                        (!newCategoryName.trim() ||
                          newCategoryName.trim() === editingCategory) &&
                          styles.disabledButton,
                      ]}
                    >
                      <Text style={styles.saveButtonText}>保存</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Pressable>
            </Pressable>
          </KeyboardAvoidingView>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerIcon: {
    marginRight: 12,
  },
  toggleButton: {
    minWidth: 80,
    paddingHorizontal: 12,
  },
  toggleIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  modalContent: {
    gap: 16,
  },
  modalInput: {
    backgroundColor: '#f3f4f6',
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: '#374151',
    fontWeight: '500',
    fontSize: 16,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#f97316',
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default AnalyticsView
