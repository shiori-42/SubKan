import React, { useState } from 'react'
import { View, SafeAreaView } from 'react-native'
import { TabNavigation } from '../component/TabNavigation'
import Header from '@/component/Header'
import ListView from './subscription/list'
import CalendarView from './subscription/calendar'
import { AnalyticsView } from './subscription/analytics'
import AddSubscriptionDialog from '@/component/AddSubscriptionDialog'
import { SettingsDialog } from '@/component/SettingsDialog'
import { mockSubscriptions, Subscription } from '@/data/mockData'
import '../../global.css'

const Layout = (): React.JSX.Element => {
  const [activeTab, setActiveTab] = useState('list')
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)
  const [subscriptions, setSubscriptions] =
    useState<Subscription[]>(mockSubscriptions)

  const handleAddPress = () => {
    setShowAddDialog(true)
  }

  const handleSettingsPress = () => {
    setShowSettingsDialog(true)
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
        />
      </View>
    </SafeAreaView>
  )
}

export default Layout
