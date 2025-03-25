import React from 'react';
import {Pressable, StyleSheet, View, useWindowDimensions} from 'react-native';
import Animated, {runOnJS, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

import {Gesture, GestureDetector, GestureHandlerRootView} from 'react-native-gesture-handler';

// data value: coming from data source
// sliderRatio: fractional value from 0 to 1 used in slider calculations

export interface DataSource {
  minValue: number;
  maxValue: number;
  step: number;
}

const dataSourceEmpty: DataSource = {
  minValue: 0,
  maxValue: 1,
  step: 0.05,
};

interface SliderProps {
  dataSource: DataSource;
  handleSliderChange: (value: number) => void;
  initValue?: number;
  color?: string;
  paddingHorizontal?: number;
  height?: number;
  backgroundColor?: string;
}

const THUMB_SIZE = 20;
const OPACITY_MOUSE_DOWN = 1;
const OPACITY_MOUSE_UP = 0;
const SCALE_MOUSE_DOWN = 0.2;
const SCALE_MOUSE_UP = 3;
const DEFAULT_COLOR = 'blue';
const ANIMATION_DURATION_MOUSE_UP = 500;

const DEFAULT_FILL_COLOR = '#00f';

const Slider = (props: SliderProps) => {
  const {
    initValue = 0,
    color = DEFAULT_COLOR,
    paddingHorizontal = 100,
    height = 220,
    handleSliderChange,
    backgroundColor = '#E1E7EA',
    dataSource = dataSourceEmpty,
  } = props;

  const {width: screenWidth} = useWindowDimensions();
  const trackWidth = screenWidth - 2 * paddingHorizontal;
  const dataTotalRange = dataSource.maxValue - dataSource.minValue;
  const sliderStep = dataSource.step / dataTotalRange;

  const sliderRatio = useSharedValue(initValue / dataTotalRange);
  const prevSliderRatio = useSharedValue(initValue);

  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);

  const fancyAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{scale: scale.value}],
    };
  });

  const progressBarStyle = useAnimatedStyle(() => ({
    width: sliderRatio.value * trackWidth,
  }));

  const pan = Gesture.Pan()
    .onStart(() => {
      prevSliderRatio.value = sliderRatio.value;
      opacity.value = OPACITY_MOUSE_DOWN;
      scale.value = SCALE_MOUSE_DOWN;
    })
    .onUpdate(event => {
      // calculate new sliderRatio 0 - 1
      const newProgressWidth = prevSliderRatio.value * trackWidth + event.translationX;
      const clamped = Math.min(Math.max(newProgressWidth, 0), trackWidth);
      const newSliderRatio = clamped / trackWidth;
      sliderRatio.value = newSliderRatio;

      // return data value to slider parent component
      const dataValue = dataTotalRange * newSliderRatio;
      const snapped = Math.round(dataValue / dataSource.step) * dataSource.step;
      runOnJS(handleSliderChange)(snapped);
    })
    .onEnd(() => {
      // snap ratio to step
      const sliderRatioSnapped = Math.round(sliderRatio.value / sliderStep) * sliderStep;
      sliderRatio.value = withTiming(sliderRatioSnapped, {duration: 300});

      // thumb special effect
      opacity.value = withTiming(OPACITY_MOUSE_UP, {duration: ANIMATION_DURATION_MOUSE_UP});
      scale.value = withTiming(SCALE_MOUSE_UP, {duration: ANIMATION_DURATION_MOUSE_UP});
    });

  const handleTrackClick = (event: any) => {
    const {locationX} = event.nativeEvent;
    const tapAtRatio = locationX / trackWidth;
    const newSliderRatio = sliderRatio.value + (tapAtRatio > sliderRatio.value ? sliderStep : -sliderStep);
    sliderRatio.value = newSliderRatio;

    const dataValue = dataTotalRange * newSliderRatio;
    const snapped = Math.round(dataValue / dataSource.step) * dataSource.step;
    runOnJS(handleSliderChange)(snapped);
  };

  return (
    <GestureHandlerRootView style={[styles.container, {height, paddingHorizontal, backgroundColor}]}>
      <Pressable style={[styles.track]} onPress={handleTrackClick} hitSlop={{top: 30, bottom: 30}}>
        <Animated.View style={[styles.progressBar, {backgroundColor: color}, progressBarStyle]}>
          <GestureDetector gesture={pan}>
            <View
              style={[styles.thumbHitSlop]}
              /* the two props to stop tap event propagation*/
              onStartShouldSetResponder={event => true}
              onTouchEnd={e => {
                e.stopPropagation();
              }}>
              <View style={[styles.thumb, {backgroundColor: color}]}>
                <Animated.View
                  style={[styles.thumb, styles.thumbAnimation, {backgroundColor: color}, fancyAnimationStyle]}
                />
              </View>
            </View>
          </GestureDetector>
        </Animated.View>
      </Pressable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  track: {
    backgroundColor: '#fff',
    height: 8,
    width: '100%',
    borderRadius: 8,
  },
  progressBar: {
    backgroundColor: DEFAULT_FILL_COLOR,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 0,
  },
  thumbHitSlop: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 40 / 2,
    position: 'relative', // which is the default value
    right: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    backgroundColor: DEFAULT_FILL_COLOR,
    borderRadius: THUMB_SIZE / 2,
    opacity: 0.5,
    position: 'absolute',
  },
  thumbAnimation: {
    opacity: 0.7,
  },
});

export default Slider;
