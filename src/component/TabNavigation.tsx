import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { CreditCard, Calendar, BarChart3 } from 'lucide-react-native'

interface TabNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    {
      id: 'list',
      label: 'サブスク管理',
      shortLabel: '管理',
      icon: CreditCard,
      activeBgColor: 'bg-orange-100',
      iconColor: '#f97316',
    },
    {
      id: 'calendar',
      label: 'カレンダー',
      shortLabel: '予定',
      icon: Calendar,
      activeBgColor: 'bg-pink-100',
      iconColor: '#ec4899',
    },
    {
      id: 'analytics',
      label: '分析',
      shortLabel: '分析',
      icon: BarChart3,
      activeBgColor: 'bg-purple-100',
      iconColor: '#a855f7',
    },
  ]

  return (
    <View className="bg-white/70 backdrop-blur-sm rounded-lg border border-gray-200">
      <View className="flex-row">
        {tabs.map((tab) => {
          const IconComponent = tab.icon
          const isActive = activeTab === tab.id

          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => onTabChange(tab.id)}
              className={`flex-1 py-3 px-2 items-center justify-center ${
                isActive ? tab.activeBgColor : 'bg-transparent'
              }`}
            >
              <IconComponent
                className="w-4 h-4 mb-1"
                color={isActive ? tab.iconColor : '#6b7280'}
              />
              <Text
                className={`text-xs font-medium ${
                  isActive ? 'text-gray-800' : 'text-gray-600'
                }`}
              >
                {tab.shortLabel}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}
