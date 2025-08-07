import React from 'react'
import { Pressable, Text } from 'react-native'

interface ActionButtonProps {
  title: string
  onPress: () => void
  variant: 'edit' | 'delete'
  icon: React.ReactNode
}

// Common action button component for edit and delete actions
export function ActionButton({
  title,
  onPress,
  variant,
  icon,
}: ActionButtonProps) {
  const buttonStyles = {
    edit: 'flex-1 bg-gray-100 items-center justify-center py-3 px-4 rounded-xl flex-row',
    delete:
      'flex-1 bg-red-50 items-center justify-center py-3 px-4 rounded-xl flex-row',
  }

  const textStyles = {
    edit: 'text-sm font-medium text-gray-700',
    delete: 'text-sm font-medium text-red-600',
  }

  return (
    <Pressable className={buttonStyles[variant]} onPress={onPress}>
      {React.cloneElement(icon as React.ReactElement, {
        style: { marginRight: 8 },
      })}
      <Text className={textStyles[variant]}>{title}</Text>
    </Pressable>
  )
}
