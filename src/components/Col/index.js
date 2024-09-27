import React from "react";
import { View, StyleSheet } from "react-native";

export const Col = ({ span, style, children }) => {
  // Calculate the width based on the span (24 columns)
  const width = (span / 24) * 100 + "%";

  return <View style={[styles.col, { width }, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  col: {
    flexDirection: "column",
  },
});
