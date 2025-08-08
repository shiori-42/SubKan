import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import {
  ArrowLeft,
  CreditCard,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react-native'
import { useBilling } from '@/hooks/useBilling'

interface SubscriptionCancelScreenProps {
  onBack: () => void
  onLogout: () => void
}

const SubscriptionCancelScreen = ({
  onBack,
  onLogout,
}: SubscriptionCancelScreenProps) => {
  const { billingInfo, handleCancelSubscription } = useBilling()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCancelPress = () => {
    Alert.alert(
      '解約確認',
      '本当にアプリの利用を停止しますか？\n\n解約後はアプリを使用できなくなります。',
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: '解約する',
          style: 'destructive',
          onPress: () => {
            setIsProcessing(true)
            // 実際の解約処理をシミュレート
            setTimeout(() => {
              handleCancelSubscription()
              onLogout()
            }, 2000)
          },
        },
      ]
    )
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  return (
    <View style={styles.container}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft size={20} color="#f97316" />
        </TouchableOpacity>
        <CreditCard size={20} color="#f97316" />
        <Text style={styles.headerTitle}>サブスクリプション解約</Text>
      </View>

      {/* コンテンツ */}
      <View style={styles.content}>
        {/* 警告メッセージ */}
        <View style={styles.warningContainer}>
          <AlertTriangle size={24} color="#dc2626" />
          <Text style={styles.warningTitle}>解約後の注意事項</Text>
          <Text style={styles.warningText}>
            解約後はアプリのすべての機能が利用できなくなります。
          </Text>
        </View>

        {/* 現在のプラン情報 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>現在のプラン</Text>
          <View style={styles.planBox}>
            <View style={styles.planHeader}>
              <View style={styles.planLabel}>
                <CreditCard size={18} color="#6b7280" />
                <Text style={styles.planLabelText}>プラン</Text>
              </View>
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumBadgeText}>有料プラン</Text>
              </View>
            </View>
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
          </View>
        </View>

        {/* 解約後の影響 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>解約後の影響</Text>
          <View style={styles.impactList}>
            <View style={styles.impactItem}>
              <CheckCircle size={16} color="#dc2626" />
              <Text style={styles.impactText}>
                サブスクリプション管理機能が利用できなくなります
              </Text>
            </View>
            <View style={styles.impactItem}>
              <CheckCircle size={16} color="#dc2626" />
              <Text style={styles.impactText}>
                保存されたデータは削除されます
              </Text>
            </View>
            <View style={styles.impactItem}>
              <CheckCircle size={16} color="#dc2626" />
              <Text style={styles.impactText}>
                次回課金日以降の課金は停止されます
              </Text>
            </View>
            <View style={styles.impactItem}>
              <CheckCircle size={16} color="#dc2626" />
              <Text style={styles.impactText}>
                アプリにログインできなくなります
              </Text>
            </View>
          </View>
        </View>

        {/* 解約ボタン */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleCancelPress}
            style={[
              styles.cancelButton,
              isProcessing && styles.cancelButtonDisabled,
            ]}
            disabled={isProcessing}
          >
            <Text style={styles.cancelButtonText}>
              {isProcessing ? '解約処理中...' : 'アプリ利用停止'}
            </Text>
          </TouchableOpacity>
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
  warningContainer: {
    backgroundColor: '#fef2f2',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
    marginBottom: 24,
    alignItems: 'center',
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#dc2626',
    marginTop: 8,
    marginBottom: 4,
  },
  warningText: {
    fontSize: 14,
    color: '#dc2626',
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  planBox: {
    backgroundColor: '#f9fafb',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  planLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planLabelText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
  },
  premiumBadge: {
    backgroundColor: '#f97316',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f97316',
  },
  premiumBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  billingItem: {
    marginBottom: 8,
  },
  billingLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  billingValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  impactList: {
    gap: 12,
  },
  impactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  impactText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 16,
  },
  cancelButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
})

export default SubscriptionCancelScreen
