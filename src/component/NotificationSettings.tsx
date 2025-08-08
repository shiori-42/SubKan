import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native'
import { Bell, ArrowLeft } from 'lucide-react-native'

interface NotificationSettingsProps {
  onBack: () => void
}

const NotificationSettings = ({ onBack }: NotificationSettingsProps) => {
  const [paymentReminders, setPaymentReminders] = useState(true)
  const [trialExpiry, setTrialExpiry] = useState(true)
  const [newFeatures, setNewFeatures] = useState(false)
  const [marketing, setMarketing] = useState(false)

  return (
    <View style={styles.container}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft size={20} color="#f97316" />
        </TouchableOpacity>
        <Bell size={20} color="#f97316" />
        <Text style={styles.headerTitle}>通知設定</Text>
      </View>

      {/* 通知設定項目 */}
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>通知の種類</Text>

          {/* 支払いリマインダー */}
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>支払いリマインダー</Text>
              <Text style={styles.settingDescription}>
                支払い日の3日前に通知
              </Text>
            </View>
            <Switch
              value={paymentReminders}
              onValueChange={setPaymentReminders}
              trackColor={{ false: '#d1d5db', true: '#f97316' }}
              thumbColor={paymentReminders ? '#fff' : '#f4f3f4'}
            />
          </View>

          {/* 無料期間終了 */}
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>無料期間終了</Text>
              <Text style={styles.settingDescription}>
                無料期間終了の1日前に通知
              </Text>
            </View>
            <Switch
              value={trialExpiry}
              onValueChange={setTrialExpiry}
              trackColor={{ false: '#d1d5db', true: '#f97316' }}
              thumbColor={trialExpiry ? '#fff' : '#f4f3f4'}
            />
          </View>

          {/* 新機能のお知らせ */}
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>新機能のお知らせ</Text>
              <Text style={styles.settingDescription}>
                アプリの新機能やアップデート情報
              </Text>
            </View>
            <Switch
              value={newFeatures}
              onValueChange={setNewFeatures}
              trackColor={{ false: '#d1d5db', true: '#f97316' }}
              thumbColor={newFeatures ? '#fff' : '#f4f3f4'}
            />
          </View>

          {/* マーケティング情報 */}
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>マーケティング情報</Text>
              <Text style={styles.settingDescription}>
                お得な情報やキャンペーン情報
              </Text>
            </View>
            <Switch
              value={marketing}
              onValueChange={setMarketing}
              trackColor={{ false: '#d1d5db', true: '#f97316' }}
              thumbColor={marketing ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginLeft: 8,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9fafb',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 12,
  },
  settingContent: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 18,
  },
})

export default NotificationSettings
