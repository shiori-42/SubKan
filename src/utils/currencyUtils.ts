// Currency formatting
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }).format(amount)
}

export const formatCurrencyWithoutSymbol = (amount: number): string => {
  return new Intl.NumberFormat('ja-JP').format(amount)
}

// Monthly calculation
export const calculateMonthlyAmount = (
  amount: number,
  cycle: 'monthly' | 'yearly' | 'weekly' | 'daily'
): number => {
  switch (cycle) {
    case 'monthly':
      return amount
    case 'yearly':
      return Math.round(amount / 12)
    case 'weekly':
      return Math.round(amount * 4.33) // Average weeks per month
    case 'daily':
      return Math.round(amount * 30.44) // Average days per month
    default:
      return amount
  }
}

// Total calculation
export const calculateTotalAmount = (subscriptions: Array<{ amount: number; cycle: string }>): number => {
  return subscriptions.reduce((total, subscription) => {
    return total + calculateMonthlyAmount(subscription.amount, subscription.cycle as any)
  }, 0)
}

// Category total calculation
export const calculateCategoryTotal = (
  subscriptions: Array<{ amount: number; cycle: string; category: string }>,
  category: string
): number => {
  const categorySubscriptions = subscriptions.filter(sub => sub.category === category)
  return calculateTotalAmount(categorySubscriptions)
}

// Percentage calculation
export const calculatePercentage = (part: number, total: number): number => {
  if (total === 0) return 0
  return Math.round((part / total) * 100)
} 