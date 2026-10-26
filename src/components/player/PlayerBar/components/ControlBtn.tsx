import { memo } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Icon } from '@/components/common/Icon'
import { useIsPlay } from '@/store/player/hook'
import { useTheme } from '@/store/theme/hook'
import { playNext, playPrev, togglePlay } from '@/core/player/player'

const handlePlayPrev = () => {
  void playPrev()
}
const handlePlayNext = () => {
  void playNext()
}
const handleTogglePlay = () => {
  void togglePlay()
}

const ControlButton = memo(({
  onPress,
  iconName,
  size = 20,
}: {
  onPress: () => void
  iconName: string
  size?: number
}) => {
  const theme = useTheme()

  return (
    <Pressable
      style={({ pressed }) => [
        styles.controlBtn,
        pressed && styles.controlBtnPressed,
      ]}
      hitSlop={{ top: 6, bottom: 6, left: 4, right: 4 }}
      onPress={onPress}
    >
      {({ pressed }) => (
        <Icon
          name={iconName}
          color={theme['c-button-font']}
          size={size}
          style={{ transform: [{ scale: pressed ? 0.9 : 1 }] }}
        />
      )}
    </Pressable>
  )
})

export default memo(() => {
  const isPlay = useIsPlay()

  return (
    <View style={styles.container}>
      <ControlButton
        iconName="prevMusic"
        size={20}
        onPress={handlePlayPrev}
      />
      <ControlButton
        iconName={isPlay ? 'pause' : 'play'}
        size={24}
        onPress={handleTogglePlay}
      />
      <ControlButton
        iconName="nextMusic"
        size={20}
        onPress={handlePlayNext}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlBtnPressed: {
    opacity: 0.55,
  },
})
