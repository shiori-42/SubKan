// 1. View をインポートします
import { View, Text } from 'react-native'
import Header from '@/component/Header'

const List = (): React.JSX.Element => {
  return (
    // 2. View を SafeAreaView に変更します
    <View className="flex-1 bg-gray-100">
      <Header />
      <Text>List</Text>
    </View>
  )
}

export default List
