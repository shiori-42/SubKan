import React, { useState, useEffect } from 'react'
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Platform,
  Pressable,
  StyleSheet,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { CalendarIcon, Plus, Edit3, X, ChevronDown } from 'lucide-react-native'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

// Subscriptionインターフェースはそのまま利用
interface Subscription {
  id: string
  name: string
  amount: number
  cycle: string
  nextPayment: Date
  cancelDeadline?: Date
  category: string
  color: string
}

interface AddSubscriptionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (
    subscription: Omit<Subscription, 'id' | 'color'> & {
      color?: string
      id?: string
    }
  ) => void
  categories: string[]
  editingSubscription?: Subscription | null
  isEditing?: boolean
}

export function AddSubscriptionDialog({
  open,
  onOpenChange,
  onAdd,
  categories,
  editingSubscription = null,
  isEditing = false,
}: AddSubscriptionDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    cycle: '月額',
    nextPayment: new Date(),
    cancelDeadline: undefined as Date | undefined,
    category: 'その他',
  })

  // State for date pickers
  const [showNextPaymentPicker, setShowNextPaymentPicker] = useState(false)
  const [showCancelDeadlinePicker, setShowCancelDeadlinePicker] =
    useState(false)
  const [showCancelDeadline, setShowCancelDeadline] = useState(false)

  // State for custom pickers
  const [showCategoryPicker, setShowCategoryPicker] = useState(false)
  const [showCyclePicker, setShowCyclePicker] = useState(false)
  const [showNextPaymentModal, setShowNextPaymentModal] = useState(false)
  const [showCancelDeadlineModal, setShowCancelDeadlineModal] = useState(false)

  useEffect(() => {
    if (isEditing && editingSubscription) {
      setFormData({
        name: editingSubscription.name,
        amount: editingSubscription.amount.toString(),
        cycle: editingSubscription.cycle,
        nextPayment: new Date(editingSubscription.nextPayment),
        cancelDeadline: editingSubscription.cancelDeadline
          ? new Date(editingSubscription.cancelDeadline)
          : undefined,
        category: editingSubscription.category,
      })
      setShowCancelDeadline(!!editingSubscription.cancelDeadline)
    } else {
      // 新規追加モードの場合、フォームをリセット
      setFormData({
        name: '',
        amount: '',
        cycle: '月額',
        nextPayment: new Date(),
        cancelDeadline: undefined,
        category: categories[0] || 'その他',
      })
      setShowCancelDeadline(false)
    }
  }, [isEditing, editingSubscription, open])

  const handleSubmit = () => {
    if (!formData.name || !formData.amount) {
      return
    }

    const newSubscriptionData = {
      name: formData.name,
      amount: Number.parseInt(formData.amount),
      cycle: formData.cycle,
      nextPayment: formData.nextPayment,
      cancelDeadline: showCancelDeadline ? formData.cancelDeadline : undefined,
      category: formData.category,
    }

    if (isEditing && editingSubscription) {
      onAdd({ ...newSubscriptionData, id: editingSubscription.id })
    } else {
      onAdd(newSubscriptionData)
    }
    onOpenChange(false)
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  const onChangeNextPayment = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || formData.nextPayment
    setShowNextPaymentPicker(Platform.OS === 'ios')
    setFormData({ ...formData, nextPayment: currentDate })
  }

  const onChangeCancelDeadline = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate
    setShowCancelDeadlinePicker(Platform.OS === 'ios')
    setFormData({ ...formData, cancelDeadline: currentDate })
  }

  const handleNextPaymentChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setFormData({ ...formData, nextPayment: selectedDate })
    }
    setShowNextPaymentPicker(false)
  }

  const handleCancelDeadlineChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setFormData({ ...formData, cancelDeadline: selectedDate })
    }
    setShowCancelDeadlinePicker(false)
  }

  return (
    <Modal
      visible={open}
      transparent={true}
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <Pressable
        onPress={handleCancel}
        className="flex-1 justify-center items-center bg-black/60 p-4"
      >
        <Pressable className="w-full max-w-md bg-orange-50 rounded-xl shadow-xl max-h-[90%]">
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            {/* ヘッダー */}
            <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
              <View className="flex-row items-center flex-1">
                {isEditing ? (
                  <Edit3 size={22} color="#f97316" style={styles.headerIcon} />
                ) : (
                  <Plus size={22} color="#f97316" style={styles.headerIcon} />
                )}
                <Text
                  className="text-lg font-bold text-gray-800"
                  style={styles.headerTitle}
                >
                  {isEditing
                    ? 'サブスクリプションを編集'
                    : '新しいサブスクリプションを追加'}
                </Text>
              </View>
              <TouchableOpacity onPress={handleCancel} className="p-1">
                <X size={18} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* フォーム */}
            <View style={styles.formContainer}>
              {/* サービス名 */}
              <View style={styles.formItem}>
                <Text style={styles.formLabel}>
                  サービス名 <Text style={{ color: '#f97316' }}>*</Text>
                </Text>
                <TextInput
                  value={formData.name}
                  onChangeText={(text) =>
                    setFormData({ ...formData, name: text })
                  }
                  placeholder="例: Netflix, Spotify..."
                  placeholderTextColor="#9ca3af"
                  style={styles.formInput}
                />
              </View>

              {/* カテゴリ */}
              <View style={styles.formItem}>
                <Text style={styles.formLabel}>
                  カテゴリ <Text style={{ color: '#f97316' }}>*</Text>
                </Text>
                <TouchableOpacity
                  onPress={() => setShowCategoryPicker(true)}
                  style={styles.formTouchable}
                >
                  <Text style={styles.formText}>{formData.category}</Text>
                  <ChevronDown
                    size={16}
                    color="#6b7280"
                    style={{ marginLeft: 'auto' }}
                  />
                </TouchableOpacity>
              </View>

              {/* 料金 */}
              <View style={styles.formItem}>
                <Text style={styles.formLabel}>
                  料金 <Text style={{ color: '#f97316' }}>*</Text>
                </Text>
                <View
                  style={{ position: 'relative', justifyContent: 'center' }}
                >
                  <Text
                    style={{
                      position: 'absolute',
                      left: 16,
                      fontSize: 16,
                      color: '#6b7280',
                      zIndex: 10,
                    }}
                  >
                    ¥
                  </Text>
                  <TextInput
                    value={formData.amount}
                    onChangeText={(text) =>
                      setFormData({
                        ...formData,
                        amount: text.replace(/[^0-9]/g, ''),
                      })
                    }
                    placeholder="1490"
                    placeholderTextColor="#9ca3af"
                    keyboardType="numeric"
                    style={[styles.formInput, { paddingLeft: 32 }]}
                  />
                </View>
              </View>

              {/* 支払いサイクル */}
              <View style={styles.formItem}>
                <Text style={styles.formLabel}>支払いサイクル</Text>
                <TouchableOpacity
                  onPress={() => setShowCyclePicker(true)}
                  style={styles.formTouchable}
                >
                  <Text style={styles.formText}>{formData.cycle}</Text>
                  <ChevronDown
                    size={16}
                    color="#6b7280"
                    style={{ marginLeft: 'auto' }}
                  />
                </TouchableOpacity>
              </View>

              {/* 次回支払い日 */}
              <View style={styles.formItem}>
                <Text style={styles.formLabel}>
                  次回支払い日 <Text style={{ color: '#f97316' }}>*</Text>
                </Text>
                <TouchableOpacity
                  onPress={() => setShowNextPaymentModal(true)}
                  style={styles.formTouchable}
                >
                  <CalendarIcon
                    size={16}
                    color="#6b7280"
                    style={{ marginRight: 12 }}
                  />
                  <Text style={styles.formText}>
                    {format(formData.nextPayment, 'PPP', { locale: ja })}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* 解約日 */}
              <View style={styles.formItem}>
                <Text style={styles.formLabel}>解約日設定</Text>
                <View style={styles.switchContainer}>
                  <Switch
                    value={showCancelDeadline}
                    onValueChange={(value) => {
                      setShowCancelDeadline(value)
                      if (!value)
                        setFormData({ ...formData, cancelDeadline: undefined })
                    }}
                    trackColor={{ false: '#d1d5db', true: '#f97316' }}
                    thumbColor={showCancelDeadline ? '#ffffff' : '#f4f3f4'}
                  />
                  <Text style={styles.switchText}>
                    解約日を設定してリマインドできます
                  </Text>
                </View>
                {showCancelDeadline && (
                  <TouchableOpacity
                    onPress={() => setShowCancelDeadlineModal(true)}
                    style={styles.formTouchable}
                  >
                    <CalendarIcon
                      size={16}
                      color="#6b7280"
                      style={{ marginRight: 12 }}
                    />
                    <Text style={styles.formText}>
                      {formData.cancelDeadline
                        ? format(formData.cancelDeadline, 'PPP', {
                            locale: ja,
                          })
                        : '日付を選択'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* ボタン */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={handleCancel}
                  style={[styles.button, styles.cancelButton]}
                >
                  <Text style={styles.buttonText}>キャンセル</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={[styles.button, styles.submitButton]}
                >
                  <Text style={styles.submitButtonText}>
                    {isEditing ? '更新する' : '追加する'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Pressable>
      </Pressable>

      {/* カテゴリ選択モーダル */}
      <Modal
        visible={showCategoryPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCategoryPicker(false)}
      >
        <Pressable
          onPress={() => setShowCategoryPicker(false)}
          className="flex-1 justify-end bg-black/50"
        >
          <Pressable className="bg-white rounded-t-3xl">
            {/* ハンドル */}
            <View className="items-center pt-3 pb-2">
              <View className="w-12 h-1 bg-gray-300 rounded-full" />
            </View>
            <View className="p-4 border-b border-gray-200">
              <Text className="text-lg font-bold text-center text-gray-800">
                カテゴリを選択
              </Text>
            </View>
            <ScrollView className="max-h-96">
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => {
                    setFormData({ ...formData, category })
                    setShowCategoryPicker(false)
                  }}
                  className="p-4 border-b border-gray-100 flex-row items-center justify-between active:bg-gray-50"
                >
                  <Text className="text-base text-gray-800">{category}</Text>
                  {formData.category === category && (
                    <View className="w-3 h-3 bg-orange-500 rounded-full" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            {/* キャンセルボタン */}
            <TouchableOpacity
              onPress={() => setShowCategoryPicker(false)}
              className="m-4 p-4 bg-gray-100 rounded-xl"
            >
              <Text className="text-center text-base font-medium text-gray-700">
                キャンセル
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* 支払いサイクル選択モーダル */}
      <Modal
        visible={showCyclePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCyclePicker(false)}
      >
        <Pressable
          onPress={() => setShowCyclePicker(false)}
          className="flex-1 justify-end bg-black/50"
        >
          <Pressable className="bg-white rounded-t-3xl">
            {/* ハンドル */}
            <View className="items-center pt-3 pb-2">
              <View className="w-12 h-1 bg-gray-300 rounded-full" />
            </View>
            <View className="p-4 border-b border-gray-200">
              <Text className="text-lg font-bold text-center text-gray-800">
                支払いサイクルを選択
              </Text>
            </View>
            <ScrollView className="max-h-96">
              {[
                { label: '週額', value: '週額' },
                { label: '月額', value: '月額' },
                { label: '3ヶ月ごと', value: '3ヶ月' },
                { label: '6ヶ月ごと', value: '6ヶ月' },
                { label: '年額', value: '年額' },
              ].map((cycle) => (
                <TouchableOpacity
                  key={cycle.value}
                  onPress={() => {
                    setFormData({ ...formData, cycle: cycle.value })
                    setShowCyclePicker(false)
                  }}
                  className="p-4 border-b border-gray-100 flex-row items-center justify-between active:bg-gray-50"
                >
                  <Text className="text-base text-gray-800">{cycle.label}</Text>
                  {formData.cycle === cycle.value && (
                    <View className="w-3 h-3 bg-orange-500 rounded-full" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            {/* キャンセルボタン */}
            <TouchableOpacity
              onPress={() => setShowCyclePicker(false)}
              className="m-4 p-4 bg-gray-100 rounded-xl"
            >
              <Text className="text-center text-base font-medium text-gray-700">
                キャンセル
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* 次回支払い日選択モーダル */}
      <Modal
        visible={showNextPaymentModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowNextPaymentModal(false)}
      >
        <Pressable
          onPress={() => setShowNextPaymentModal(false)}
          className="flex-1 justify-end bg-black/50"
        >
          <Pressable className="bg-white rounded-t-3xl">
            {/* ハンドル */}
            <View className="items-center pt-3 pb-2">
              <View className="w-12 h-1 bg-gray-300 rounded-full" />
            </View>
            <View className="p-4 border-b border-gray-200">
              <Text className="text-lg font-bold text-center text-gray-800">
                次回支払い日を選択
              </Text>
            </View>
            <View className="p-4 items-center">
              <DateTimePicker
                value={formData.nextPayment}
                mode="date"
                display="spinner"
                onChange={handleNextPaymentChange}
                locale="ja"
                style={{ height: 200, width: '100%' }}
              />
            </View>
            {/* 確定ボタン */}
            <TouchableOpacity
              onPress={() => setShowNextPaymentModal(false)}
              className="m-4 p-4 bg-orange-500 rounded-xl"
            >
              <Text className="text-center text-base font-bold text-white">
                確定
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* 解約日選択モーダル */}
      <Modal
        visible={showCancelDeadlineModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCancelDeadlineModal(false)}
      >
        <Pressable
          onPress={() => setShowCancelDeadlineModal(false)}
          className="flex-1 justify-end bg-black/50"
        >
          <Pressable className="bg-white rounded-t-3xl">
            {/* ハンドル */}
            <View className="items-center pt-3 pb-2">
              <View className="w-12 h-1 bg-gray-300 rounded-full" />
            </View>
            <View className="p-4 border-b border-gray-200">
              <Text className="text-lg font-bold text-center text-gray-800">
                解約日を選択
              </Text>
            </View>
            <View className="p-4 items-center">
              <DateTimePicker
                value={formData.cancelDeadline || new Date()}
                mode="date"
                display="spinner"
                onChange={handleCancelDeadlineChange}
                locale="ja"
                style={{ height: 200, width: '100%' }}
              />
            </View>
            {/* 確定ボタン */}
            <TouchableOpacity
              onPress={() => setShowCancelDeadlineModal(false)}
              className="m-4 p-4 bg-orange-500 rounded-xl"
            >
              <Text className="text-center text-base font-bold text-white">
                確定
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </Modal>
  )
}

const styles = StyleSheet.create({
  headerIcon: {
    marginRight: 12,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 16,
    gap: 16,
  },
  formItem: {
    marginBottom: 0,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  formInput: {
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  formTouchable: {
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  formText: {
    fontSize: 16,
    color: '#1f2937',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  switchText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  button: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#e5e7eb',
  },
  submitButton: {
    backgroundColor: '#f97316',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
})

export default AddSubscriptionDialog
