import { View, Text } from 'react-native'
import React from 'react'
import { Card } from '@/component/common'

interface SummaryCardProps {
  icon: React.ReactNode
  title: string
  value: string
  serviceCount: string
}

const SummaryCard = ({
  icon,
  title,
  value,
  serviceCount,
}: SummaryCardProps) => {
  return (
    <Card variant="elevated" padding="small" className="flex-1">
      {/* Card content with icon, title, value, and service count */}
      <View className="items-center">
        {icon}
        <Text className="text-xs text-gray-800 mt-1">{title}</Text>
        <Text className="text-sm sm:text-base font-bold text-gray-800">
          {value}
        </Text>
        <Text className="text-xs text-gray-800">{serviceCount}</Text>
      </View>
    </Card>
  )
}

export default SummaryCard
