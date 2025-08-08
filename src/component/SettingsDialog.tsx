import React, { useState } from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native'
import {
  Bell,
  AlertTriangle,
  X,
  ChevronDown,
  User,
  LogOut,
  ChevronRight,
  Mail,
  Lock,
  Settings,
  Trash2,
} from 'lucide-react-native'
import { Button, Card } from '@/component/common'

interface NotificationSettings {
  paymentReminder: boolean
  paymentReminderDays: string
  cancelReminder: boolean
}

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLogout?: () => void
  onEmailChange?: () => void
  onPasswordChange?: () => void
  onAccountDeletion?: () => void
  currentEmail?: string
}

// Settings dialog component for notification preferences and account settings
export function SettingsDialog({
  open,
  onOpenChange,
  onLogout,
  onEmailChange,
  onPasswordChange,
  onAccountDeletion,
  currentEmail = 'user@example.com',
}: SettingsDialogProps) {
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      paymentReminder: true,
      paymentReminderDays: '3',
      cancelReminder: true,
    })
  const [showTimingPicker, setShowTimingPicker] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('')

  const handleSaveNotifications = () => {
    console.log('Notification settings saved:', notificationSettings)
    onOpenChange(false)
  }

  const handleAccountDeletion = () => {
    console.log('Account deletion requested')
    // TODO: Implement actual account deletion logic
    setShowDeleteConfirmation(false)
    setDeleteConfirmationText('')
    onOpenChange(false)
    onAccountDeletion?.()
  }

  const timingOptions = [
    { label: '支払い日の1日前', value: '1' },
    { label: '支払い日の3日前', value: '3' },
    { label: '支払い日の1週間前', value: '7' },
    { label: '支払い日の2週間前', value: '14' },
  ]

  const getTimingLabel = (value: string) => {
    return (
      timingOptions.find((option) => option.value === value)?.label ||
      '支払い日の3日前'
    )
  }

  return (
    <Modal
      visible={open}
      transparent={true}
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
    >
      <Pressable onPress={() => onOpenChange(false)} style={styles.overlay}>
        <Pressable style={styles.container}>
          <ScrollView>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <Settings size={22} color="#6b7280" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>設定</Text>
              </View>
              <TouchableOpacity
                onPress={() => onOpenChange(false)}
                style={styles.closeButton}
              >
                <X size={18} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={styles.content}>
              {/* Notification settings section */}
              <Card variant="elevated" padding="medium" style={styles.section}>
                <View style={styles.sectionContent}>
                  {/* Section header */}
                  <View style={styles.sectionHeader}>
                    <Bell
                      size={20}
                      color="#f97316"
                      style={styles.sectionIcon}
                    />
                    <View>
                      <Text style={styles.sectionTitle}>通知設定</Text>
                      <Text style={styles.sectionSubtitle}>
                        支払いと解約のリマインダーを管理
                      </Text>
                    </View>
                  </View>

                  {/* Payment reminder setting */}
                  <View style={styles.settingRow}>
                    <View style={styles.settingContent}>
                      <Text style={styles.settingTitle}>
                        支払いリマインダー
                      </Text>
                      <Text style={styles.settingDescription}>
                        例：「Netflix の支払いが3日後です」
                      </Text>
                    </View>
                    <Switch
                      value={notificationSettings.paymentReminder}
                      onValueChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          paymentReminder: checked,
                        })
                      }
                      trackColor={{ false: '#d1d5db', true: '#f97316' }}
                      thumbColor={
                        notificationSettings.paymentReminder
                          ? '#ffffff'
                          : '#f4f3f4'
                      }
                    />
                  </View>

                  {/* Notification timing */}
                  {notificationSettings.paymentReminder && (
                    <View style={styles.timingContainer}>
                      <Text style={styles.timingTitle}>通知タイミング</Text>
                      <TouchableOpacity
                        onPress={() => setShowTimingPicker(true)}
                        style={styles.timingSelector}
                      >
                        <Text style={styles.timingText}>
                          {getTimingLabel(
                            notificationSettings.paymentReminderDays
                          )}
                        </Text>
                        <ChevronDown size={20} color="#6b7280" />
                      </TouchableOpacity>
                      <Text style={styles.timingHint}>
                        タップして他の選択肢を表示
                      </Text>
                    </View>
                  )}

                  {/* Cancel reminder setting */}
                  <View style={styles.settingRow}>
                    <View style={styles.settingContent}>
                      <Text style={styles.settingTitle}>
                        解約日リマインダー
                      </Text>
                      <Text style={styles.settingDescription}>
                        例：「今日は Spotify の解約日です」
                      </Text>
                    </View>
                    <Switch
                      value={notificationSettings.cancelReminder}
                      onValueChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          cancelReminder: checked,
                        })
                      }
                      trackColor={{ false: '#d1d5db', true: '#f97316' }}
                      thumbColor={
                        notificationSettings.cancelReminder
                          ? '#ffffff'
                          : '#f4f3f4'
                      }
                    />
                  </View>
                </View>
              </Card>

              {/* Account settings section */}
              <Card variant="elevated" padding="medium" style={styles.section}>
                <View style={styles.sectionContent}>
                  {/* Section header */}
                  <View style={styles.sectionHeader}>
                    <User
                      size={20}
                      color="#6b7280"
                      style={styles.sectionIcon}
                    />
                    <View>
                      <Text style={styles.sectionTitle}>アカウント設定</Text>
                      <Text style={styles.sectionSubtitle}>
                        アカウント情報の管理
                      </Text>
                    </View>
                  </View>

                  {/* Current email display */}
                  <View style={styles.settingRow}>
                    <View style={styles.settingContent}>
                      <View style={styles.settingHeader}>
                        <Mail
                          size={16}
                          color="#6b7280"
                          style={styles.settingIcon}
                        />
                        <Text style={styles.settingTitle}>
                          現在のメールアドレス
                        </Text>
                      </View>
                      <Text style={styles.settingDescription}>
                        {currentEmail}
                      </Text>
                    </View>
                  </View>

                  {/* Email change */}
                  <TouchableOpacity
                    style={styles.settingRow}
                    onPress={() => {
                      console.log('Email change button pressed')
                      onEmailChange?.()
                    }}
                  >
                    <View style={styles.settingContent}>
                      <View style={styles.settingHeader}>
                        <Mail
                          size={16}
                          color="#6b7280"
                          style={styles.settingIcon}
                        />
                        <Text style={styles.settingTitle}>
                          メールアドレス変更
                        </Text>
                      </View>
                    </View>
                    <ChevronRight size={16} color="#6b7280" />
                  </TouchableOpacity>

                  {/* Password change */}
                  <TouchableOpacity
                    style={styles.settingRow}
                    onPress={() => {
                      console.log('Password change button pressed')
                      onPasswordChange?.()
                    }}
                  >
                    <View style={styles.settingContent}>
                      <View style={styles.settingHeader}>
                        <Lock
                          size={16}
                          color="#6b7280"
                          style={styles.settingIcon}
                        />
                        <Text style={styles.settingTitle}>パスワード変更</Text>
                      </View>
                    </View>
                    <ChevronRight size={16} color="#6b7280" />
                  </TouchableOpacity>

                  {/* Logout button */}
                  <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={onLogout}
                  >
                    <LogOut
                      size={16}
                      color="#6b7280"
                      style={styles.logoutIcon}
                    />
                    <Text style={styles.logoutText}>ログアウト</Text>
                  </TouchableOpacity>

                  {/* Account deletion button */}
                  <TouchableOpacity
                    style={styles.deleteAccountButton}
                    onPress={() => setShowDeleteConfirmation(true)}
                  >
                    <Trash2
                      size={16}
                      color="#ef4444"
                      style={styles.deleteIcon}
                    />
                    <Text style={styles.deleteAccountText}>アカウント削除</Text>
                  </TouchableOpacity>
                </View>
              </Card>

              {/* Account deletion confirmation modal */}
              <Modal
                visible={showDeleteConfirmation}
                transparent={true}
                animationType="fade"
                onRequestClose={() => {
                  setShowDeleteConfirmation(false)
                  setDeleteConfirmationText('')
                }}
              >
                <Pressable
                  onPress={() => {
                    setShowDeleteConfirmation(false)
                    setDeleteConfirmationText('')
                  }}
                  style={styles.overlay}
                >
                  <Pressable style={styles.deleteModalContainer}>
                    {/* Modal header */}
                    <View style={styles.deleteModalHeader}>
                      <View className="w-16 h-16 bg-white rounded-full items-center justify-center mb-4">
                        <AlertTriangle size={32} color="#ef4444" />
                      </View>
                      <Text style={styles.deleteModalTitle}>
                        アカウント削除
                      </Text>
                      <Text style={styles.deleteModalSubtitle}>
                        この操作は取り消すことができません
                      </Text>
                    </View>

                    {/* Modal content */}
                    <View style={styles.deleteModalContent}>
                      <View className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                        <Text className="text-base font-semibold text-gray-800 mb-3">
                          アカウント削除について
                        </Text>
                        <View className="space-y-2">
                          <Text className="text-sm text-black">
                            • すべてのサブスクリプションデータが削除されます
                          </Text>
                          <Text className="text-sm text-black">
                            • 設定や通知履歴も完全に削除されます
                          </Text>
                          <Text className="text-sm text-black">
                            • この操作は取り消すことができません
                          </Text>
                          <Text className="text-sm text-black">
                            • 削除後24時間以内にデータが完全に消去されます
                          </Text>
                        </View>
                      </View>

                      <View className="flex-row space-x-3">
                        <TouchableOpacity
                          onPress={() => {
                            setShowDeleteConfirmation(false)
                            setDeleteConfirmationText('')
                          }}
                          className="flex-1 bg-white p-3 rounded-lg items-center justify-center"
                        >
                          <Text className="text-base font-medium text-gray-700">
                            キャンセル
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={handleAccountDeletion}
                          className="flex-1 p-3 rounded-lg items-center justify-center bg-red-600"
                        >
                          <Text className="text-white font-medium text-base">
                            削除
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Pressable>
                </Pressable>
              </Modal>

              {/* Save button */}
              <View style={styles.buttonContainer}>
                <Button
                  title="設定を保存"
                  onPress={handleSaveNotifications}
                  variant="primary"
                  size="large"
                />
              </View>
            </View>
          </ScrollView>
        </Pressable>
      </Pressable>

      {/* Notification timing picker modal */}
      <Modal
        visible={showTimingPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowTimingPicker(false)}
      >
        <Pressable
          onPress={() => setShowTimingPicker(false)}
          style={styles.overlay}
        >
          <Pressable style={styles.timingModalContainer}>
            {/* Modal header */}
            <View style={styles.timingModalHeader}>
              <Text style={styles.timingModalTitle}>通知タイミングを選択</Text>
              <Text style={styles.timingModalSubtitle}>
                支払い日の何日前に通知を受け取りますか？
              </Text>
            </View>

            {/* Modal content */}
            <View style={styles.timingModalContent}>
              {timingOptions.map((timing) => (
                <TouchableOpacity
                  key={timing.value}
                  onPress={() => {
                    setNotificationSettings({
                      ...notificationSettings,
                      paymentReminderDays: timing.value,
                    })
                    setShowTimingPicker(false)
                  }}
                  style={[
                    styles.timingOption,
                    notificationSettings.paymentReminderDays === timing.value &&
                      styles.timingOptionSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.timingOptionText,
                      notificationSettings.paymentReminderDays ===
                        timing.value && styles.timingOptionTextSelected,
                    ]}
                  >
                    {timing.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Cancel button */}
            <TouchableOpacity
              onPress={() => setShowTimingPicker(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>キャンセル</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  section: {
    marginBottom: 0,
  },
  sectionContent: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingContent: {
    flex: 1,
    paddingRight: 16,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 8,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  settingDescription: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginTop: 8,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  deleteAccountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#fef2f2',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
    marginTop: 8,
  },
  deleteIcon: {
    marginRight: 8,
  },
  deleteAccountText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ef4444',
  },
  timingContainer: {
    backgroundColor: '#fff7ed',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  timingTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  timingSelector: {
    height: 48,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  timingText: {
    fontSize: 16,
    color: '#1f2937',
    flex: 1,
  },
  timingHint: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 8,
  },
  buttonContainer: {
    paddingTop: 8,
  },
  timingModalContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    margin: 32,
    width: '100%',
    maxWidth: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  timingModalHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  timingModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1f2937',
  },
  timingModalSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
  },
  timingModalContent: {
    padding: 8,
  },
  timingOption: {
    padding: 16,
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
  },
  timingOptionSelected: {
    backgroundColor: '#fff7ed',
    borderWidth: 1,
    borderColor: '#f97316',
  },
  timingOptionText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
  },
  timingOptionTextSelected: {
    color: '#f97316',
    fontWeight: '600',
  },
  cancelButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#374151',
  },
  deleteModalContainer: {
    backgroundColor: '#fef2f2',
    borderRadius: 16,
    margin: 32,
    width: '100%',
    maxWidth: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  deleteModalHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    alignItems: 'center',
  },
  deleteModalIcon: {
    marginBottom: 12,
  },
  deleteModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1f2937',
  },
  deleteModalSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
  },
  deleteModalContent: {
    padding: 20,
  },
})
