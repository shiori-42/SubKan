import React from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native'
import { LucideIcon } from 'lucide-react-native'

interface InputFieldProps {
  label?: string
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  icon?: LucideIcon
  secureTextEntry?: boolean
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  error?: string
  disabled?: boolean
  style?: ViewStyle
  inputStyle?: TextStyle
}

export function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  icon: Icon,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  error,
  disabled = false,
  style,
  inputStyle,
}: InputFieldProps) {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          autoComplete="off"
          textContentType="none"
          style={[
            styles.input,
            Icon && styles.inputWithIcon,
            inputStyle,
          ]}
          editable={!disabled}
        />
        {Icon && (
          <View style={styles.iconContainer}>
            <Icon size={16} color="#9ca3af" />
          </View>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingHorizontal: 16,
  },
  inputWithIcon: {
    paddingLeft: 44,
  },
  iconContainer: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: [{ translateY: -8 }],
    pointerEvents: 'none',
  },
  errorText: {
    fontSize: 14,
    color: '#dc2626',
    marginTop: 4,
  },
}) 