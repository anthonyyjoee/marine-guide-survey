import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const SplashScreen = () => {
  const insets = useSafeAreaInsets();
  return <View style={{ ...styles.container, paddingTop: insets.top + 25 }}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
