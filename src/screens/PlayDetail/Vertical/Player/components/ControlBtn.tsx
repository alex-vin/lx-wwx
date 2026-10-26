import { TouchableOpacity, View, Platform } from 'react-native'
import { Icon } from '@/components/common/Icon'
import { useTheme } from '@/store/theme/hook'
import { playNext, playPrev, togglePlay } from '@/core/player/player'
import { useIsPlay } from '@/store/player/hook'
import { createStyle } from '@/utils/tools'
import { useWindowSize } from '@/utils/hooks'
import { BTN_WIDTH } from './MoreBtn/Btn'
import { useMemo } from 'react'

const PrevBtn = ({ size }: { size: number }) => {
  const theme = useTheme()
  const handlePlayPrev = () => {
    void playPrev()
  }
  return (
    <TouchableOpacity
      style={{ ...styles.controlBtn, width: size, height: size }}
      activeOpacity={0.6}
      onPress={handlePlayPrev}
    >
      <Icon name="prevMusic" color={theme['c-button-font']} rawSize={size * 0.65} />
    </TouchableOpacity>
  )
}

const NextBtn = ({ size }: { size: number }) => {
  const theme = useTheme()
  const handlePlayNext = () => {
    void playNext()
  }
  return (
    <TouchableOpacity
      style={{ ...styles.controlBtn, width: size, height: size }}
      activeOpacity={0.6}
      onPress={handlePlayNext}
    >
      <Icon name="nextMusic" color={theme['c-button-font']} rawSize={size * 0.65} />
    </TouchableOpacity>
  )
}

const TogglePlayBtn = ({ size }: { size: number }) => {
  const theme = useTheme()
  const isPlay = useIsPlay()
  return (
    <TouchableOpacity
      style={{
        ...styles.playBtn,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: theme['c-primary'],
        ...Platform.select({
          ios: {
            shadowColor: theme['c-primary'],
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.35,
            shadowRadius: 8,
          },
          android: {
            elevation: 6,
          },
        }),
      }}
      activeOpacity={0.8}
      onPress={togglePlay}
    >
      <Icon
        name={isPlay ? 'pause' : 'play'}
        color="#fff"
        rawSize={size * 0.48}
        style={!isPlay ? styles.playIconOffset : undefined}
      />
    </TouchableOpacity>
  )
}

const MAX_SIZE = BTN_WIDTH * 1.6
const MIN_SIZE = BTN_WIDTH * 1.2

export default () => {
  const winSize = useWindowSize()
  const maxHeight = Math.max(winSize.height * 0.12, MIN_SIZE * 1.2)
  const containerStyle = useMemo(() => {
    return {
      ...styles.container,
      maxHeight,
    }
  }, [maxHeight])
  const baseSize = Math.min(Math.max(winSize.width * 0.33 * global.lx.fontSize * 0.4, MIN_SIZE), MAX_SIZE, maxHeight)

  const sideBtnSize = Math.round(baseSize * 0.82)
  const playBtnSize = Math.round(baseSize * 1.22)

  return (
    <View style={containerStyle}>
      <PrevBtn size={sideBtnSize} />
      <TogglePlayBtn size={playBtnSize} />
      <NextBtn size={sideBtnSize} />
    </View>
  )
}

const styles = createStyle({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 1,
    paddingHorizontal: '6%',
    paddingVertical: 18,
  },
  controlBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  playBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIconOffset: {
    marginLeft: 3,
  },
})
