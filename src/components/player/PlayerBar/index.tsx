import { memo, useMemo, useRef, useCallback } from 'react'
import { View, StyleSheet, TouchableOpacity, PanResponder } from 'react-native'
import { useKeyboard } from '@/utils/hooks'
import { navigations } from '@/navigation'
import commonState from '@/store/common/state'
import playerState from '@/store/player/state'
import { useTheme } from '@/store/theme/hook'
import { useSettingValue } from '@/store/setting/hook'
import { playNext, playPrev } from '@/core/player/player'
import { LIST_IDS } from '@/config/constant'

import Pic from './components/Pic'
import Title from './components/Title'
import PlayInfo, { PlayBarProgress } from './components/PlayInfo'
import ControlBtn from './components/ControlBtn'

const getCapsuleBg = (theme: LX.ActiveTheme) => {
  const bg = theme['c-content-background']
  if (bg && bg.startsWith('rgb(')) {
    return bg.replace('rgb(', 'rgba(').replace(')', ', 0.90)')
  }
  if (bg && bg.startsWith('#')) {
    let hex = bg.slice(1)
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('')
    const num = parseInt(hex, 16)
    return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, 0.90)`
  }
  return theme.isDark ? 'rgba(30, 32, 38, 0.90)' : 'rgba(255, 255, 255, 0.90)'
}

const getCapsuleBorder = (theme: LX.ActiveTheme) => {
  return theme.isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.65)'
}

export default memo(({ isHome = false, isFloating = true }: { isHome?: boolean, isFloating?: boolean }) => {
  const { keyboardShown } = useKeyboard()
  const theme = useTheme()
  const autoHidePlayBar = useSettingValue('common.autoHidePlayBar')

  const handleOpenDetail = useCallback(() => {
    const targetId = commonState.componentIds.songlistDetail ?? commonState.componentIds.home
    if (targetId) {
      navigations.pushPlayDetailScreen(targetId)
    }
  }, [])

  const handleLongPress = useCallback(() => {
    if (!isHome) return
    const listId = playerState.playMusicInfo.listId
    if (!listId || listId == LIST_IDS.DOWNLOAD) return
    global.app_event.jumpListPosition()
  }, [isHome])

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 12 || Math.abs(gestureState.dy) > 12
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 12 || Math.abs(gestureState.dy) > 12
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { dx, dy } = gestureState
        // 上滑轻扫（dy < -25）：唤起全屏播放页
        if (dy < -25 && Math.abs(dy) > Math.abs(dx)) {
          handleOpenDetail()
        } else if (dx > 35) {
          // 左右轻扫（dx > 35 或 dx < -35）：上一首 / 下一首
          void playPrev()
        } else if (dx < -35) {
          void playNext()
        } else if (dy < -25) {
          handleOpenDetail()
        }
      },
      onPanResponderTerminationRequest: () => true,
    })
  ).current

  const capsuleBg = useMemo(() => getCapsuleBg(theme), [theme])
  const capsuleBorder = useMemo(() => getCapsuleBorder(theme), [theme])

  const playerComponent = useMemo(() => {
    return (
      <View
        style={[
          isFloating ? styles.floatingOuter : styles.dockedContainer,
          isFloating ? { backgroundColor: capsuleBg } : { backgroundColor: theme['c-content-background'] },
        ]}
        {...panResponder.panHandlers}
      >
        <View
          style={[
            isFloating ? styles.floatingInner : styles.dockedInner,
            isFloating ? { borderColor: capsuleBorder } : null,
          ]}
        >
          <View style={styles.left}>
            <Pic isHome={isHome} />
          </View>
          <TouchableOpacity
            style={styles.center}
            onPress={handleOpenDetail}
            onLongPress={handleLongPress}
            activeOpacity={0.7}
          >
            <Title isHome={isHome} />
            <PlayInfo isHome={isHome} />
          </TouchableOpacity>
          <View style={styles.right}>
            <ControlBtn />
          </View>
          <PlayBarProgress isHome={isHome} />
        </View>
      </View>
    )
  }, [isFloating, capsuleBg, capsuleBorder, theme, panResponder.panHandlers, isHome, handleOpenDetail, handleLongPress])

  return autoHidePlayBar && keyboardShown ? null : playerComponent
})

const styles = StyleSheet.create({
  floatingOuter: {
    marginHorizontal: 12,
    marginBottom: 6,
    height: 56,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingInner: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 4,
  },
  dockedContainer: {
    width: '100%',
    height: 56,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    elevation: 10,
  },
  dockedInner: {
    flex: 1,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 4,
  },
  left: {
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    paddingLeft: 8,
    paddingRight: 4,
    height: '100%',
    justifyContent: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 0,
    flexShrink: 0,
  },
})
