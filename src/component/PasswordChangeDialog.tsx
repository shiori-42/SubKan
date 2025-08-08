import React, { useState } from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
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
  console.log('PasswordChangeDialog render - open:', open)

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
      <Pressable
        onPress={handleCancel}
        className="flex-1 justify-center items-center bg-black/60 p-4"
      >
        <Pressable
          style={styles.dialogContainer}
          className="bg-white rounded-xl shadow-lg"
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Lock size={24} color="#3b82f6" style={styles.headerIcon} />
              <Text style={styles.headerTitle}>パスワード変更</Text>
            </View>
            <TouchableOpacity onPress={handleCancel} style={styles.closeButton}>
              <X size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.instructionText}>
              新しいパスワードを入力してください
            </Text>

            {/* Current password */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>現在のパスワード</Text>
              <InputField
                placeholder="現在のパスワードを入力"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry={!showCurrentPassword}
                leftIcon={<Lock size={18} color="#6b7280" />}
                rightIcon={
                  <TouchableOpacity
                    onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={18} color="#6b7280" />
                    ) : (
                      <Eye size={18} color="#6b7280" />
                    )}
                  </TouchableOpacity>
                }
              />
            </View>

            {/* New password */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>新しいパスワード</Text>
              <InputField
                placeholder="新しいパスワードを入力（8文字以上）"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
                leftIcon={<Lock size={18} color="#6b7280" />}
                rightIcon={
                  <TouchableOpacity
                    onPress={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff size={18} color="#6b7280" />
                    ) : (
                      <Eye size={18} color="#6b7280" />
                    )}
                  </TouchableOpacity>
                }
              />
            </View>

            {/* Confirm password */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>新しいパスワード（確認）</Text>
              <InputField
                placeholder="新しいパスワードを再入力"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                leftIcon={<Lock size={18} color="#6b7280" />}
                rightIcon={
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} color="#6b7280" />
                    ) : (
                      <Eye size={18} color="#6b7280" />
                    )}
                  </TouchableOpacity>
                }
              />
            </View>

            {/* Error message */}
            {error ? (
              <View style={styles.errorContainer}>
                <AlertCircle
                  size={18}
                  color="#ef4444"
                  style={styles.errorIcon}
                />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleCancel}
                style={styles.cancelButton}
                disabled={isLoading}
              >
                <Text style={styles.cancelButtonText}>キャンセル</Text>
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

const styles = StyleSheet.create({
  dialogContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  instructionText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
    marginBottom: 20,
  },
  errorIcon: {
    marginRight: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#dc2626',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
})
