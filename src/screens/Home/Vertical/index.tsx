import { View } from 'react-native'
import Header from './Header'
import Main from './Main'
import PlayerBar from '@/components/player/PlayerBar'
import BottomNavBar from '@/components/navigation/BottomNavBar'
import { createStyle } from '@/utils/tools'

const Vertical = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.main}>
        <Main />
      </View>
      <View style={styles.bottomContainer} pointerEvents="box-none">
        <PlayerBar isHome isFloating />
        <BottomNavBar />
      </View>
    </View>
  )
}

const styles = createStyle({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  main: {
    flex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
})

export default Vertical
