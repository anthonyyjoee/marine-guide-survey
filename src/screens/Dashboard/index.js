import React from "react";
import { StyleSheet, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppOverview, ProfileInfo, SurveyListOverview } from "@components";

export const Dashboard = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <LinearGradient colors={["#02367B", "#72A5D3"]} style={styles.background} />
      </View>
      <View style={styles.bottomHalf} />

      {/* Overlay Content */}
      <View style={{ ...styles.overlay, paddingTop: insets.top, paddingBottom: insets.bottom }}>
        <ProfileInfo />
        <SurveyListOverview navigation={navigation} />
        <AppOverview />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative", // Make sure the container is positioned relative for absolute children
  },
  topHalf: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomHalf: {
    flex: 2,
    backgroundColor: "#F1F1F1", // White color
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute", // Position it on top of the background
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
    // justifyContent: "center",
    // alignItems: "center",
    flex: 1,
    padding: 20, // Add some padding if needed
  },
  overlayText: {
    fontSize: 24,
    color: "#000", // Text color for overlay
    marginBottom: 20,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
