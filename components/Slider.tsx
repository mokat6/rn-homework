import { transform } from "@babel/core";
import React, { useEffect } from "react";
// import { View } from "react-native-reanimated/lib/typescript/Animated";
import { Easing, Image, Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import Animated, {
  FadeIn,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withReanimatedTimer,
  withTiming,
} from "react-native-reanimated";

import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { useThrottleCallback } from "@/hooks/useThrottleCallback";
import { scaleZetaToMatchClamps } from "react-native-reanimated/lib/typescript/animation/springUtils";

interface SliderProps {
  initValue: number;
  color: string;
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

const ANIMATION_DURATION_MOUSE_DOWN = 100;
const ANIMATION_DURATION_MOUSE_UP = 500;

const DEFAULT_FILL_COLOR = "#00f";

const { width } = Dimensions.get("screen");

/**
 * A custom slider component with values from 0 to 1.
 *
 * @param {Object} props - The props object for the slider component.
 * @param {number} props.initValue - The initial value of the slider (between 0 and 1).
 * @param {string} props.color - The color of the slider fill.
 * @param {number} [props.paddingHorizontal=100] - The horizontal padding for the slider (optional, defaults to 100).
 * @param {number} [props.height=220] - The height of the slider (optional, defaults to 220).
 * @param {Function} props.handleSliderChange - A callback function that gets called when the slider value changes.
 */
const Slider = (props: SliderProps) => {
  const {
    initValue,
    color,
    paddingHorizontal = 100,
    height = 220,
    handleSliderChange,
    backgroundColor = "#E1E7EA",
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
      transform: [{ scale: scale.value }],
    };
  });

  const handleSliderChangeThrottled = useThrottleCallback(handleSliderChange, 333);

  const sliderDragStyle = useAnimatedStyle(() => ({
    width: fillWidth.value,
  }));

  const pan = Gesture.Pan()
    .onTouchesDown((event) => {
      fillWidth.value = event.allTouches[0].x;
    })
    .onStart(() => {
      prevFillWidth.value = fillWidth.value;
      opacity.value = OPACITY_MOUSE_DOWN; //withTiming(OPACITY_MOUSE_DOWN, { duration: ANIMATION_DURATION_MOUSE_DOWN });
      scale.value = SCALE_MOUSE_DOWN; //withTiming(SCALE_MOUSE_DOWN, { duration: ANIMATION_DURATION_MOUSE_DOWN });
    })
    .onUpdate((event) => {
      const newValue = prevFillWidth.value + event.translationX;
      const clampedValue = Math.min(Math.max(newValue, trackMinWidth), trackMaxWidth);
      fillWidth.value = clampedValue;

      console.log("fillWidth.value >> ", fillWidth.value);
      console.log("trackMaxWidth >> ", trackMaxWidth - paddingHorizontal);
      const valueRatio = (fillWidth.value - paddingHorizontal / 2) / (trackMaxWidth - paddingHorizontal / 2);
      runOnJS(handleSliderChangeThrottled)(valueRatio);
    })
    .onEnd(() => {
      opacity.value = withTiming(OPACITY_MOUSE_UP, { duration: ANIMATION_DURATION_MOUSE_UP });
      scale.value = withTiming(SCALE_MOUSE_UP, { duration: ANIMATION_DURATION_MOUSE_UP });
    });

  return (
    <>
      <GestureHandlerRootView style={[styles.sliderCont, { height, paddingHorizontal, backgroundColor }]}>
        <GestureDetector gesture={pan}>
          <View style={[styles.track, {}]}>
            <Animated.View style={[styles.fill, { backgroundColor: color }, sliderDragStyle]}>
              <View style={[styles.thumb, { backgroundColor: color }]}>
                <Animated.View
                  style={[styles.thumb, styles.thumbAnimation, { backgroundColor: color }, animationStyle]}
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
    // backgroundColor: "#E1E7EA",
    // height: 220, // Fixed height
    alignItems: "center", // Horizontally center the child
    justifyContent: "center", // Vertically center the child
    flexDirection: "column", // Default behavior (can be omitted)
    // paddingHorizontal: 55,
  },
  track: {
    backgroundColor: "#fff",
    height: 8, // Increase the height to include padding
    width: "100%",
    borderRadius: 8,
  },
  fill: {
    backgroundColor: DEFAULT_FILL_COLOR,
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    borderRadius: 8,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    backgroundColor: DEFAULT_FILL_COLOR,
    borderRadius: THUMB_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  thumbAnimation: {
    backgroundColor: DEFAULT_FILL_COLOR,
    opacity: 0.7,
  },
});

export default Slider;
