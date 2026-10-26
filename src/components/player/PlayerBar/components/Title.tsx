import { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { usePlayerMusicInfo } from '@/store/player/hook'
import { useTheme } from '@/store/theme/hook'
import Text from '@/components/common/Text'

export default memo(({ isHome }: { isHome?: boolean }) => {
  const musicInfo = usePlayerMusicInfo()
  const theme = useTheme()

  const title = musicInfo.name || (musicInfo.id ? '' : 'LX Music')

  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
        color={theme['c-font']}
        numberOfLines={1}
      >
        {title}
      </Text>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
})
