// src/component/Header.tsx
import { View, Text, StyleSheet } from 'react-native' // StyleSheetをインポート
import { CreditCard } from 'lucide-react-native'

const Header = (): React.JSX.Element => {
  return (
    <View className="flex-row items-center justify-between mb-4 sm:mb-6 p-4 h-[104px]">
      <View className="flex-row items-center">
        <CreditCard
          color="#f97316" // "text-orange-500" の色
          size={28}
          style={styles.icon} // "mr-3" のスタイル
        />
        <View>
          <Text className="text-2xl font-bold text-gray-800">サブカン</Text>
          <Text className="text-sm sm:text-base text-gray-600">
            サブスクリプションを賢く管理
          </Text>
        </View>
      </View>
      <View>{/* ここにボタンなどを追加していく */}</View>
    </View>
  )
}

// アイコンのスタイルを定義
const styles = StyleSheet.create({
  icon: {
    marginRight: 12, // Tailwindの mr-3 は 12px
  },
})

export default Header
