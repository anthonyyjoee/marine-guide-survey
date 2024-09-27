import { StyleSheet, Text, View } from "react-native";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import { useAppContext } from "@context";
import { AnchorSVG } from "@assets";

export const ProfileInfo = () => {
  const { userData } = useAppContext();
  return (
    <View style={styles.profileInfo}>
      <AnchorSVG width={32} height={32} />
      {/* <FontAwesome5 name="anchor" size={32} color="white" /> */}
      <View style={styles.userDetailContainer}>
        <Text style={styles.profileNameText}>{userData?.name}</Text>
        <Text style={styles.profileWorkUnitText}>{userData?.work_unit?.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileInfo: {
    marginTop: 32,
    marginBottom: 32,
    width: "100%",
    height: 32,
    flexDirection: "row",
    gap: 8,
  },
  userDetailContainer: {
    justifyContent: "space-between",
  },
  profileNameText: {
    fontSize: 14,
    fontWeight: "700",
    color: "white",
  },
  profileWorkUnitText: {
    fontSize: 10,
    fontWeight: "400",
    color: "white",
  },
});
