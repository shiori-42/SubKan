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
import { validateEmail, validatePassword } from '@/utils'

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>
  onSwitchToRegister: () => void
  onSwitchToReset: () => void
  isLoading?: boolean
}

export function LoginForm({
  onLogin,
  onSwitchToRegister,
  onSwitchToReset,
  isLoading = false,
}: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async () => {
    setErrors({})

    // Validation using utility functions
    const emailError = validateEmail(formData.email)
    const passwordError = validatePassword(formData.password)

    const newErrors: Record<string, string> = {}
    if (emailError) newErrors.email = emailError
    if (passwordError) newErrors.password = passwordError

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      await onLogin(formData.email, formData.password)
    } catch (error) {
      setErrors({
        general:
          'ログインに失敗しました。メールアドレスとパスワードを確認してください。',
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
                サブカンにログイン
              </Text>
              <Text className="text-base text-gray-600 text-center mt-2">
                サブスクリプション管理を始めましょう
              </Text>
            </View>

            {/* Form */}
            <View className="gap-8">
              {errors.general && (
                <View className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <Text className="text-sm text-red-600">{errors.general}</Text>
                </View>
              )}

              <View className="gap-6">
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
                  placeholder="パスワードを入力"
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

                {/* Login Button */}
                <Button
                  title="ログイン"
                  onPress={handleSubmit}
                  variant="primary"
                  size="medium"
                  loading={isLoading}
                  disabled={isLoading}
                  className="mt-2"
                />
              </View>
            </View>

            {/* Actions */}
            <View className="gap-6 pt-4">
              <View className="items-center">
                <TouchableOpacity
                  onPress={onSwitchToReset}
                  disabled={isLoading}
                >
                  <Text className="text-sm text-gray-600">
                    パスワードを忘れた方は
                    <Text className="text-orange-500">こちら</Text>
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="border-t border-gray-200 pt-6 items-center">
                <View className="mb-2">
                  <Text className="text-sm text-gray-600 text-center">
                    アカウントをお持ちでない方
                  </Text>
                </View>
                <Button
                  title="新規登録"
                  onPress={onSwitchToRegister}
                  variant="secondary"
                  size="medium"
                  disabled={isLoading}
                  className="mt-2"
                />
              </View>
            </View>
          </Card>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
