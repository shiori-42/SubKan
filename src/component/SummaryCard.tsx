import { View, Text, StyleSheet } from 'react-native'
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
    <View
      className="flex-1 bg-white/95 backdrop-blur-sm border-0 rounded-lg"
      style={styles.card}
    >
      {/* CardContentの役割 */}
      <View className="p-2 items-center mt-3">
        {icon}
        <Text className="text-xs text-gray-800 mt-1">{title}</Text>
        <Text className="text-sm sm:text-base font-bold text-gray-800">
          {value}
        </Text>
        <Text className="text-xs text-gray-800">{serviceCount}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
})

export default SummaryCard
