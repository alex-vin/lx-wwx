import { memo, useCallback, useState, useMemo } from 'react'
import { View, StyleSheet } from 'react-native'
import { usePlayerMusicInfo, useProgress } from '@/store/player/hook'
import { useTheme } from '@/store/theme/hook'
import Text from '@/components/common/Text'
import { COMPONENT_IDS } from '@/config/constant'
import { usePageVisible } from '@/store/common/hook'
import { useBufferProgress } from '@/plugins/player'

// 第二行：歌手 · 专辑名（11sp 浅灰，透明度 0.65）
const PlayInfo = memo(({ isHome }: { isHome?: boolean }) => {
  const musicInfo = usePlayerMusicInfo()
  const theme = useTheme()

  const subtitle = useMemo(() => {
    if (!musicInfo.name && !musicInfo.id) return ''
    const parts = [musicInfo.singer, musicInfo.album].filter(Boolean)
    return parts.length ? parts.join(' · ') : (musicInfo.singer || '')
  }, [musicInfo.singer, musicInfo.album, musicInfo.name, musicInfo.id])

  return (
    <View style={styles.container}>
      <Text
        style={styles.subtitle}
        color={theme['c-font-label']}
        numberOfLines={1}
      >
        {subtitle}
      </Text>
    </View>
  )
})

// 贴合在胶囊底边弧线的 2dp 极细流光进度条
export const PlayBarProgress = memo(({ isHome }: { isHome?: boolean }) => {
  const theme = useTheme()
  const [autoUpdate, setAutoUpdate] = useState(true)
  const { progress } = useProgress(autoUpdate)
  const buffered = useBufferProgress()

  usePageVisible([COMPONENT_IDS.home], useCallback((visible) => {
    if (isHome) setAutoUpdate(visible)
  }, [isHome]))

  const progressPercent: `${number}%` = `${Math.min(Math.max(progress * 100, 0), 100)}%`
  const bufferedPercent: `${number}%` = `${Math.min(Math.max(buffered * 100, 0), 100)}%`

  return (
    <View style={progressStyles.container} pointerEvents="none">
      {/* Background track */}
      <View
        style={[
          progressStyles.track,
          {
            backgroundColor: theme.isDark
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(0, 0, 0, 0.06)',
          },
        ]}
      />
      {/* Buffered track */}
      <View
        style={[
          progressStyles.buffered,
          {
            width: bufferedPercent,
            backgroundColor: theme['c-primary-alpha-800'] ?? 'rgba(77, 175, 124, 0.25)',
          },
        ]}
      />
      {/* Luminous play progress bar */}
      <View
        style={[
          progressStyles.bar,
          {
            width: progressPercent,
            backgroundColor: theme['c-primary'],
            shadowColor: theme['c-primary'],
          },
        ]}
      >
        {/* Stream head highlight */}
        <View style={progressStyles.glowHead} />
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    marginTop: 2,
  },
  subtitle: {
    fontSize: 11,
    opacity: 0.65,
  },
})

const progressStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    overflow: 'hidden',
  },
  track: {
    ...StyleSheet.absoluteFillObject,
  },
  buffered: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
  },
  bar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 2,
  },
  glowHead: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 1,
  },
})

export default PlayInfo
