import React, { useMemo } from "react";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native";

const CustomBackdrop = ({ animatedIndex, style, onPress }) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [0, 1], [0, 1], Extrapolate.CLAMP),
  }));

  // styles
  const containerStyle = useMemo(() => {
    return [style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }, containerAnimatedStyle];
  }, [style, containerAnimatedStyle]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={containerStyle} />
    </TouchableWithoutFeedback>
  );
};

export default CustomBackdrop;
