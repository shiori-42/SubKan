import React, { useState } from 'react'
import { View, SafeAreaView } from 'react-native'
import { TabNavigation } from '../component/TabNavigation'
import Header from '@/component/Header'
import ListView from './subscription/list'
import CalendarView from './subscription/calendar'
import { AnalyticsView } from './subscription/analytics'
import AddSubscriptionDialog from '@/component/AddSubscriptionDialog'
import { SettingsDialog } from '@/component/SettingsDialog'
import { EmailChangeDialog } from '@/component/EmailChangeDialog'
import { PasswordChangeDialog } from '@/component/PasswordChangeDialog'
import { AuthScreen } from '@/component/AuthScreen'
import { LoadingScreen } from '@/component/LoadingScreen'
import { LoadingProvider, useLoading } from '@/context/LoadingContext'
import { mockSubscriptions, Subscription } from '@/data/mockData'
import '../../global.css'

const LayoutContent = (): React.JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('list')
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)
  const [showEmailChangeDialog, setShowEmailChangeDialog] = useState(false)
  const [showPasswordChangeDialog, setShowPasswordChangeDialog] = useState(false)
  const [subscriptions, setSubscriptions] =
    useState<Subscription[]>(mockSubscriptions)
  const [currentEmail, setCurrentEmail] = useState('user@example.com')
  const { isLoading, loadingMessage } = useLoading()

  const handleAddPress = () => {
    setShowAddDialog(true)
  }

  const handleSettingsPress = () => {
    setShowSettingsDialog(true)
  }

  const handleAuthSuccess = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setShowSettingsDialog(false)
  }

  const handleEmailChange = (newEmail: string) => {
    setCurrentEmail(newEmail)
    // TODO: Implement actual email change logic
    console.log('Email changed to:', newEmail)
  }

  const handlePasswordChange = (currentPassword: string, newPassword: string) => {
    // TODO: Implement actual password change logic
    console.log('Password changed:', { currentPassword, newPassword })
  }

  const handleAddSubscription = (subscriptionData: any) => {
    const newSubscription: Subscription = {
      ...subscriptionData,
      id: Date.now().toString(),
      color: 'bg-gray-100 text-gray-800',
    }
    setSubscriptions((prev) => [...prev, newSubscription])
    setShowAddDialog(false)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'list':
        return (
          <ListView
            subscriptions={subscriptions}
            setSubscriptions={setSubscriptions}
          />
        )
      case 'calendar':
        return (
          <CalendarView
            subscriptions={subscriptions}
            setSubscriptions={setSubscriptions}
          />
        )
      case 'analytics':
        return <AnalyticsView subscriptions={subscriptions} />
      default:
        return (
          <ListView
            subscriptions={subscriptions}
            setSubscriptions={setSubscriptions}
          />
        )
    }
  }

  // ローディング中はローディング画面を表示
  if (isLoading) {
    return <LoadingScreen message={loadingMessage} />
  }

  // 認証されていない場合は認証画面を表示
  if (!isAuthenticated) {
    return <AuthScreen onAuthSuccess={handleAuthSuccess} />
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF7ED' }}>
      <View className="flex-1 p-4">
        {/* ヘッダー */}
        <Header
          onAddPress={handleAddPress}
          onSettingsPress={handleSettingsPress}
        />

        {/* タブナビゲーション */}
        <View>
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </View>

        {/* コンテンツ */}
        <View className="flex-1">{renderContent()}</View>

        {/* グローバルなサブスクリプション追加ダイアログ */}
        <AddSubscriptionDialog
          open={showAddDialog}
          onOpenChange={setShowAddDialog}
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
          editingSubscription={null}
          isEditing={false}
        />

        {/* 設定ダイアログ */}
        <SettingsDialog
          open={showSettingsDialog}
          onOpenChange={setShowSettingsDialog}
          onLogout={handleLogout}
          onEmailChange={() => setShowEmailChangeDialog(true)}
          onPasswordChange={() => setShowPasswordChangeDialog(true)}
          currentEmail={currentEmail}
        />

        {/* メールアドレス変更ダイアログ */}
        <EmailChangeDialog
          open={showEmailChangeDialog}
          onOpenChange={setShowEmailChangeDialog}
          currentEmail={currentEmail}
          onEmailChange={handleEmailChange}
        />

        {/* パスワード変更ダイアログ */}
        <PasswordChangeDialog
          open={showPasswordChangeDialog}
          onOpenChange={setShowPasswordChangeDialog}
          onPasswordChange={handlePasswordChange}
        />
      </View>
    </SafeAreaView>
  )
}

const Layout = (): React.JSX.Element => {
  return (
    <LoadingProvider>
      <LayoutContent />
    </LoadingProvider>
  )
}

export default Layout
