/**
 * Design Tokens
 * 严格 8pt 间距系统、同心圆角、分级阴影与语义化排版标尺
 */

/**
 * 严格 8pt 间距系统
 */
export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
} as const

export type SpacingKey = keyof typeof spacing

/**
 * 现代同心圆角系统
 */
export const borderRadius = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  '2xl': 24,
  full: 9999,
} as const

export type BorderRadiusKey = keyof typeof borderRadius

/**
 * 跨平台分级阴影系统
 * 支持 iOS (shadowColor, shadowOffset, shadowOpacity, shadowRadius) 与 Android (elevation)
 */
export interface ShadowLevel {
  shadowColor: string
  shadowOffset: { width: number, height: number }
  shadowOpacity: number
  shadowRadius: number
  elevation: number
}

export const shadows: Record<'level0' | 'level1' | 'level2' | 'level3', ShadowLevel> = {
  level0: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  level1: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  level2: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  level3: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
} as const

export type ShadowKey = keyof typeof shadows

/**
 * 语义化字阶标尺 (Typography Scale)
 * 配套 lineHeight 遵循黄金可读比例
 */
export interface TypographyToken {
  fontSize: number
  lineHeight: number
}

export const typography: Record<
  'titleDisplay' | 'titleMedium' | 'bodyLarge' | 'bodyMedium' | 'caption',
  TypographyToken
> = {
  titleDisplay: {
    fontSize: 24,
    lineHeight: 32,
  },
  titleMedium: {
    fontSize: 16,
    lineHeight: 22,
  },
  bodyLarge: {
    fontSize: 14,
    lineHeight: 20,
  },
  bodyMedium: {
    fontSize: 12,
    lineHeight: 16,
  },
  caption: {
    fontSize: 11,
    lineHeight: 14,
  },
} as const

export type TypographyVariant = keyof typeof typography

/**
 * 通用尺寸常量
 */
export const layout = {
  bottomBarHeight: 56,
  floatingPlayerHeight: 56,
  minTouchTarget: 44,
} as const

export const dimensions = layout
export const bottomBarHeight = 56
export const floatingPlayerHeight = 56
export const minTouchTarget = 44

/**
 * 完整 Design Tokens 集合
 */
export const tokens = {
  spacing,
  borderRadius,
  shadows,
  typography,
  layout,
  dimensions,
  bottomBarHeight,
  floatingPlayerHeight,
  minTouchTarget,
} as const

export const DesignTokens = tokens

export default tokens
