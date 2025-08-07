import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { Mail, ArrowLeft } from 'lucide-react-native'
import { Button, InputField, Card } from '@/component/common'
import { validateEmail } from '@/utils'

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

  const handleSubmit = async () => {
    setErrors({})

    // Validation using utility function
    const emailError = validateEmail(email)
    if (emailError) {
      setErrors({ email: emailError })
      return
    }

    try {
      await onResetPassword(email)
      setIsSuccess(true)
    } catch (error) {
      setErrors({ general: 'パスワードリセットに失敗しました' })
    }
  }

  if (isSuccess) {
    return (
      <SafeAreaView className="flex-1 bg-orange-50">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
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
                <Mail
                  size={48}
                  style={{
                    color: '#f97316',
                    marginBottom: 16,
                  }}
                />
                <Text className="text-2xl font-bold text-gray-900 text-center">
                  パスワードリセット
                </Text>
                <Text className="text-base text-gray-600 text-center mt-2">
                  リセットメールを送信しました
                </Text>
              </View>

              {/* Success Message */}
              <View className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <Text className="text-sm text-green-800 leading-5">
                  {email} にパスワードリセット用のメールを送信しました。
                  {'\n'}
                  メール内のリンクをクリックしてパスワードを再設定してください。
                </Text>
              </View>

              {/* Back to Login Button */}
              <Button
                title="ログインに戻る"
                onPress={onBackToLogin}
                variant="secondary"
                size="medium"
                disabled={isLoading}
              />
            </Card>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-orange-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
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
              <Mail
                size={48}
                style={{
                  color: '#f97316',
                  marginBottom: 16,
                }}
              />
              <Text className="text-2xl font-bold text-gray-900 text-center">
                パスワードをリセット
              </Text>
              <Text className="text-base text-gray-600 text-center mt-2">
                登録済みのメールアドレスにリセット手順を送ります
              </Text>
            </View>

            {/* Form */}
            <View className="gap-6">
              {errors.general && (
                <View className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <Text className="text-sm text-red-600">{errors.general}</Text>
                </View>
              )}

              <View className="gap-4">
                {/* Email */}
                <InputField
                  label="メールアドレス"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="登録済みのメールアドレス"
                  icon={<Mail size={16} color="#9ca3af" />}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={errors.email}
                  disabled={isLoading}
                />

                {/* Submit Button */}
                <Button
                  title="送信"
                  onPress={handleSubmit}
                  variant="primary"
                  size="medium"
                  loading={isLoading}
                  disabled={isLoading}
                />
              </View>

              {/* Back to Login */}
              <View className="items-center pt-4">
                <TouchableOpacity
                  onPress={onBackToLogin}
                  className="flex-row items-center gap-2"
                  disabled={isLoading}
                >
                  <ArrowLeft size={16} color="#6b7280" />
                  <Text className="text-sm text-gray-600">ログインに戻る</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
