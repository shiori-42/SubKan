import React, { useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { CreditCard, Eye, EyeOff, Mail, Lock } from 'lucide-react-native'
import { Button, InputField, Card } from '@/component/common'
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '@/utils'

interface RegisterFormProps {
  onRegister: (email: string, password: string) => Promise<void>
  onSwitchToLogin: () => void
  isLoading?: boolean
}

export function RegisterForm({
  onRegister,
  onSwitchToLogin,
  isLoading = false,
}: RegisterFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async () => {
    setErrors({})

    // Validation using utility functions
    const emailError = validateEmail(formData.email)
    const passwordError = validatePassword(formData.password)
    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    )

    const newErrors: Record<string, string> = {}
    if (emailError) newErrors.email = emailError
    if (passwordError) newErrors.password = passwordError
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      await onRegister(formData.email, formData.password)
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
          <Card
            variant="elevated"
            padding="large"
            className="w-full max-w-md mx-auto"
          >
            {/* Header */}
            <View className="items-center mb-8">
              <CreditCard
                size={48}
                style={{
                  color: '#f97316',
                  marginBottom: 16,
                }}
              />
              <Text className="text-2xl font-bold text-gray-900 text-center">
                サブカンに新規登録
              </Text>
              <Text className="text-base text-gray-600 text-center mt-2">
                アカウントを登録してサブスク管理を始めましょう
              </Text>
            </View>

            {/* Form */}
            <View className="gap-8">
              {errors.general && (
                <View className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <Text className="text-sm text-red-600">{errors.general}</Text>
                </View>
              )}

              <View className="gap-4">
                {/* Email */}
                <InputField
                  label="メールアドレス"
                  value={formData.email}
                  onChangeText={(text) =>
                    setFormData({ ...formData, email: text })
                  }
                  placeholder="example@email.com"
                  icon={<Mail size={16} color="#9ca3af" />}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={errors.email}
                  disabled={isLoading}
                />

                {/* Password */}
                <InputField
                  label="パスワード"
                  value={formData.password}
                  onChangeText={(text) =>
                    setFormData({ ...formData, password: text })
                  }
                  placeholder="6文字以上で入力"
                  icon={<Lock size={16} color="#9ca3af" />}
                  secureTextEntry={!showPassword}
                  error={errors.password}
                  disabled={isLoading}
                  rightIcon={
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff size={16} color="#9ca3af" />
                      ) : (
                        <Eye size={16} color="#9ca3af" />
                      )}
                    </TouchableOpacity>
                  }
                />

                {/* Confirm Password */}
                <InputField
                  label="パスワード（確認）"
                  value={formData.confirmPassword}
                  onChangeText={(text) =>
                    setFormData({ ...formData, confirmPassword: text })
                  }
                  placeholder="パスワードを再入力"
                  icon={<Lock size={16} color="#9ca3af" />}
                  secureTextEntry={!showConfirmPassword}
                  error={errors.confirmPassword}
                  disabled={isLoading}
                  rightIcon={
                    <TouchableOpacity
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={16} color="#9ca3af" />
                      ) : (
                        <Eye size={16} color="#9ca3af" />
                      )}
                    </TouchableOpacity>
                  }
                />

                {/* Register Button */}
                <Button
                  title="新規登録"
                  onPress={handleSubmit}
                  variant="primary"
                  size="medium"
                  loading={isLoading}
                  disabled={isLoading}
                />
              </View>
            </View>

            {/* Actions */}
            <View className="gap-6 pt-4">
              <View className="border-t border-gray-200 pt-6">
                <View className="items-center mb-2">
                  <Text className="text-sm text-gray-600">
                    すでにアカウントをお持ちの方
                  </Text>
                </View>
                <Button
                  title="ログイン"
                  onPress={onSwitchToLogin}
                  variant="secondary"
                  size="medium"
                  disabled={isLoading}
                />
              </View>

              {/* Terms */}
              <View className="items-center">
                <Text className="text-xs text-gray-600 text-center leading-5">
                  新規登録することで、
                  <Text className="text-orange-500">利用規約</Text>
                  および
                  <Text className="text-orange-500">プライバシーポリシー</Text>
                  に同意したものとみなします。
                </Text>
              </View>
            </View>
          </Card>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
