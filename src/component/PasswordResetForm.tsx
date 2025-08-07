import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { Mail, ArrowLeft, CreditCard } from 'lucide-react-native'

interface PasswordResetFormProps {
  onResetPassword: (email: string) => Promise<void>
  onBackToLogin: () => void
  isLoading?: boolean
}

export function PasswordResetForm({
  onResetPassword,
  onBackToLogin,
  isLoading = false,
}: PasswordResetFormProps) {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<{ email?: string; general?: string }>({})
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = () => {
    const newErrors: { email?: string } = {}

    if (!email) {
      newErrors.email = 'メールアドレスを入力してください'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = '有効なメールアドレスを入力してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    try {
      await onResetPassword(email)
      setIsSuccess(true)
    } catch (error) {
      setErrors({ general: 'パスワードリセットに失敗しました' })
    }
  }

  if (isSuccess) {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.card}>
              {/* ヘッダー */}
              <View style={styles.header}>
                <Mail
                  size={48}
                  style={{
                    color: '#f97316',
                    marginBottom: 16,
                  }}
                />
                <Text style={styles.title}>パスワードリセット</Text>
                <Text style={styles.subtitle}>
                  リセットメールを送信しました
                </Text>
              </View>

              {/* 成功メッセージ */}
              <View style={styles.successContainer}>
                <Text style={styles.successText}>
                  {email} にパスワードリセット用のメールを送信しました。
                  {'\n'}
                  メール内のリンクをクリックしてパスワードを再設定してください。
                </Text>
              </View>

              {/* ログインに戻るボタン */}
              <TouchableOpacity
                onPress={onBackToLogin}
                style={styles.backButton}
                disabled={isLoading}
              >
                <Text style={styles.backButtonText}>ログインに戻る</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            {/* ヘッダー */}
            <View style={styles.header}>
              <Mail
                size={48}
                style={{
                  color: '#f97316',
                  marginBottom: 16,
                }}
              />
              <Text style={styles.title}>パスワードをリセット</Text>
              <Text style={styles.subtitle}>
                登録済みのメールアドレスにリセット手順を送ります
              </Text>
            </View>

            {/* フォーム */}
            <View style={styles.formContainer}>
              {errors.general && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{errors.general}</Text>
                </View>
              )}

              <View style={styles.fieldsContainer}>
                {/* メールアドレス */}
                <View className="space-y-2">
                  <Text style={styles.fieldLabel}>メールアドレス</Text>
                  <View className="relative">
                    <TextInput
                      value={email}
                      onChangeText={setEmail}
                      placeholder="登録済みのメールアドレス"
                      placeholderTextColor="#9ca3af"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoComplete="off"
                      textContentType="none"
                      style={{
                        paddingLeft: 44,
                        height: 48,
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: 8,
                        fontSize: 16,
                        borderWidth: 1,
                        borderColor: '#d1d5db',
                      }}
                      editable={!isLoading}
                    />
                    <View
                      className="absolute left-3 top-1/2 transform -translate-y-1/2"
                      style={{ pointerEvents: 'none' }}
                    >
                      <Mail className="w-4 h-4" style={{ color: '#9ca3af' }} />
                    </View>
                  </View>
                  {errors.email && (
                    <Text className="text-sm text-red-600">{errors.email}</Text>
                  )}
                </View>
              </View>

              {/* リセットボタン */}
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.resetButton}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.resetButtonText}>
                    リセットメールを送信
                  </Text>
                )}
              </TouchableOpacity>

              {/* ログインに戻る */}
              <View style={styles.actionsContainer}>
                <TouchableOpacity
                  onPress={onBackToLogin}
                  style={styles.backToLoginButton}
                  disabled={isLoading}
                >
                  <ArrowLeft className="w-4 h-4" style={{ color: '#6b7280' }} />
                  <Text style={styles.backToLoginText}>ログインに戻る</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7ed',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    padding: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
  },
  formContainer: {
    gap: 24,
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 8,
    padding: 16,
  },
  errorText: {
    fontSize: 14,
    color: '#dc2626',
  },
  successContainer: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  successText: {
    fontSize: 14,
    color: '#166534',
    lineHeight: 20,
  },
  fieldsContainer: {
    gap: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  resetButton: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f97316',
    borderRadius: 8,
    marginTop: 8,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  backButton: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  actionsContainer: {
    alignItems: 'center',
    paddingTop: 16,
  },
  backToLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backToLoginText: {
    fontSize: 14,
    color: '#6b7280',
  },
})
