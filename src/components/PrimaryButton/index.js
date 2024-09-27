import { COLORS } from "@constant";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const PrimaryButton = ({ title, onPress, customStyle, customButtonTextStyle, fullWidth, disabled }) => {
  return (
    <TouchableOpacity
      onPress={disabled ? () => {} : onPress}
      style={[styles.button, { width: fullWidth && "100%", opacity: disabled ? 0.5 : 1, ...customStyle }]}
      activeOpacity={disabled ? 0.5 : 0.9}
    >
      <Text style={[styles.buttonText, customButtonTextStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 64,
    backgroundColor: COLORS.primary,
    textColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 24,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
});
