import { FormErrors } from '@/types'

// Email validation
export const validateEmail = (email: string): string | null => {
  if (!email) {
    return 'メールアドレスを入力してください'
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return '有効なメールアドレスを入力してください'
  }
  
  return null
}

// Password validation
export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'パスワードを入力してください'
  }
  
  if (password.length < 6) {
    return 'パスワードは6文字以上で入力してください'
  }
  
  return null
}

// Confirm password validation
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | null => {
  if (!confirmPassword) {
    return 'パスワード（確認）を入力してください'
  }
  
  if (password !== confirmPassword) {
    return 'パスワードが一致しません'
  }
  
  return null
}

// Required field validation
export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || !value.trim()) {
    return `${fieldName}を入力してください`
  }
  
  return null
}

// Amount validation
export const validateAmount = (amount: string): string | null => {
  if (!amount) {
    return '金額を入力してください'
  }
  
  const numAmount = parseFloat(amount)
  if (isNaN(numAmount) || numAmount <= 0) {
    return '有効な金額を入力してください'
  }
  
  return null
}

// Date validation
export const validateDate = (date: Date | undefined, fieldName: string): string | null => {
  if (!date) {
    return `${fieldName}を選択してください`
  }
  
  if (date < new Date()) {
    return `${fieldName}は未来の日付を選択してください`
  }
  
  return null
}

// Form validation helper
export const validateForm = (
  data: Record<string, any>,
  validators: Record<string, (value: any) => string | null>
): FormErrors => {
  const errors: FormErrors = {}
  
  Object.keys(validators).forEach((field) => {
    const validator = validators[field]
    const value = data[field]
    const error = validator(value)
    
    if (error) {
      errors[field] = error
    }
  })
  
  return errors
} 