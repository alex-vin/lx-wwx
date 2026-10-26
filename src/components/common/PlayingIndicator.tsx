import { useEffect, useRef, memo } from 'react'
import { View, Animated, StyleSheet } from 'react-native'

export const PlayingIndicator = memo(({ color, size = 14 }: { color: string, size?: number }) => {
  const anim1 = useRef(new Animated.Value(0.3)).current
  const anim2 = useRef(new Animated.Value(0.7)).current
  const anim3 = useRef(new Animated.Value(0.4)).current

  useEffect(() => {
    const createAnim = (anim: Animated.Value, toValue: number, duration: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0.2,
            duration,
            useNativeDriver: true,
          }),
        ]),
      )
    }

    const a1 = createAnim(anim1, 1, 420)
    const a2 = createAnim(anim2, 0.9, 580)
    const a3 = createAnim(anim3, 0.8, 500)

    a1.start()
    a2.start()
    a3.start()

    return () => {
      a1.stop()
      a2.stop()
      a3.stop()
    }
  }, [anim1, anim2, anim3])

  const barWidth = 2.5
  const barHeight = size

  return (
    <View style={[styles.container, { width: 38, height: size }]}>
      <Animated.View
        style={[
          styles.bar,
          {
            width: barWidth,
            height: barHeight,
            backgroundColor: color,
            transform: [{ scaleY: anim1 }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.bar,
          {
            width: barWidth,
            height: barHeight,
            backgroundColor: color,
            transform: [{ scaleY: anim2 }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.bar,
          {
            width: barWidth,
            height: barHeight,
            backgroundColor: color,
            transform: [{ scaleY: anim3 }],
          },
        ]}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    borderRadius: 2,
    marginHorizontal: 1,
  },
})

export default PlayingIndicator
