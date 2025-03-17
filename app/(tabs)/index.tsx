import { Image, StyleSheet, Platform, View, Text } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Slider from "@/components/Slider";
import Dnd from "@/components/Dnd/Index";
import { useState } from "react";

const INIT_VALUE = 0.38;

export default function HomeScreen() {
  const [number, setNumber] = useState(INIT_VALUE);

  const handleSliderChange = (newValue: number) => {
    console.log("slider change");
    setNumber(newValue);
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<Image source={require("@/assets/images/partial-react-logo.png")} style={styles.reactLogo} />}
    >
      <Slider
        handleSliderChange={handleSliderChange}
        initValue={INIT_VALUE}
        color="#00A6F5"
        paddingHorizontal={40}
        // height={10}
      />
      <View>
        <Text>{number}</Text>
      </View>
    </ParallaxScrollView>
    // <View>
    //   <Dnd />
    // </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
