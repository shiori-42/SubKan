import React, { useState } from 'react'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import { PasswordResetForm } from './PasswordResetForm'

interface AuthScreenProps {
  onAuthSuccess: () => void
}

export function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'reset'>(
    'login'
  )
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // ここで実際のログイン処理を実装
      console.log('ログイン処理:', { email, password })

      // モック処理（実際のAPI呼び出しに置き換える）
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // ログイン成功
      onAuthSuccess()
    } catch (error) {
      console.error('ログインエラー:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (
    name: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true)
    try {
      // ここで実際の新規登録処理を実装
      console.log('新規登録処理:', { name, email, password })

      // モック処理（実際のAPI呼び出しに置き換える）
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 登録成功後、ログイン状態にする
      onAuthSuccess()
    } catch (error) {
      console.error('新規登録エラー:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const handleSwitchToLogin = () => {
    setAuthMode('login')
  }

  const handleSwitchToRegister = () => {
    setAuthMode('register')
  }

  const handleSwitchToReset = () => {
    setAuthMode('reset')
  }

  const handleResetPassword = async (email: string) => {
    setIsLoading(true)
    try {
      // ここで実際のパスワードリセット処理を実装
      console.log('パスワードリセット処理:', { email })

      // モック処理（実際のAPI呼び出しに置き換える）
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // リセットメール送信成功
      console.log('リセットメール送信完了')
    } catch (error) {
      console.error('パスワードリセットエラー:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  switch (authMode) {
    case 'login':
      return (
        <LoginForm
          onLogin={handleLogin}
          onSwitchToRegister={handleSwitchToRegister}
          onSwitchToReset={handleSwitchToReset}
          isLoading={isLoading}
        />
      )
    case 'register':
      return (
        <RegisterForm
          onRegister={handleRegister}
          onSwitchToLogin={handleSwitchToLogin}
          isLoading={isLoading}
        />
      )
    case 'reset':
      return (
        <PasswordResetForm
          onResetPassword={handleResetPassword}
          onBackToLogin={handleSwitchToLogin}
          isLoading={isLoading}
        />
      )
    default:
      return (
        <LoginForm
          onLogin={handleLogin}
          onSwitchToRegister={handleSwitchToRegister}
          onSwitchToReset={handleSwitchToReset}
          isLoading={isLoading}
        />
      )
  }
}
