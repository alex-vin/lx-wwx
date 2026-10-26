import { memo, useCallback } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { navigations } from '@/navigation'
import { usePlayerMusicInfo } from '@/store/player/hook'
import commonState from '@/store/common/state'
import playerState from '@/store/player/state'
import { LIST_IDS, NAV_SHEAR_NATIVE_IDS } from '@/config/constant'
import Image from '@/components/common/Image'
import { setLoadErrorPicUrl, setMusicInfo } from '@/core/player/playInfo'

const PIC_SIZE = 40

export default memo(({ isHome = false }: { isHome?: boolean }) => {
  const musicInfo = usePlayerMusicInfo()

  const handlePress = () => {
    const targetId = commonState.componentIds.songlistDetail ?? commonState.componentIds.home
    if (targetId) {
      navigations.pushPlayDetailScreen(targetId)
    }
  }

  const handleLongPress = () => {
    if (!isHome) return
    const listId = playerState.playMusicInfo.listId
    if (!listId || listId == LIST_IDS.DOWNLOAD) return
    global.app_event.jumpListPosition()
  }

  const handleError = useCallback((url: string | number) => {
    setLoadErrorPicUrl(url as string)
    setMusicInfo({
      pic: null,
    })
  }, [])

  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={handleLongPress}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Image
        url={musicInfo.pic}
        nativeID={NAV_SHEAR_NATIVE_IDS.playDetail_pic}
        style={styles.image}
        onError={handleError}
      />
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  container: {
    width: PIC_SIZE,
    height: PIC_SIZE,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: PIC_SIZE,
    height: PIC_SIZE,
    borderRadius: 10,
  },
})
