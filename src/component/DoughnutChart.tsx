import React from 'react'
import { View, Text } from 'react-native'
import Svg, { Circle, G } from 'react-native-svg'

interface DoughnutChartProps {
  data: Array<{
    category: string
    total: number
    percentage: number
  }>
  size?: number
  strokeWidth?: number
}

const categoryColors = {
  エンターテイメント: '#ec4899', // pink-500
  ビジネス: '#3b82f6', // blue-500
  クラウド: '#8b5cf6', // violet-500
  フィットネス: '#10b981', // emerald-500
  食品: '#f59e0b', // amber-500
  日用品: '#06b6d4', // cyan-500
  美容: '#ec4899', // pink-500
  その他: '#f97316', // orange-500
}

export function DoughnutChart({
  data,
  size = 200,
  strokeWidth = 20,
}: DoughnutChartProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const center = size / 2

  let currentAngle = -90 // 12時方向から開始

  return (
    <View className="items-center">
      {/* 影付きのコンテナ */}
      <View className="bg-white rounded-full p-2 shadow-md">
        <Svg width={size} height={size}>
          <G>
            {/* 背景円 - より柔らかい色 */}
            <Circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#f3f4f6"
              strokeWidth={strokeWidth}
              fill="transparent"
            />

            {/* データ円弧 - 境界を明確にするため小さな隙間を追加 */}
            {data.map((item, index) => {
              // 各セグメント間に2度の隙間を作る
              const gapAngle = 2
              const totalGaps = data.length
              const totalGapAngle = totalGaps * gapAngle
              const adjustedPercentage =
                (((item.percentage / 100) * (360 - totalGapAngle)) / 360) * 100

              const strokeDasharray = (adjustedPercentage / 100) * circumference
              const strokeDashoffset = circumference - strokeDasharray

              const color =
                categoryColors[item.category as keyof typeof categoryColors] ||
                categoryColors['その他']

              const element = (
                <Circle
                  key={index}
                  cx={center}
                  cy={center}
                  r={radius}
                  stroke={color}
                  strokeWidth={strokeWidth - 1}
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  transform={`rotate(${currentAngle} ${center} ${center})`}
                />
              )

              currentAngle += (adjustedPercentage / 100) * 360 + gapAngle
              return element
            })}
          </G>
        </Svg>
      </View>

      {/* 中央のテキスト */}
      <View
        className="absolute items-center justify-center"
        style={{ width: size, height: size }}
      >
        <Text className="text-lg font-bold text-gray-800">支出</Text>
        <Text className="text-sm text-gray-600">分析</Text>
      </View>

      {/* シンプルな凡例 */}
      <View className="mt-4 space-y-2">
        {data.map((item, index) => {
          const color =
            categoryColors[item.category as keyof typeof categoryColors] ||
            categoryColors['その他']
          return (
            <View key={index} className="flex-row items-center space-x-2">
              <View
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <Text className="text-sm text-gray-700">
                {item.category}: {item.percentage}%
              </Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}
