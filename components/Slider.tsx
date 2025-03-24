import React from 'react';
import {Pressable, StyleSheet, View, Dimensions} from 'react-native';
import Animated, {runOnJS, SharedValue, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

import {Gesture, GestureDetector, GestureHandlerRootView} from 'react-native-gesture-handler';

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

  const sliderDragStyle = useAnimatedStyle(() => ({
    width: fillWidth.value,
  }));

  const pan = Gesture.Pan()
    .onStart(() => {
      prevFillWidth.value = fillWidth.value;
      opacity.value = OPACITY_MOUSE_DOWN;
      scale.value = SCALE_MOUSE_DOWN;
    })
    .onUpdate(event => {
      fillWidth.value = getNewFillWidth(event.translationX, prevFillWidth, trackMinWidth, trackMaxWidth);
      console.log('fill.value ', fillWidth.value);
      const ratio = (fillWidth.value - THUMB_SIZE) / (trackMaxWidth - THUMB_SIZE);
      const mappedValue = dataSource.minValue + (dataSource.maxValue - dataSource.minValue) * ratio;
      const snappedValue = Math.round(mappedValue / dataSource.step) * dataSource.step;
      runOnJS(handleSliderChange)(snappedValue);
    })
    .onEnd(() => {
      const ratio = (fillWidth.value - paddingHorizontal / 2) / (trackMaxWidth - paddingHorizontal / 2);
      const mappedValue = dataSource.minValue + ratio * (dataSource.maxValue - dataSource.minValue);

      const snappedValue = Math.round(mappedValue / dataSource.step) * dataSource.step;
      const snappedRatio = (snappedValue - dataSource.minValue) / (dataSource.maxValue - dataSource.minValue);
      const snappedFillWidth = snappedRatio * (trackMaxWidth - paddingHorizontal / 2) + paddingHorizontal / 2;
      fillWidth.value = withTiming(snappedFillWidth, {duration: 300});

      // thumb special effect
      opacity.value = withTiming(OPACITY_MOUSE_UP, {duration: ANIMATION_DURATION_MOUSE_UP});
      scale.value = withTiming(SCALE_MOUSE_UP, {duration: ANIMATION_DURATION_MOUSE_UP});
    });

  const handleTrackClick = (event: any) => {
    const {locationX} = event.nativeEvent;

    const stepPercentage = dataSource.step / (dataSource.maxValue - dataSource.minValue);
    console.log('steppp : ', stepPercentage);
    const stepInSlider = stepPercentage * trackMaxWidth;
    console.log('normalized step : ', stepInSlider);
    const moveBy = locationX > fillWidth.value ? stepInSlider : -stepInSlider;
    fillWidth.value = withTiming(fillWidth.value + moveBy, {duration: 300});

    const ratio = (fillWidth.value - THUMB_SIZE) / (trackMaxWidth - THUMB_SIZE);
    const mappedValue = dataSource.minValue + (dataSource.maxValue - dataSource.minValue) * ratio;
    const snappedValue = Math.round(mappedValue / dataSource.step) * dataSource.step;
    runOnJS(handleSliderChange)(snappedValue);
  };

  return (
    <GestureHandlerRootView style={[styles.sliderCont, {height, paddingHorizontal, backgroundColor}]}>
      <Pressable style={[styles.track]} onPress={handleTrackClick}>
        <Animated.View style={[styles.fill, {backgroundColor: color}, sliderDragStyle]}>
          <GestureDetector gesture={pan}>
            <View style={[styles.thumb, {backgroundColor: color}]}>
              <Animated.View style={[styles.thumb, styles.thumbAnimation, {backgroundColor: color}, animationStyle]} />
            </View>
          </GestureDetector>
        </Animated.View>
      </Pressable>
    </GestureHandlerRootView>
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

const getNewFillWidth = (
  translateX: number,
  prevFillWidth: SharedValue<number>,
  trackMinWidth: number,
  trackMaxWidth: number,
) => {
  'worklet';

  const newValue = prevFillWidth.value + translateX;
  return Math.min(Math.max(newValue, trackMinWidth), trackMaxWidth);
};
