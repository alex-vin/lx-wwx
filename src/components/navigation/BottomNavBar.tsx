import { memo, useRef, useEffect, useCallback } from 'react'
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native'
import { useNavActiveId, useStatusbarHeight } from '@/store/common/hook'
import { setNavActiveId } from '@/core/common'
import { useTheme } from '@/store/theme/hook'
import { useI18n } from '@/lang'
import { useKeyboard } from '@/utils/hooks'
import { Icon } from '@/components/common/Icon'
import Text from '@/components/common/Text'
import { createStyle } from '@/utils/tools'
import type { NAV_ID_Type } from '@/config/constant'

interface TabItemConfig {
  id: NAV_ID_Type
  icon: string
}

const TAB_ITEMS: TabItemConfig[] = [
  { id: 'nav_songlist', icon: 'album' },
  { id: 'nav_top', icon: 'leaderboard' },
  { id: 'nav_love', icon: 'love' },
  { id: 'nav_search', icon: 'search-2' },
]

const TabButton = memo(({
  item,
  isActive,
  onPress,
}: {
  item: TabItemConfig
  isActive: boolean
  onPress: (id: NAV_ID_Type) => void
}) => {
  const t = useI18n()
  const theme = useTheme()
  const scaleAnim = useRef(new Animated.Value(isActive ? 1.08 : 1)).current

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isActive ? 1.08 : 1,
      useNativeDriver: true,
      friction: 6,
      tension: 100,
    }).start()
  }, [isActive, scaleAnim])

  const handlePress = () => {
    onPress(item.id)
  }

  const activeColor = theme['c-primary-font-active'] ?? theme['c-primary-font']
  const inactiveColor = theme['c-font-label']
  const capsuleBg = theme['c-primary-background'] ?? theme['c-primary-alpha-900']

  return (
    <TouchableOpacity
      style={styles.tabButton}
      onPress={handlePress}
      activeOpacity={0.7}
      hitSlop={{ top: 4, bottom: 4, left: 8, right: 8 }}
    >
      <Animated.View style={[styles.tabContent, { transform: [{ scale: scaleAnim }] }]}>
        <View
          style={[
            styles.iconCapsule,
            isActive && { backgroundColor: capsuleBg },
          ]}
        >
          <Icon
            name={item.icon}
            size={18}
            color={isActive ? activeColor : inactiveColor}
          />
        </View>
        <Text
          size={11}
          color={isActive ? activeColor : inactiveColor}
          style={[styles.tabLabel, isActive && styles.tabLabelActive]}
          numberOfLines={1}
        >
          {t(item.id)}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  )
})

const BottomNavBar = () => {
  const activeId = useNavActiveId()
  const theme = useTheme()
  const statusBarHeight = useStatusbarHeight()
  const { keyboardShown } = useKeyboard()

  const handlePress = useCallback((id: NAV_ID_Type) => {
    if (activeId !== id) {
      setNavActiveId(id)
    }
  }, [activeId])

  if (keyboardShown) return null

  // 适配底部安全区：在全面屏/手势导航设备上预留安全底边距
  const safeBottom = Math.max(statusBarHeight > 24 ? 12 : 6, 8)
  const navBg = theme['c-primary-light-1000-alpha-100'] ?? theme['c-content-background']
  const borderColor = theme['c-border-background'] ?? 'rgba(0, 0, 0, 0.06)'

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: navBg,
          borderTopColor: borderColor,
          paddingBottom: safeBottom,
        },
      ]}
    >
      {TAB_ITEMS.map(tab => (
        <TabButton
          key={tab.id}
          item={tab}
          isActive={activeId === tab.id}
          onPress={handlePress}
        />
      ))}
    </View>
  )
}

const styles = createStyle({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 6,
    borderTopWidth: StyleSheet.hairlineWidth,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCapsule: {
    paddingHorizontal: 16,
    paddingVertical: 3,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    marginTop: 2,
  },
  tabLabelActive: {
    fontWeight: 'bold',
  },
})

export default memo(BottomNavBar)
