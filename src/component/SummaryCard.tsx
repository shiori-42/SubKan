import { View, Text } from 'react-native'
import React from 'react'

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
    // Cardの役割をViewが担う。flex-1で均等に広がるようにする
    <View className="flex-1 bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-lg">
      {/* CardContentの役割 */}
      <View className="p-2 items-center mt-3">
        {icon}
        <Text className="text-xs text-gray-600 mt-1">{title}</Text>
        <Text className="text-sm sm:text-base font-bold text-gray-800">
          {value}
        </Text>
        <Text className="text-xs text-gray-500">{serviceCount}</Text>
      </View>
    </View>
  )
}

export default SummaryCard
