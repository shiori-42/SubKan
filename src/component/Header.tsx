// src/component/Header.tsx
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { CreditCard, Settings, Plus } from 'lucide-react-native'

interface HeaderProps {
  onAddPress?: () => void
  onSettingsPress?: () => void
}

const Header = ({
  onAddPress,
  onSettingsPress,
}: HeaderProps): React.JSX.Element => {
  return (
    <View className="flex-row items-end justify-between p-4 h-[104px]">
      {/* ロゴ部分 */}
      <View className="flex-row items-center">
        <CreditCard color="#f97316" size={28} style={styles.icon} />
        <View>
          <Text className="text-2xl font-bold text-gray-800">サブカン</Text>
          <Text className="text-sm sm:text-base text-gray-600">
            サブスクリプションを賢く管理
          </Text>
        </View>
      </View>
      <View className="flex-row space-x-2">
        {/* 設定ボタン */}
        <Pressable
          className="bg-white/70 p-2 rounded-lg mr-2"
          onPress={onSettingsPress}
        >
          <Settings color="#374151" size={20} />
        </Pressable>
        {/* 追加ボタン */}
        <Pressable
          className="bg-orange-400 rounded-lg flex-row items-center"
          style={styles.addButton}
          onPress={onAddPress}
        >
          <Plus color="white" size={20} style={styles.plusIcon} />
          <Text className="text-white" style={styles.addButtonText}>
            追加
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 12,
  },
  plusIcon: {
    marginRight: 4,
  },
  addButton: {
    minWidth: 80,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
})

export default Header
