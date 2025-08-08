import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import {
  Settings,
  ArrowLeft,
  User,
  CreditCard,
  LogOut,
  Lock,
} from 'lucide-react-native'
import { mockUser } from '@/data/mockData'
import { useBilling } from '@/hooks/useBilling'
import { EmailChangeDialog } from './EmailChangeDialog'
import { PasswordChangeDialog } from './PasswordChangeDialog'
import SubscriptionCancelScreen from './SubscriptionCancelScreen'

interface AccountSettingsProps {
  onBack: () => void
  onLogout: () => void
  onEmailChange: () => void
  onPasswordChange: () => void
}

const AccountSettings = ({
  onBack,
  onLogout,
  onEmailChange,
  onPasswordChange,
}: AccountSettingsProps) => {
  const { billingInfo, handleCancelSubscription } = useBilling()
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)
  const [showEmailDialog, setShowEmailDialog] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [showCancelScreen, setShowCancelScreen] = useState(false)

  console.log('現在の課金状態:', billingInfo.isPremium)

  const handleCancelPress = () => {
    console.log('解約ボタンがタップされました')
    setShowCancelScreen(true)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  // サブスクリプション解約画面を表示
  if (showCancelScreen) {
    console.log('解約画面を表示します')
    return (
      <SubscriptionCancelScreen
        onBack={() => setShowCancelScreen(false)}
        onLogout={onLogout}
      />
    )
  }

  return (
    <View style={styles.container}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft size={20} color="#f97316" />
        </TouchableOpacity>
        <Settings size={20} color="#f97316" />
        <Text style={styles.headerTitle}>アカウント設定</Text>
      </View>

      {/* アカウント情報 */}
      <View style={styles.content}>
        {/* ユーザー情報 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>アカウント情報</Text>

          <View style={styles.infoBox}>
            <View style={styles.infoHeader}>
              <View style={styles.infoLabel}>
                <User size={18} color="#6b7280" />
                <Text style={styles.infoLabelText}>メールアドレス</Text>
              </View>
              <TouchableOpacity onPress={() => setShowEmailDialog(true)}>
                <Text style={styles.changeButton}>変更</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.infoValue}>{mockUser.email}</Text>
          </View>

          <TouchableOpacity
            onPress={() => setShowPasswordDialog(true)}
            style={styles.infoBox}
          >
            <View style={styles.infoHeader}>
              <View style={styles.infoLabel}>
                <Lock size={18} color="#6b7280" />
                <Text style={styles.infoLabelText}>パスワード</Text>
              </View>
              <Text style={styles.changeButton}>変更</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 課金情報 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>課金情報</Text>

          <View style={styles.infoBox}>
            <View style={styles.infoHeader}>
              <View style={styles.infoLabel}>
                <CreditCard size={18} color="#6b7280" />
                <Text style={styles.infoLabelText}>プラン</Text>
              </View>
              <View
                style={[
                  styles.planBadge,
                  billingInfo.isPremium
                    ? styles.premiumBadge
                    : styles.freeBadge,
                ]}
              >
                <Text
                  style={[
                    styles.planBadgeText,
                    billingInfo.isPremium
                      ? styles.premiumBadgeText
                      : styles.freeBadgeText,
                  ]}
                >
                  {billingInfo.isPremium ? '有料プラン' : '無料プラン'}
                </Text>
              </View>
            </View>

            {billingInfo.isPremium && (
              <>
                <View style={styles.billingItem}>
                  <Text style={styles.billingLabel}>月額料金</Text>
                  <Text style={styles.billingValue}>
                    ¥{billingInfo.monthlyFee.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.billingItem}>
                  <Text style={styles.billingLabel}>次回課金日</Text>
                  <Text style={styles.billingValue}>
                    {formatDate(billingInfo.nextBillingDate)}
                  </Text>
                </View>
                <View style={styles.billingItem}>
                  <Text style={styles.billingLabel}>課金周期</Text>
                  <Text style={styles.billingValue}>30日ごと</Text>
                </View>
              </>
            )}
          </View>
        </View>

        {/* アクション */}
        <View style={styles.section}>
          {billingInfo.isPremium && (
            <TouchableOpacity
              onPress={handleCancelPress}
              style={styles.cancelButton}
            >
              <View style={styles.buttonContent}>
                <LogOut size={18} color="#dc2626" />
                <Text style={styles.cancelButtonText}>アプリ利用停止</Text>
              </View>
              <Text style={styles.cancelButtonSubtext}>
                解約後はアプリを使用できなくなります
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
            <View style={styles.buttonContent}>
              <LogOut size={18} color="#6b7280" />
              <Text style={styles.logoutButtonText}>ログアウト</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* メールアドレス変更ダイアログ */}
      <EmailChangeDialog
        open={showEmailDialog}
        onOpenChange={setShowEmailDialog}
        currentEmail={mockUser.email}
        onEmailChange={onEmailChange}
      />

      {/* パスワード変更ダイアログ */}
      <PasswordChangeDialog
        open={showPasswordDialog}
        onOpenChange={setShowPasswordDialog}
        onPasswordChange={onPasswordChange}
      />
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
    paddingHorizontal: 16,
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
    paddingHorizontal: 16,
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
  infoBox: {
    backgroundColor: '#f9fafb',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 12,
    justifyContent: 'center',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    minHeight: 32,
  },
  infoLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
  },
  infoLabelText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
    fontWeight: '500',
  },
  changeButton: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f97316',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 4,
  },
  planBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  premiumBadge: {
    backgroundColor: '#f97316',
    borderColor: '#f97316',
  },
  freeBadge: {
    backgroundColor: '#f3f4f6',
    borderColor: '#d1d5db',
  },
  planBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  premiumBadgeText: {
    color: '#ffffff',
  },
  freeBadgeText: {
    color: '#6b7280',
  },
  billingItem: {
    marginBottom: 12,
  },
  billingLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  billingValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  cancelButton: {
    backgroundColor: '#fef2f2',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
    marginBottom: 12,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
    marginLeft: 8,
  },
  cancelButtonSubtext: {
    fontSize: 14,
    color: '#ef4444',
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: '#f9fafb',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 8,
  },
})

export default AccountSettings
