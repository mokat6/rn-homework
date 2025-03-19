import {useMemo, type PropsWithChildren, type ReactElement} from 'react';
import {Dimensions, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import Animated, {interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset} from 'react-native-reanimated';
import {ThemedView} from '@/components/ThemedView';
import {useBottomTabOverflow} from '@/components/ui/TabBarBackground';
import {useColorScheme} from '@/hooks/useColorScheme';
import Svg, {Path} from 'react-native-svg';

const HEADER_HEIGHT = 290; // Static header height

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: {dark: string; light: string};
}>;

export default function ParallaxScrollView({children, headerImage, headerBackgroundColor}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();
  const {width: screenWidth} = useWindowDimensions();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  const CircularSeparator = () => {
    const quadBezierHeight = screenWidth / 9.5; // the aspect ratio for one eighth of a perfect circle

    const controlPoint = {
      x: screenWidth / 2,
      y: -quadBezierHeight,
    };

    const endPoint = {
      x: screenWidth,
      y: quadBezierHeight,
    };

    const svgPath = `
    M 0 ${quadBezierHeight} 
    Q ${controlPoint.x} ${controlPoint.y} ${endPoint.x} ${endPoint.y} 
    H 0 
    Z
    `;

    return (
      <View style={{marginTop: -quadBezierHeight}}>
        <Svg height={quadBezierHeight} width={screenWidth} viewBox={`0 0 ${screenWidth} ${quadBezierHeight}`}>
          <Path d={svgPath} fill="#fff" />
        </Svg>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{bottom}}
        contentContainerStyle={{paddingBottom: bottom}}>
        <Animated.View
          style={[styles.header, {backgroundColor: headerBackgroundColor[colorScheme]}, headerAnimatedStyle]}>
          {headerImage}
        </Animated.View>

        {/* Insert dynamically generated circular separator */}

        <CircularSeparator />

        <ThemedView style={styles.content}>
          {children}
          <Text>he</Text>
        </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 0,
    gap: 16,
    overflow: 'hidden',
  },
});
