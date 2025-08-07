import { format, addMonths, addWeeks, addDays, isWeekend } from 'date-fns'
import { ja } from 'date-fns/locale'

// Date formatting
export const formatDate = (
  date: Date,
  formatStr: string = 'yyyy/MM/dd'
): string => {
  return format(date, formatStr, { locale: ja })
}

export const formatDateWithDay = (date: Date): string => {
  return format(date, 'M月d日 (E)', { locale: ja })
}

export const formatMonth = (date: Date): string => {
  return format(date, 'yyyy年M月', { locale: ja })
}

// Days until calculation
export const getDaysUntil = (date: Date): number => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const targetDate = new Date(date)
  targetDate.setHours(0, 0, 0, 0)
  const diffTime = targetDate.getTime() - today.getTime()
  return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))
}

// Next payment date calculation
export const calculateNextPayment = (
  currentDate: Date,
  cycle: 'monthly' | 'yearly' | 'weekly' | 'daily'
): Date => {
  switch (cycle) {
    case 'monthly':
      return addMonths(currentDate, 1)
    case 'yearly':
      return addMonths(currentDate, 12)
    case 'weekly':
      return addWeeks(currentDate, 1)
    case 'daily':
      return addDays(currentDate, 1)
    default:
      return addMonths(currentDate, 1)
  }
}

// Weekend check
export const isWeekendDay = (date: Date): boolean => {
  return isWeekend(date)
}

// Date comparison
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return format(date1, 'yyyy-MM-dd') === format(date2, 'yyyy-MM-dd')
}

export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date())
}

export const isPast = (date: Date): boolean => {
  return date < new Date()
}

export const isFuture = (date: Date): boolean => {
  return date > new Date()
}

// Date range
export const getMonthRange = (date: Date): { start: Date; end: Date } => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1)
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  return { start, end }
}

export const getWeekRange = (date: Date): { start: Date; end: Date } => {
  const day = date.getDay()
  const start = new Date(date)
  start.setDate(date.getDate() - day)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  return { start, end }
}
