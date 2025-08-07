import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { CreditCard } from 'lucide-react-native'

interface LoadingScreenProps {
  message?: string
}

export function LoadingScreen({
  message = '読み込み中...',
}: LoadingScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <CreditCard size={64} style={styles.icon} />
        <Text style={styles.text}>{message}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7ed',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    color: '#f97316',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
  },
})
