// Authentication types
export interface AuthUser {
  id: string
  email: string
  name?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
}

// Subscription types
export interface Subscription {
  id: string
  name: string
  category: string
  amount: number
  cycle: 'monthly' | 'yearly' | 'weekly' | 'daily'
  nextPayment: Date
  cancelDeadline?: Date
  color: string
  notes?: string
}

export interface SubscriptionFormData {
  name: string
  category: string
  amount: string
  cycle: 'monthly' | 'yearly' | 'weekly' | 'daily'
  nextPayment: Date
  cancelDeadline?: Date
  notes?: string
}

// Category types
export interface Category {
  name: string
  color: string
  totalAmount: number
  subscriptionCount: number
}

// Navigation types
export type TabType = 'list' | 'calendar' | 'analytics'

// Form validation types
export interface FormErrors {
  [key: string]: string
}

// Loading types
export interface LoadingState {
  isLoading: boolean
  message: string
}

// Settings types
export interface NotificationSettings {
  paymentReminder: boolean
  paymentReminderDays: string
  cancelReminder: boolean
  cancelReminderDays: string
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// Component props types
export interface BaseComponentProps {
  style?: React.ComponentProps<any>['style']
  children?: React.ReactNode
}

// Modal types
export interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}
