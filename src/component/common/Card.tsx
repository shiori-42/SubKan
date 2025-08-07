import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'

interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'elevated' | 'outlined'
  padding?: 'small' | 'medium' | 'large'
  style?: ViewStyle
}

export function Card({
  children,
  variant = 'default',
  padding = 'medium',
  style,
}: CardProps) {
  const cardStyle = [
    styles.base,
    styles[variant],
    styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
    style,
  ]

  return <View style={cardStyle}>{children}</View>
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 16,
  },
  // Variants
  default: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  elevated: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  outlined: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  // Padding sizes
  paddingSmall: {
    padding: 16,
  },
  paddingMedium: {
    padding: 32,
  },
  paddingLarge: {
    padding: 48,
  },
}) 