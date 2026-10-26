import { forwardRef } from 'react'
import {
  View,
  type ViewProps,
  type ViewStyle,
  StyleSheet,
} from 'react-native'
import { useTheme } from '@/store/theme/hook'
import { borderRadius as radiusTokens, shadows as shadowTokens, type ShadowKey } from '@/theme/tokens'

export interface GlassViewProps extends ViewProps {
  /**
   * 卡片圆角，默认为 DesignTokens.borderRadius.lg (14)
   */
  borderRadius?: number
  /**
   * 阴影层级，可选 'level0' | 'level1' | 'level2' | 'level3' | 'none'，默认为 'level1'
   */
  shadowLevel?: ShadowKey | 'none'
  /**
   * 边框宽度，默认为 0.8 (dp)
   */
  borderWidth?: number
  /**
   * 自定义边框颜色，默认根据深浅色主题自动适配精细高光描边
   */
  borderColor?: string
  /**
   * 自定义表面背景色，默认根据深浅色主题自动适配
   */
  backgroundColor?: string
  /**
   * 手动指定深色模式，未传时跟随当前应用主题
   */
  isDark?: boolean
  /**
   * 子组件
   */
  children?: React.ReactNode
}

/**
 * GlassView - 跨平台高性能毛玻璃/立体表面卡片组件
 * Android 端采用高通透度 Surface（暗色: rgba(30, 30, 32, 0.88) / 浅色: rgba(255, 255, 255, 0.9)）
 * 叠加 0.8dp 精细高光描边与硬件加速阴影，确保全机型 60fps 稳帧渲染。
 */
export const GlassView = forwardRef<View, GlassViewProps>((
  {
    borderRadius = radiusTokens.lg,
    shadowLevel = 'level1',
    borderWidth = 0.8,
    borderColor,
    backgroundColor,
    isDark: propIsDark,
    style,
    children,
    ...rest
  },
  ref,
) => {
  const theme = useTheme()
  const isDark = propIsDark ?? theme.isDark

  // 高通透度立体表面卡片背景
  const surfaceColor = backgroundColor ?? (
    isDark ? 'rgba(30, 30, 32, 0.88)' : 'rgba(255, 255, 255, 0.9)'
  )

  // 0.8dp 精细高光描边 (Highlight Stroke)
  const borderHighlightColor = borderColor ?? (
    isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.6)'
  )

  const shadowStyle: ViewStyle = (shadowLevel && shadowLevel !== 'none')
    ? shadowTokens[shadowLevel]
    : {}

  const cardStyle: ViewStyle = {
    backgroundColor: surfaceColor,
    borderWidth,
    borderColor: borderHighlightColor,
    borderRadius,
    ...shadowStyle,
  }

  return (
    <View
      ref={ref}
      style={StyleSheet.compose(cardStyle, style)}
      {...rest}
    >
      {children}
    </View>
  )
})

GlassView.displayName = 'GlassView'

export default GlassView
