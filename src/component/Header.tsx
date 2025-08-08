// Header component for the main app navigation
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { CreditCard, Settings, Bell } from 'lucide-react-native'

interface HeaderProps {
  onSettingsPress?: () => void
  onNotificationPress?: () => void
}

const Header = ({
  onSettingsPress,
  onNotificationPress,
}: HeaderProps): React.JSX.Element => {
  return (
    <View className="flex-row items-end justify-between p-4 h-[104px]">
      {/* Logo section */}
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
        {/* Notification button */}
        <Pressable
          onPress={onNotificationPress}
          className="bg-white/70 p-2 rounded-lg mr-2"
        >
          <Bell color="#6b7280" size={20} />
        </Pressable>
        {/* Settings button */}
        <Pressable
          onPress={onSettingsPress}
          className="bg-white/70 p-2 rounded-lg mr-2"
        >
          <Settings color="#6b7280" size={20} />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 12,
  },
})

export default Header
