import React, { useState } from 'react'
import { View, SafeAreaView } from 'react-native'
import { TabNavigation } from '../component/TabNavigation'
import Header from '@/component/Header'
import ListView from './subscription/list'
import CalendarView from './subscription/calendar'
import { AnalyticsView } from './subscription/analytics'
import '../../global.css'

const Layout = (): React.JSX.Element => {
  const [activeTab, setActiveTab] = useState('list')

  const renderContent = () => {
    switch (activeTab) {
      case 'list':
        return <ListView />
      case 'calendar':
        return <CalendarView />
      case 'analytics':
        return <AnalyticsView />
      default:
        return <ListView />
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF7ED' }}>
      <View className="flex-1 p-4">
        {/* ヘッダー */}
        <Header />

        {/* タブナビゲーション */}
        <View>
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </View>

        {/* コンテンツ */}
        <View className="flex-1">{renderContent()}</View>
      </View>
    </SafeAreaView>
  )
}

export default Layout
