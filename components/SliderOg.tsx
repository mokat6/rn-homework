import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Animated, {runOnJS, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

import {Gesture, GestureDetector, GestureHandlerRootView} from 'react-native-gesture-handler';
import {useThrottleCallback} from '@/hooks/useThrottleCallback';

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
  initValue: number;
  color: string;
  dataSource: DataSource;
  paddingHorizontal?: number;
  height?: number;
  handleSliderChange: (value: number) => void;
  backgroundColor?: string;
}

// consts
const THUMB_SIZE = 20;
const OPACITY_MOUSE_DOWN = 1;
const OPACITY_MOUSE_UP = 0;
const SCALE_MOUSE_DOWN = 0.2;
const SCALE_MOUSE_UP = 3;

const ANIMATION_DURATION_MOUSE_UP = 500;

const DEFAULT_FILL_COLOR = '#00f';

const {width} = Dimensions.get('screen');

const Slider = (props: SliderProps) => {
  const {
    initValue,
    color,
    paddingHorizontal = 100,
    height = 220,
    handleSliderChange,
    backgroundColor = '#E1E7EA',
    dataSource = dataSourceEmpty,
  } = props;
  const fillWidth = useSharedValue(initValue);
  const prevFillWidth = useSharedValue(initValue);
  const trackMinWidth = THUMB_SIZE;
  const trackMaxWidth = width - 2 * paddingHorizontal;

  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);

  const animationStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{scale: scale.value}],
    };
  });

  const handleSliderChangeThrottled = useThrottleCallback(handleSliderChange, 333);

  const sliderDragStyle = useAnimatedStyle(() => ({
    width: fillWidth.value,
  }));

  const pan = Gesture.Pan()
    .onTouchesDown(event => {
      fillWidth.value = event.allTouches[0].x;
    })
    .onStart(() => {
      prevFillWidth.value = fillWidth.value;
      opacity.value = OPACITY_MOUSE_DOWN;
      scale.value = SCALE_MOUSE_DOWN;
    })
    .onUpdate(event => {
      const newValue = prevFillWidth.value + event.translationX;
      const clampedValue = Math.min(Math.max(newValue, trackMinWidth), trackMaxWidth);
      fillWidth.value = clampedValue;

      console.log('fillWidth.value >> ', fillWidth.value);
      console.log('trackMaxWidth >> ', trackMaxWidth - paddingHorizontal);
      const valueRatio = (fillWidth.value - paddingHorizontal / 2) / (trackMaxWidth - paddingHorizontal / 2);
      runOnJS(handleSliderChangeThrottled)(valueRatio);
    })
    .onEnd(() => {
      opacity.value = withTiming(OPACITY_MOUSE_UP, {duration: ANIMATION_DURATION_MOUSE_UP});
      scale.value = withTiming(SCALE_MOUSE_UP, {duration: ANIMATION_DURATION_MOUSE_UP});
    });

  return (
    <>
      <GestureHandlerRootView style={[styles.sliderCont, {height, paddingHorizontal, backgroundColor}]}>
        <GestureDetector gesture={pan}>
          <View style={[styles.track, {}]}>
            <Animated.View style={[styles.fill, {backgroundColor: color}, sliderDragStyle]}>
              <View style={[styles.thumb, {backgroundColor: color}]}>
                <Animated.View
                  style={[styles.thumb, styles.thumbAnimation, {backgroundColor: color}, animationStyle]}
                />
              </View>
            </Animated.View>
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  sliderCont: {
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
  fill: {
    backgroundColor: DEFAULT_FILL_COLOR,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 8,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    backgroundColor: DEFAULT_FILL_COLOR,
    borderRadius: THUMB_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbAnimation: {
    backgroundColor: DEFAULT_FILL_COLOR,
    opacity: 0.7,
  },
});

export default Slider;
