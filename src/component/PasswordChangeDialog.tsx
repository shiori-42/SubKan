import React, { useState } from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native'
import { X, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react-native'
import { Button, InputField } from '@/component/common'

interface PasswordChangeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onPasswordChange: (currentPassword: string, newPassword: string) => void
}

// Password change dialog component
export function PasswordChangeDialog({
  open,
  onOpenChange,
  onPasswordChange,
}: PasswordChangeDialogProps) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSave = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('すべての項目を入力してください')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('新しいパスワードが一致しません')
      return
    }

    if (newPassword.length < 8) {
      setError('パスワードは8文字以上で入力してください')
      return
    }

    if (currentPassword === newPassword) {
      setError(
        '新しいパスワードは現在のパスワードと異なるものを入力してください'
      )
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // TODO: Implement actual password change logic
      await onPasswordChange(currentPassword, newPassword)
      onOpenChange(false)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setError('パスワードの変更に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
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
              <Lock size={22} color="#3b82f6" className="mr-3" />
              <Text className="text-lg font-bold text-gray-800">パスワード変更</Text>
            </View>
            <TouchableOpacity onPress={handleCancel} className="p-1">
              <X size={18} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View className="p-4 space-y-4">
            <Text className="text-sm text-gray-600 leading-5">
              セキュリティを向上させるため、強力なパスワードを設定してください
            </Text>

            {/* Current password */}
            <View className="space-y-2">
              <Text className="text-sm font-medium text-gray-800">現在のパスワード</Text>
              <InputField
                placeholder="現在のパスワードを入力"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry={!showCurrentPassword}
                leftIcon={<Lock size={16} color="#6b7280" />}
                rightIcon={
                  <TouchableOpacity
                    onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={16} color="#6b7280" />
                    ) : (
                      <Eye size={16} color="#6b7280" />
                    )}
                  </TouchableOpacity>
                }
              />
            </View>

            {/* New password */}
            <View className="space-y-2">
              <Text className="text-sm font-medium text-gray-800">新しいパスワード</Text>
              <InputField
                placeholder="新しいパスワードを入力（8文字以上）"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
                leftIcon={<Lock size={16} color="#6b7280" />}
                rightIcon={
                  <TouchableOpacity
                    onPress={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff size={16} color="#6b7280" />
                    ) : (
                      <Eye size={16} color="#6b7280" />
                    )}
                  </TouchableOpacity>
                }
              />
            </View>

            {/* Confirm password */}
            <View className="space-y-2">
              <Text className="text-sm font-medium text-gray-800">新しいパスワード（確認）</Text>
              <InputField
                placeholder="新しいパスワードを再入力"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                leftIcon={<Lock size={16} color="#6b7280" />}
                rightIcon={
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} color="#6b7280" />
                    ) : (
                      <Eye size={16} color="#6b7280" />
                    )}
                  </TouchableOpacity>
                }
              />
            </View>

            {/* Password requirements */}
            <View className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <Text className="text-xs font-medium text-gray-700 mb-1">パスワード要件:</Text>
              <Text className="text-xs text-gray-600 mb-0.5">• 8文字以上</Text>
              <Text className="text-xs text-gray-600 mb-0.5">• 英数字を含む</Text>
              <Text className="text-xs text-gray-600">• 特殊文字を含む（推奨）</Text>
            </View>

            {/* Error message */}
            {error ? (
              <View className="flex-row items-center bg-red-50 p-3 rounded-lg border border-red-200">
                <AlertCircle
                  size={16}
                  color="#ef4444"
                  className="mr-2"
                />
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
