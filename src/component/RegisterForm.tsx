import React, { useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { CreditCard, Eye, EyeOff, Mail, Lock, User } from 'lucide-react-native'

interface RegisterFormProps {
  onRegister: (name: string, email: string, password: string) => Promise<void>
  onSwitchToLogin: () => void
  isLoading?: boolean
}

export function RegisterForm({
  onRegister,
  onSwitchToLogin,
  isLoading = false,
}: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async () => {
    setErrors({})

    // バリデーション
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) {
      newErrors.name = 'お名前を入力してください'
    }
    if (!formData.email) {
      newErrors.email = 'メールアドレスを入力してください'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください'
    }
    if (!formData.password) {
      newErrors.password = 'パスワードを入力してください'
    } else if (formData.password.length < 6) {
      newErrors.password = 'パスワードは6文字以上で入力してください'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'パスワードが一致しません'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      await onRegister(formData.name.trim(), formData.email, formData.password)
    } catch (error) {
      setErrors({
        general: '登録に失敗しました。しばらく時間をおいて再度お試しください。',
      })
    }
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-orange-50">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            padding: 16,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View
            className="w-full max-w-md rounded-2xl mx-auto"
            style={styles.card}
          >
            {/* ヘッダー */}
            <View style={styles.header}>
              <CreditCard
                size={48}
                style={{
                  color: '#f97316',
                  marginBottom: 16,
                }}
              />
              <Text style={styles.title}>サブカンに新規登録</Text>
              <Text style={styles.subtitle}>
                アカウントを登録してサブスク管理を始めましょう
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
                {/* お名前 */}
                <View className="space-y-2">
                  <Text style={styles.fieldLabel}>お名前</Text>
                  <View className="relative">
                    <TextInput
                      value={formData.name}
                      onChangeText={(text) =>
                        setFormData({ ...formData, name: text })
                      }
                      placeholder=""
                      placeholderTextColor="#9ca3af"
                      style={{
                        paddingLeft: 36,
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
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 flex-row items-center"
                      style={{ gap: 4 }}
                    >
                      <User className="w-4 h-4" style={{ color: '#9ca3af' }} />
                      <Text className="text-sm" style={{ color: '#9ca3af' }}>
                        山田太郎
                      </Text>
                    </View>
                  </View>
                  {errors.name && (
                    <Text className="text-sm text-red-600">{errors.name}</Text>
                  )}
                </View>

                {/* メールアドレス */}
                <View className="space-y-2">
                  <Text style={styles.fieldLabel}>メールアドレス</Text>
                  <View className="relative">
                    <TextInput
                      value={formData.email}
                      onChangeText={(text) =>
                        setFormData({ ...formData, email: text })
                      }
                      placeholder=""
                      placeholderTextColor="#9ca3af"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      style={{
                        paddingLeft: 36,
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
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 flex-row items-center"
                      style={{ gap: 4 }}
                    >
                      <Mail className="w-4 h-4" style={{ color: '#9ca3af' }} />
                      <Text className="text-sm" style={{ color: '#9ca3af' }}>
                        example@email.com
                      </Text>
                    </View>
                  </View>
                  {errors.email && (
                    <Text className="text-sm text-red-600">{errors.email}</Text>
                  )}
                </View>

                {/* パスワード */}
                <View className="space-y-2">
                  <Text style={styles.fieldLabel}>パスワード</Text>
                  <View className="relative">
                    <TextInput
                      value={formData.password}
                      onChangeText={(text) =>
                        setFormData({ ...formData, password: text })
                      }
                      placeholder=""
                      placeholderTextColor="#9ca3af"
                      secureTextEntry={!showPassword}
                      style={{
                        paddingLeft: 36,
                        paddingRight: 48,
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
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 flex-row items-center"
                      style={{ gap: 4 }}
                    >
                      <Lock className="w-4 h-4" style={{ color: '#9ca3af' }} />
                      <Text className="text-sm" style={{ color: '#9ca3af' }}>
                        6文字以上で入力
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 justify-center items-center"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff
                          className="w-4 h-4"
                          style={{ color: '#9ca3af' }}
                        />
                      ) : (
                        <Eye className="w-4 h-4" style={{ color: '#9ca3af' }} />
                      )}
                    </TouchableOpacity>
                  </View>
                  {errors.password && (
                    <Text className="text-sm text-red-600">
                      {errors.password}
                    </Text>
                  )}
                </View>

                {/* パスワード（確認） */}
                <View className="space-y-2">
                  <Text style={styles.fieldLabel}>パスワード（確認）</Text>
                  <View className="relative">
                    <TextInput
                      value={formData.confirmPassword}
                      onChangeText={(text) =>
                        setFormData({ ...formData, confirmPassword: text })
                      }
                      placeholder=""
                      placeholderTextColor="#9ca3af"
                      secureTextEntry={!showConfirmPassword}
                      style={{
                        paddingLeft: 36,
                        paddingRight: 48,
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
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 flex-row items-center"
                      style={{ gap: 4 }}
                    >
                      <Lock className="w-4 h-4" style={{ color: '#9ca3af' }} />
                      <Text className="text-sm" style={{ color: '#9ca3af' }}>
                        パスワードを再入力
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 justify-center items-center"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff
                          className="w-4 h-4"
                          style={{ color: '#9ca3af' }}
                        />
                      ) : (
                        <Eye className="w-4 h-4" style={{ color: '#9ca3af' }} />
                      )}
                    </TouchableOpacity>
                  </View>
                  {errors.confirmPassword && (
                    <Text className="text-sm text-red-600">
                      {errors.confirmPassword}
                    </Text>
                  )}
                </View>

                {/* 新規登録ボタン */}
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={styles.registerButton}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={styles.registerButtonText}>新規登録</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* ログインへの切り替え */}
            <View style={styles.actionsContainer}>
              <View style={styles.loginSection}>
                <View style={styles.loginTextContainer}>
                  <Text style={styles.loginText}>
                    すでにアカウントをお持ちの方
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={onSwitchToLogin}
                  style={styles.loginButton}
                  disabled={isLoading}
                >
                  <Text style={styles.loginButtonText}>ログイン</Text>
                </TouchableOpacity>
              </View>

              {/* 利用規約など */}
              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  新規登録することで、
                  <Text style={styles.orangeText}>利用規約</Text>
                  および
                  <Text style={styles.orangeText}>プライバシーポリシー</Text>
                  に同意したものとみなします。
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
    gap: 32,
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
  fieldsContainer: {
    gap: 24,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  registerButton: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f97316',
    borderRadius: 8,
    marginTop: 8,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  actionsContainer: {
    gap: 24,
    paddingTop: 16,
  },
  loginSection: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 24,
  },
  loginTextContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  loginText: {
    fontSize: 14,
    color: '#6b7280',
  },
  loginButton: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginTop: 8,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  termsContainer: {
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 18,
  },
  orangeText: {
    color: '#f97316',
  },
})
