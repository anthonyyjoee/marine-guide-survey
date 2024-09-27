import React from "react";
import { View, StyleSheet } from "react-native";

export const Row = ({ children, gutter = 0, style }) => {
  let horizontalGutter = 0;
  let verticalGutter = 0;

  if (Array.isArray(gutter)) {
    [horizontalGutter, verticalGutter] = gutter;
  } else {
    horizontalGutter = gutter;
  }
  return (
    <View style={[styles.row, { marginHorizontal: -horizontalGutter / 2, marginVertical: -verticalGutter / 2 }, style]}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child ?? <View></View>, {
          style: [child?.props?.style, { paddingHorizontal: horizontalGutter / 2, paddingVertical: verticalGutter / 2 }],
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
