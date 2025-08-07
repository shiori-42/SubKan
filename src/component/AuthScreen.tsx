import React, { useState } from 'react'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import { PasswordResetForm } from './PasswordResetForm'
import { useLoading } from '@/context/LoadingContext'

interface AuthScreenProps {
  onAuthSuccess: () => void
}

export function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'reset'>(
    'login'
  )
  const { showLoading, hideLoading } = useLoading()

  const handleLogin = async (email: string, password: string) => {
    showLoading('ログイン中...')
    try {
      // ここで実際のログイン処理を実装
      console.log('ログイン処理:', { email, password })

      // モック処理（実際のAPI呼び出しに置き換える）
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // ログイン成功
      onAuthSuccess()
    } catch (error) {
      console.error('ログインエラー:', error)
      throw error
    } finally {
      hideLoading()
    }
  }

  const handleRegister = async (email: string, password: string) => {
    showLoading('新規登録中...')
    try {
      // ここで実際の新規登録処理を実装
      console.log('新規登録処理:', { email, password })

      // モック処理（実際のAPI呼び出しに置き換える）
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // 登録成功後、ログイン状態にする
      onAuthSuccess()
    } catch (error) {
      console.error('新規登録エラー:', error)
      throw error
    } finally {
      hideLoading()
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
    showLoading('リセットメール送信中...')
    try {
      // ここで実際のパスワードリセット処理を実装
      console.log('パスワードリセット処理:', { email })

      // モック処理（実際のAPI呼び出しに置き換える）
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // リセットメール送信成功
      console.log('リセットメール送信完了')
    } catch (error) {
      console.error('パスワードリセットエラー:', error)
      throw error
    } finally {
      hideLoading()
    }
  }

  switch (authMode) {
    case 'login':
      return (
        <LoginForm
          onLogin={handleLogin}
          onSwitchToRegister={handleSwitchToRegister}
          onSwitchToReset={handleSwitchToReset}
          isLoading={false}
        />
      )
    case 'register':
      return (
        <RegisterForm
          onRegister={handleRegister}
          onSwitchToLogin={handleSwitchToLogin}
          isLoading={false}
        />
      )
    case 'reset':
      return (
        <PasswordResetForm
          onResetPassword={handleResetPassword}
          onBackToLogin={handleSwitchToLogin}
          isLoading={false}
        />
      )
    default:
      return (
        <LoginForm
          onLogin={handleLogin}
          onSwitchToRegister={handleSwitchToRegister}
          onSwitchToReset={handleSwitchToReset}
          isLoading={false}
        />
      )
  }
}
