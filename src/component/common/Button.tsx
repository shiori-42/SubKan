import React from 'react'
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native'

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  loading?: boolean
  disabled?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  style?: ViewStyle
  textStyle?: TextStyle
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
}: ButtonProps) {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    (leftIcon || rightIcon) && styles.buttonWithIcon,
    style,
  ]

  const buttonTextStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ]

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? 'white' : '#1f2937'}
          size="small"
        />
      ) : (
        <>
          {leftIcon && (
            <Text style={[buttonTextStyle, styles.leftIcon]}>{leftIcon}</Text>
          )}
          <Text style={buttonTextStyle}>{title}</Text>
          {rightIcon && (
            <Text style={[buttonTextStyle, styles.rightIcon]}>{rightIcon}</Text>
          )}
        </>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
  },
  buttonWithIcon: {
    flexDirection: 'row',
  },
  // Variants
  primary: {
    backgroundColor: '#f97316',
    borderColor: '#f97316',
  },
  secondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderColor: '#d1d5db',
  },
  // Sizes
  small: {
    height: 36,
    paddingHorizontal: 16,
  },
  medium: {
    height: 48,
    paddingHorizontal: 24,
  },
  large: {
    height: 56,
    paddingHorizontal: 32,
  },
  // States
  disabled: {
    opacity: 0.5,
  },
  // Text styles
  text: {
    fontWeight: '500',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: '#1f2937',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  disabledText: {
    opacity: 0.5,
  },
  // Icon styles
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
})
