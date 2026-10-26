import { View, TouchableOpacity } from 'react-native'
import { useTheme } from '@/store/theme/hook'
import { useNavActiveId, useStatusbarHeight } from '@/store/common/hook'
import { createStyle } from '@/utils/tools'
import { Icon } from '@/components/common/Icon'
import Text from '@/components/common/Text'
import StatusBar from '@/components/common/StatusBar'
import { scaleSizeH } from '@/utils/pixelRatio'
import { HEADER_HEIGHT } from '@/config/constant'
import commonState, { type InitState as CommonState } from '@/store/common/state'
import SearchTypeSelector from '@/screens/Home/Views/Search/SearchTypeSelector'
import { setNavActiveId } from '@/core/common'

const headerComponents: Partial<Record<CommonState['navActiveId'], React.ReactNode>> = {
  nav_search: <SearchTypeSelector />,
}

const Header = () => {
  const theme = useTheme()
  const activeId = useNavActiveId()
  const statusBarHeight = useStatusbarHeight()

  const handleOpenSetting = () => {
    if (activeId === 'nav_setting') {
      setNavActiveId(commonState.lastNavActiveId || 'nav_songlist')
    } else {
      setNavActiveId('nav_setting')
    }
  }

  return (
    <>
      <StatusBar />
      <View
        style={[
          styles.container,
          {
            height: scaleSizeH(HEADER_HEIGHT) + statusBarHeight,
            paddingTop: statusBarHeight,
          },
        ]}
      >
        <View style={styles.left}>
          <View style={styles.brand}>
            <Icon color={theme['c-primary-font']} name="logo" size={24} />
            <Text style={styles.brandTitle} size={18} color={theme['c-primary-font']}>LX Music</Text>
          </View>
        </View>
        <View style={styles.right}>
          {headerComponents[activeId] ?? null}
          <TouchableOpacity
            style={styles.settingBtn}
            onPress={handleOpenSetting}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Icon
              color={activeId === 'nav_setting' ? theme['c-primary-font-active'] : theme['c-font']}
              name="setting"
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = createStyle({
  container: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandTitle: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  settingBtn: {
    width: HEADER_HEIGHT,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
})

export default Header
