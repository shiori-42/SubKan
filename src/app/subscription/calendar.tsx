import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native'
import * as holiday_jp from '@holiday-jp/holiday_jp'
import { mockSubscriptions, Subscription } from '@/data/mockData'
import AddSubscriptionDialog from '@/component/AddSubscriptionDialog'

import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  CreditCard,
  AlertTriangle,
  X,
  Edit3,
  Trash2,
  Plus,
} from 'lucide-react-native'

interface CalendarEvent {
  subscription: Subscription
  type: 'payment' | 'cancel'
}

interface CalendarViewProps {
  subscriptions?: Subscription[]
  setSubscriptions?: React.Dispatch<React.SetStateAction<Subscription[]>>
}

export function CalendarView({
  subscriptions: propSubscriptions,
  setSubscriptions: propSetSubscriptions,
}: CalendarViewProps) {
  const [localSubscriptions, setLocalSubscriptions] =
    useState<Subscription[]>(mockSubscriptions)

  const subscriptions = propSubscriptions || localSubscriptions
  const setSubscriptions = propSetSubscriptions || setLocalSubscriptions

  const [currentDate, setCurrentDate] = useState(
    new Date('2025-08-05T12:00:00')
  )
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  // ダイアログの状態管理
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingSubscription, setEditingSubscription] =
    useState<Subscription | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // 祝日判定ロジック: 日本の祝日ライブラリを使用して祝日かどうかを判定
  const isHoliday = (date: Date): boolean => {
    return holiday_jp.isHoliday(date)
  }

  // カテゴリ色取得関数
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

  // 月の日数計算: 指定された月の最終日を取得して日数を算出
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  // 月の最初の曜日計算: その月の1日が何曜日かを取得（0=日曜日）
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  // 月間ナビゲーション: 前月/次月への移動時に選択状態をリセット
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setDate(1)
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
    setSelectedDate(null)
  }

  /**
   * 次回支払い日計算ロジック
   * サブスクリプションの支払いサイクルに基づいて、指定月の支払い日を算出
   *
   * ビジネスルール:
   * - 月額: 毎月同じ日に支払い
   * - 年額: 毎年同じ月・日に支払い
   * - 週額/3ヶ月/6ヶ月: 基準日から指定間隔で繰り返し
   * - 過去の支払い日は対象外
   *
   * @param subscription サブスクリプション情報
   * @param fromDate 計算対象月
   * @returns 該当月の支払い日（該当なしの場合はnull）
   */
  const calculateNextPaymentDate = (
    subscription: Subscription,
    fromDate: Date
  ): Date | null => {
    const { nextPayment, cycle } = subscription
    const targetYear = fromDate.getFullYear()
    const targetMonth = fromDate.getMonth()
    const basePaymentDate = new Date(nextPayment)

    // 基準支払い日が対象月より未来の場合は、月額・年額以外は対象外
    if (
      basePaymentDate.getFullYear() > targetYear ||
      (basePaymentDate.getFullYear() === targetYear &&
        basePaymentDate.getMonth() > targetMonth)
    ) {
      if (cycle === '月額' || cycle === '年額') return null
    }

    let candidateDate: Date | null = null

    // 支払いサイクル別の計算ロジック
    switch (cycle) {
      case '月額':
        // 月額: 基準日が対象月以前の場合のみ、対象月の同じ日に設定
        if (
          basePaymentDate.getFullYear() < targetYear ||
          (basePaymentDate.getFullYear() === targetYear &&
            basePaymentDate.getMonth() <= targetMonth)
        ) {
          candidateDate = new Date(
            targetYear,
            targetMonth,
            basePaymentDate.getDate()
          )
        }
        break

      case '年額':
        // 年額: 基準月と対象月が一致する場合のみ、同じ日に設定
        if (
          basePaymentDate.getFullYear() <= targetYear &&
          basePaymentDate.getMonth() === targetMonth
        ) {
          candidateDate = new Date(
            targetYear,
            targetMonth,
            basePaymentDate.getDate()
          )
        }
        break

      default:
        // 週額/3ヶ月/6ヶ月: 基準日から指定間隔で繰り返し計算
        let tempDate = new Date(basePaymentDate)

        // 対象月に到達するまで日付を進める
        while (
          tempDate.getFullYear() < targetYear ||
          (tempDate.getFullYear() === targetYear &&
            tempDate.getMonth() < targetMonth)
        ) {
          if (cycle === '週額') tempDate.setDate(tempDate.getDate() + 7)
          if (cycle === '3ヶ月') tempDate.setMonth(tempDate.getMonth() + 3)
          if (cycle === '6ヶ月') tempDate.setMonth(tempDate.getMonth() + 6)
        }

        // 計算結果が対象月と一致する場合のみ有効
        if (
          tempDate.getFullYear() === targetYear &&
          tempDate.getMonth() === targetMonth
        ) {
          candidateDate = tempDate
        }
        break
    }

    // 最終チェック: 計算結果が対象月と一致することを確認
    if (candidateDate && candidateDate.getMonth() !== targetMonth) {
      return null
    }

    return candidateDate
  }

  /**
   * 指定日のイベント取得ロジック
   * 支払い予定日と解約期限日を統合して、指定日の全イベントを取得
   *
   * ビジネスルール:
   * - 支払い予定日と解約期限日は同じ日に複数存在可能
   * - 日付の完全一致のみを対象とする
   *
   * @param day 対象日
   * @returns その日のイベント配列
   */
  const getEventsForDate = (day: number): CalendarEvent[] => {
    const events: CalendarEvent[] = []

    // 全サブスクリプションの支払い予定日をチェック
    subscriptions.forEach((sub) => {
      const paymentDate = calculateNextPaymentDate(sub, currentDate)

      // 支払い予定日が指定日と一致する場合
      if (
        paymentDate &&
        paymentDate.getDate() === day &&
        paymentDate.getMonth() === currentDate.getMonth() &&
        paymentDate.getFullYear() === currentDate.getFullYear()
      ) {
        events.push({ subscription: sub, type: 'payment' })
      }

      // 解約期限日が指定日と一致する場合
      if (sub.cancelDeadline) {
        const cancelDate = new Date(sub.cancelDeadline)
        if (
          cancelDate.getFullYear() === currentDate.getFullYear() &&
          cancelDate.getMonth() === currentDate.getMonth() &&
          cancelDate.getDate() === day
        ) {
          events.push({ subscription: sub, type: 'cancel' })
        }
      }
    })

    return events
  }

  // 日付クリック処理: イベントが存在する日のみ詳細表示を有効化
  const handleDateClick = (day: number) => {
    const events = getEventsForDate(day)
    if (events.length > 0) {
      setSelectedDate(day)
      setIsDetailOpen(true)
    }
  }

  // 選択日付のフォーマット: 日本語形式で年月日と曜日を表示
  const formatSelectedDate = () => {
    if (selectedDate === null) return ''
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      selectedDate
    ).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    })
  }

  // 選択日付のイベント取得: 選択された日付の全イベントを取得
  const getSelectedDateEvents = (): CalendarEvent[] => {
    if (selectedDate === null) return []
    return getEventsForDate(selectedDate)
  }

  // カレンダー表示用データの計算
  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = getFirstDayOfMonth(currentDate)
  const monthName = currentDate.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
  })
  const dayNames = ['日', '月', '火', '水', '木', '金', '土']
  const days = [
    ...Array.from({ length: firstDayOfMonth }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  /**
   * 月間支出予定額計算ロジック
   * 表示月の全支払い予定額を合計して月間支出予定を算出
   *
   * ビジネスルール:
   * - 支払い予定日が表示月に含まれるサブスクリプションのみ対象
   * - 解約期限は支出計算に含めない
   */
  const monthlyTotal = subscriptions.reduce((total, sub) => {
    const paymentDate = calculateNextPaymentDate(sub, currentDate)
    if (
      paymentDate &&
      paymentDate.getMonth() === currentDate.getMonth() &&
      paymentDate.getFullYear() === currentDate.getFullYear()
    ) {
      return total + sub.amount
    }
    return total
  }, 0)

  /**
   * サブスクリプション編集ハンドラー
   * 編集画面への遷移処理を実装
   *
   * @param subscription 編集対象のサブスクリプション
   */
  const handleEditSubscription = (subscription: Subscription) => {
    setEditingSubscription(subscription)
    setIsEditing(true)
    setIsAddDialogOpen(true)
    setIsDetailOpen(false)
  }

  const handleAdd = () => {
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

  /**
   * サブスクリプション削除ハンドラー
   * 確認ダイアログ表示後に削除処理を実行
   *
   * @param id 削除対象のサブスクリプションID
   */
  const handleDeleteSubscription = (id: string) => {
    // TODO: 削除確認ダイアログを表示
    console.log('削除:', id)

    // 削除処理（確認後）
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== id))
    setIsDetailOpen(false) // モーダルを閉じる
  }

  return (
    <View className="space-y-4 p-4 bg-orange-50 flex-1">
      <View className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <View className="p-4 pb-2">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <CalendarIcon
                className="w-6 h-6"
                color="#ec4899"
                style={styles.calendarHeaderIcon}
              />
              <View className="space-y-0.5">
                <Text className="text-lg text-gray-800 font-bold">
                  {monthName}
                </Text>
                {monthlyTotal > 0 && (
                  <Text className="text-sm text-gray-800">
                    月間支出予定: ¥{monthlyTotal.toLocaleString()}
                  </Text>
                )}
              </View>
            </View>
            <View className="flex-row" style={styles.navButtonContainer}>
              <TouchableOpacity
                onPress={() => navigateMonth('prev')}
                className="p-2.5 bg-white/70 rounded-l-md border border-gray-200"
              >
                <ChevronLeft className="w-5 h-5 text-gray-800" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigateMonth('next')}
                className="p-2.5 bg-white/70 rounded-r-md border border-gray-200"
              >
                <ChevronRight className="w-5 h-5 text-gray-800" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="px-4 pb-4">
          <View className="flex-row flex-wrap mt-12">
            {/* 曜日ヘッダー行 */}
            {dayNames.map((dayName, index) => (
              <View
                key={`header-${index}`}
                className="w-[14.28%] h-8 items-center justify-center p-1"
              >
                <View
                  className={`w-full py-1 rounded-md ${
                    index === 0
                      ? 'bg-red-100'
                      : index === 6
                        ? 'bg-blue-100'
                        : 'bg-gray-100'
                  }`}
                >
                  <Text
                    className={`
                    text-sm font-semibold text-center
                    ${index === 0 ? 'text-red-500' : ''}
                    ${index === 6 ? 'text-blue-500' : ''}
                    ${index > 0 && index < 6 ? 'text-gray-500' : ''}
                  `}
                  >
                    {dayName}
                  </Text>
                </View>
              </View>
            ))}
            {/* 日付セル */}
            {days.map((day, index) => {
              if (day === null) {
                return (
                  <View key={`empty-${index}`} className="w-[14.28%] h-20" />
                )
              }
              const events = getEventsForDate(day)
              const hasEvents = events.length > 0
              const dayOfWeek = (firstDayOfMonth + day - 1) % 7
              const dateObj = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day
              )
              const isToday =
                day === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear()
              const isHolidayDate = isHoliday(dateObj)
              let dayContainerClass = 'bg-white border-gray-200'
              let dayTextClass = 'text-gray-800'
              if (isToday) {
                dayContainerClass = 'bg-orange-100 border-orange-300'
              } else if (isHolidayDate || dayOfWeek === 0) {
                dayContainerClass = 'bg-pink-50 border-pink-200'
                dayTextClass = 'text-red-600'
              } else if (dayOfWeek === 6) {
                dayContainerClass = 'bg-blue-50 border-blue-200'
                dayTextClass = 'text-blue-600'
              }
              if (hasEvents) {
                dayContainerClass += ' active:bg-blue-100'
              }
              return (
                <TouchableOpacity
                  key={day}
                  className={`w-[14.28%] h-20 p-1 border rounded-lg ${dayContainerClass}`}
                  onPress={() => handleDateClick(day)}
                  activeOpacity={0.7}
                >
                  <Text className={`text-sm font-medium ${dayTextClass}`}>
                    {day}
                  </Text>
                  <View className="space-y-1 mt-1">
                    {events.slice(0, 1).map((event, eventIndex) => (
                      <View
                        key={eventIndex}
                        className={`px-1 py-0.5 rounded ${
                          event.type === 'payment'
                            ? 'bg-blue-500'
                            : 'bg-red-500'
                        }`}
                      >
                        <Text className="text-white text-xs" numberOfLines={1}>
                          {event.subscription.name}
                        </Text>
                      </View>
                    ))}
                    {events.length > 1 && (
                      <Text className="text-xs text-gray-500">
                        +{events.length - 1}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isDetailOpen}
        onRequestClose={() => setIsDetailOpen(false)}
      >
        <View className="absolute inset-0 justify-center items-center p-4 bg-black/75 backdrop-blur-sm">
          <View className="bg-orange-50 rounded-lg shadow-xl w-full max-w-md max-h-[90%]">
            <View className="p-4 border-b border-gray-200 flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <CalendarIcon
                  className="w-6 h-6 shrink-0"
                  color="#ec4899"
                  style={styles.modalHeaderIcon}
                />
                <Text
                  className="text-xl font-bold text-gray-800"
                  numberOfLines={1}
                >
                  {formatSelectedDate()}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsDetailOpen(false)}
                className="p-1 rounded-full active:bg-gray-200"
              >
                <X className="w-5 h-5 text-gray-800" />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
              {getSelectedDateEvents().map((event, index) => (
                <View
                  key={index}
                  className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200/60"
                >
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-row items-center flex-1 min-w-0">
                      {/* ▼▼▼▼▼ ここを SubscriptionCard のスタイルに合わせます ▼▼▼▼▼ */}
                      <View
                        className="w-10 h-10 rounded-full bg-orange-300 items-center justify-center shrink-0"
                        style={styles.subscriptionIconContainer}
                      >
                        <Text className="text-lg font-bold text-gray-800">
                          {event.subscription.name.charAt(0)}
                        </Text>
                      </View>
                      {/* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */}
                      <View className="flex-1">
                        <Text
                          className="text-lg font-semibold text-gray-800"
                          numberOfLines={1}
                        >
                          {event.subscription.name}
                        </Text>
                        <View
                          className={`px-2 py-0.5 mt-1 self-start rounded-full ${getCategoryColor(event.subscription.category)}`}
                        >
                          <Text className="text-xs text-gray-800">
                            {event.subscription.category}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View className="shrink-0 ml-2">
                      {event.type === 'payment' ? (
                        <View className="flex-row items-center bg-blue-100 px-2.5 py-1 rounded-full">
                          <CreditCard
                            className="w-4 h-4"
                            color="#2563eb"
                            style={styles.badgeIcon}
                          />
                          <Text className="text-xs font-medium text-blue-800">
                            支払い
                          </Text>
                        </View>
                      ) : (
                        <View className="flex-row items-center bg-red-100 px-2.5 py-1 rounded-full">
                          <AlertTriangle
                            className="w-4 h-4"
                            color="#dc2626"
                            style={styles.badgeIcon}
                          />
                          <Text className="text-xs font-medium text-red-800">
                            解約期限
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  {event.type === 'payment' ? (
                    <View className="space-y-3 mt-2">
                      <View className="flex-row justify-between items-center">
                        <Text className="text-sm text-gray-600">
                          支払い金額
                        </Text>
                        <Text className="text-lg font-bold text-gray-800">
                          ¥{event.subscription.amount.toLocaleString()}
                        </Text>
                      </View>
                      <View className="flex-row justify-between items-center">
                        <Text className="text-sm text-gray-600">
                          支払いサイクル
                        </Text>
                        <Text className="text-sm font-medium text-gray-800">
                          {event.subscription.cycle}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View className="space-y-3 mt-2">
                      <View className="flex-row justify-between items-center">
                        <Text className="text-sm text-gray-600">
                          解約手続き期限
                        </Text>
                        <Text className="text-sm font-medium text-red-600">
                          {event.subscription.cancelDeadline?.toLocaleDateString(
                            'ja-JP'
                          )}
                        </Text>
                      </View>
                      <View className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <Text className="text-sm text-red-700 leading-relaxed">
                          継続しない場合は、この日までに解約手続きを完了してください。
                        </Text>
                      </View>
                    </View>
                  )}

                  {/* アクションボタン: 編集・削除 */}
                  <View className="flex-row space-x-4 mt-4 pt-4 border-t border-gray-200">
                    <Pressable
                      className="flex-1 bg-gray-100 items-center justify-center py-3 px-4 rounded-xl flex-row"
                      onPress={() => handleEditSubscription(event.subscription)}
                    >
                      <Edit3
                        color="#6b7280"
                        size={16}
                        style={styles.actionIcon}
                      />
                      <Text className="text-sm font-medium text-gray-700">
                        編集
                      </Text>
                    </Pressable>
                    <Pressable
                      className="flex-1 bg-red-50 items-center justify-center py-3 px-4 rounded-xl flex-row"
                      onPress={() =>
                        handleDeleteSubscription(event.subscription.id)
                      }
                    >
                      <Trash2
                        color="#ef4444"
                        size={16}
                        style={styles.actionIcon}
                      />
                      <Text className="text-sm font-medium text-red-600">
                        削除
                      </Text>
                    </Pressable>
                  </View>
                </View>
              ))}
              {getSelectedDateEvents().length === 0 && (
                <View className="items-center py-8">
                  <CalendarIcon className="w-12 h-12 text-gray-400 mb-3" />
                  <Text className="text-base text-gray-800">
                    この日は予定がありません
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

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
    </View>
  )
}

const styles = StyleSheet.create({
  calendarHeaderIcon: {
    marginRight: 16,
  },
  navButtonContainer: {
    gap: 12,
  },
  modalHeaderIcon: {
    marginRight: 16,
  },
  subscriptionIconContainer: {
    marginRight: 16,
  },
  badgeIcon: {
    marginRight: 6,
  },
  actionIcon: {
    marginRight: 8,
  },
})

export default CalendarView
