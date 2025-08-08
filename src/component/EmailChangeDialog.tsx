import React, { useState } from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
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
  console.log('EmailChangeDialog render - open:', open)

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
              <Mail size={24} color="#3b82f6" style={styles.headerIcon} />
              <Text style={styles.headerTitle}>メールアドレス変更</Text>
            </View>
            <TouchableOpacity onPress={handleCancel} style={styles.closeButton}>
              <X size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.instructionText}>
              新しいメールアドレスと現在のパスワードを入力してください
            </Text>

            {/* Current email */}
            <View style={styles.currentEmailBox}>
              <Text style={styles.currentEmailLabel}>現在のメールアドレス</Text>
              <Text style={styles.currentEmailText}>{currentEmail}</Text>
            </View>

            {/* New email */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>新しいメールアドレス</Text>
              <InputField
                placeholder="新しいメールアドレスを入力"
                value={newEmail}
                onChangeText={setNewEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                leftIcon={<Mail size={18} color="#6b7280" />}
              />
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>現在のパスワード</Text>
              <InputField
                placeholder="パスワードを入力"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                leftIcon={<Mail size={18} color="#6b7280" />}
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
  currentEmailBox: {
    backgroundColor: '#f9fafb',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 24,
  },
  currentEmailLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  currentEmailText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
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
