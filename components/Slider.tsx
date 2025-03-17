import { transform } from "@babel/core";
import React, { useEffect } from "react";
// import { View } from "react-native-reanimated/lib/typescript/Animated";
import {
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

interface SliderProps {
  initValue: number;
  color: string;
  paddingHorizontal?: number;
  height?: number;
  handleSliderChange: () => void;
}

// consts
const THUMB_SIZE = 30;

const END_POSITION = 200;

function clamp({ val, min, max }: { val: number; min: number; max: number }) {
  return Math.min(Math.max(val, min), max);
}

const { width, height } = Dimensions.get("screen");

const Slider = (props: SliderProps) => {
  const {
    initValue,
    color,
    paddingHorizontal = 100,
    height = 220,
    handleSliderChange,
  } = props;
  const fillWidth = useSharedValue(initValue);
  const prevFillWidth = useSharedValue(initValue);

  const trackMinWidth = THUMB_SIZE;
  const trackMaxWidth = width - 2 * paddingHorizontal;

  const animatedStyles = useAnimatedStyle(() => ({
    width: fillWidth.value,
  }));

  const pan = Gesture.Pan()
    // .minDistance(1)
    .onTouchesDown((event) => {
      console.log(
        "Finger down at:",
        event.allTouches[0].x,
        event.allTouches[0].y
      );
      fillWidth.value = event.allTouches[0].x;
    })
    .onStart(() => {
      prevFillWidth.value = fillWidth.value;
      console.log("onStart hitting");
    })
    .onUpdate((event) => {
      const newValue = prevFillWidth.value + event.translationX;
      const clampedValue = Math.min(
        Math.max(newValue, trackMinWidth),
        trackMaxWidth
      );
      fillWidth.value = clampedValue;
    })
    .runOnJS(true);

  return (
    <>
      <GestureHandlerRootView
        style={[styles.sliderCont, { height, paddingHorizontal }]}
      >
        <GestureDetector gesture={pan}>
          <View style={[styles.track, {}]}>
            <Animated.View style={[styles.fill, animatedStyles]}>
              <View style={[styles.thumb]} />
            </Animated.View>
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  sliderCont: {
    backgroundColor: "lightblue",
    // height: 220, // Fixed height
    alignItems: "center", // Horizontally center the child
    justifyContent: "center", // Vertically center the child
    flexDirection: "column", // Default behavior (can be omitted)
    // paddingHorizontal: 55,
  },
  track: {
    backgroundColor: "hotpink",
    height: 15, // Increase the height to include padding
    width: "100%",
    borderRadius: 10,
  },
  fill: {
    backgroundColor: "blue",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    borderRadius: 10,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    backgroundColor: "red",
    borderRadius: THUMB_SIZE / 2,
  },
});

export default Slider;
