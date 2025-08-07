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
} from 'react-native'
import { Bell, AlertTriangle, X } from 'lucide-react-native'

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [notificationSettings, setNotificationSettings] = useState({
    paymentReminder: true,
    paymentReminderDays: '3',
    cancelReminder: true,
  })
  const [showTimingPicker, setShowTimingPicker] = useState(false)

  const handleSaveNotifications = () => {
    console.log('Notification settings saved:', notificationSettings)
    onOpenChange(false)
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
            {/* ヘッダー */}
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <Bell size={22} color="#f97316" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>通知設定</Text>
              </View>
              <TouchableOpacity
                onPress={() => onOpenChange(false)}
                style={styles.closeButton}
              >
                <X size={18} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* コンテンツ */}
            <View style={styles.content}>
              {/* 支払いリマインダー */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionHeaderContent}>
                    <Bell
                      size={20}
                      color="#3b82f6"
                      style={styles.sectionIcon}
                    />
                    <View>
                      <Text style={styles.sectionTitle}>
                        支払いリマインダー
                      </Text>
                      <Text style={styles.sectionSubtitle}>
                        支払い予定日の前に通知を受け取ります
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.sectionBody}>
                  <View style={styles.settingRow}>
                    <View style={styles.settingContent}>
                      <Text style={styles.settingTitle}>通知を有効にする</Text>
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
                  {notificationSettings.paymentReminder && (
                    <View style={styles.notificationTiming}>
                      <Text style={styles.timingTitle}>通知タイミング</Text>
                      <TouchableOpacity
                        onPress={() => setShowTimingPicker(true)}
                        style={styles.timingInfo}
                      >
                        <Text style={styles.timingText}>
                          {notificationSettings.paymentReminderDays === '1' &&
                            '支払い日の1日前'}
                          {notificationSettings.paymentReminderDays === '3' &&
                            '支払い日の3日前'}
                          {notificationSettings.paymentReminderDays === '7' &&
                            '支払い日の1週間前'}
                          {notificationSettings.paymentReminderDays === '14' &&
                            '支払い日の2週間前'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>

              {/* 解約日リマインダー */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionHeaderContent}>
                    <AlertTriangle
                      size={20}
                      color="#ef4444"
                      style={styles.sectionIcon}
                    />
                    <View>
                      <Text style={styles.sectionTitle}>
                        解約日リマインダー
                      </Text>
                      <Text style={styles.sectionSubtitle}>
                        解約日当日に通知を受け取ります
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.sectionBody}>
                  <View style={styles.settingRow}>
                    <View style={styles.settingContent}>
                      <Text style={styles.settingTitle}>通知を有効にする</Text>
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
              </View>

              {/* 保存ボタン */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={handleSaveNotifications}
                  style={styles.saveButton}
                >
                  <Text style={styles.saveButtonText}>設定を保存</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Pressable>
      </Pressable>

      {/* 通知タイミング選択モーダル */}
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
            <View style={styles.timingModalHeader}>
              <Text style={styles.timingModalTitle}>通知タイミングを選択</Text>
            </View>
            <View style={styles.timingModalContent}>
              {[
                { label: '支払い日の1日前', value: '1' },
                { label: '支払い日の3日前', value: '3' },
                { label: '支払い日の1週間前', value: '7' },
                { label: '支払い日の2週間前', value: '14' },
              ].map((timing) => (
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
    gap: 24,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  sectionHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  sectionHeaderContent: {
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
  sectionBody: {
    padding: 16,
    gap: 16,
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
  notificationTiming: {
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
  timingInfo: {
    height: 48,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  timingText: {
    fontSize: 16,
    color: '#1f2937',
  },
  buttonContainer: {
    paddingTop: 8,
  },
  saveButton: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f97316',
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  timingModalContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    margin: 32,
    maxWidth: 400,
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
})
