import { useState, useEffect } from 'react'
import { BillingInfo, mockBillingInfo } from '@/data/mockData'

export const useBilling = () => {
  const [billingInfo, setBillingInfo] = useState<BillingInfo>(mockBillingInfo)
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false)

  // 課金状態をチェックする関数
  const checkBillingStatus = () => {
    const today = new Date()
    const nextBilling = new Date(billingInfo.nextBillingDate)

    // 無料トライアル期間が終了したかチェック
    if (
      !billingInfo.isPremium &&
      !billingInfo.freeTrialUsed &&
      today >= nextBilling
    ) {
      // 無料トライアル終了、有料プランに自動移行
      setBillingInfo((prev) => ({
        ...prev,
        isPremium: true,
        freeTrialUsed: true,
        nextBillingDate: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000), // 30日後
      }))
    }
  }

  // 有料プラン開始処理
  const handleUpgrade = () => {
    setBillingInfo((prev) => ({
      ...prev,
      isPremium: true,
      freeTrialUsed: true,
      subscriptionStartDate: new Date(),
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30日後
    }))
  }

  // アプリ利用停止処理
  const handleCancelSubscription = () => {
    setBillingInfo((prev) => ({
      ...prev,
      isPremium: false,
      freeTrialUsed: true,
    }))
  }

  // コンポーネントマウント時に課金状態をチェック
  useEffect(() => {
    checkBillingStatus()

    // 毎日課金状態をチェック
    const interval = setInterval(checkBillingStatus, 24 * 60 * 60 * 1000)

    return () => clearInterval(interval)
  }, [billingInfo.nextBillingDate])

  return {
    billingInfo,
    isUpgradeDialogOpen,
    setIsUpgradeDialogOpen,
    handleUpgrade,
    handleCancelSubscription,
    checkBillingStatus,
  }
}
