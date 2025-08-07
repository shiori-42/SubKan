import React, { useState } from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native'
import { X, Mail, AlertCircle } from 'lucide-react-native'
import { Button, InputField } from '@/component/common'

interface EmailChangeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentEmail: string
  onEmailChange: (newEmail: string) => void
}

// Email change dialog component
export function EmailChangeDialog({
  open,
  onOpenChange,
  currentEmail,
  onEmailChange,
}: EmailChangeDialogProps) {
  const [newEmail, setNewEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    if (!newEmail || !password) {
      setError('すべての項目を入力してください')
      return
    }

    if (newEmail === currentEmail) {
      setError('現在のメールアドレスと同じです')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newEmail)) {
      setError('有効なメールアドレスを入力してください')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // TODO: Implement actual email change logic
      await onEmailChange(newEmail)
      onOpenChange(false)
      setNewEmail('')
      setPassword('')
    } catch (err) {
      setError('メールアドレスの変更に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setNewEmail('')
    setPassword('')
    setError('')
    onOpenChange(false)
  }

  return (
    <Modal
      visible={open}
      transparent={true}
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <Pressable onPress={handleCancel} className="flex-1 justify-center items-center bg-black/60 p-4">
        <Pressable className="w-full max-w-sm bg-white rounded-xl shadow-lg">
          {/* Header */}
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
            <View className="flex-row items-center flex-1">
              <Mail size={22} color="#3b82f6" className="mr-3" />
              <Text className="text-lg font-bold text-gray-800">メールアドレス変更</Text>
            </View>
            <TouchableOpacity onPress={handleCancel} className="p-1">
              <X size={18} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View className="p-4 space-y-4">
            <Text className="text-sm text-gray-600 leading-5">
              新しいメールアドレスと現在のパスワードを入力してください
            </Text>

            {/* Current email */}
            <View className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <Text className="text-xs text-gray-600 mb-1">現在のメールアドレス</Text>
              <Text className="text-sm text-gray-800 font-medium">{currentEmail}</Text>
            </View>

            {/* New email */}
            <View className="space-y-2">
              <Text className="text-sm font-medium text-gray-800">新しいメールアドレス</Text>
              <InputField
                placeholder="新しいメールアドレスを入力"
                value={newEmail}
                onChangeText={setNewEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                leftIcon={<Mail size={16} color="#6b7280" />}
              />
            </View>

            {/* Password */}
            <View className="space-y-2">
              <Text className="text-sm font-medium text-gray-800">現在のパスワード</Text>
              <InputField
                placeholder="パスワードを入力"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                leftIcon={<Mail size={16} color="#6b7280" />}
              />
            </View>

            {/* Error message */}
            {error ? (
              <View className="flex-row items-center bg-red-50 p-3 rounded-lg border border-red-200">
                <AlertCircle size={16} color="#ef4444" className="mr-2" />
                <Text className="text-sm text-red-600 flex-1">{error}</Text>
              </View>
            ) : null}

            {/* Buttons */}
            <View className="flex-row space-x-3 mt-2">
              <TouchableOpacity
                onPress={handleCancel}
                className="flex-1 p-3 bg-gray-100 rounded-lg items-center"
                disabled={isLoading}
              >
                <Text className="text-base font-medium text-gray-700">キャンセル</Text>
              </TouchableOpacity>
              <Button
                title="変更する"
                onPress={handleSave}
                variant="primary"
                size="medium"
                loading={isLoading}
                disabled={isLoading}
              />
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}
