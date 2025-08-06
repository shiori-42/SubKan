import React from 'react'
import { Redirect } from 'expo-router'
import 'expo-router/entry'

const Index = (): React.JSX.Element => {
  return <Redirect href="/subscription/analytics" />
}

export default Index
