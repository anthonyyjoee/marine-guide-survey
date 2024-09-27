import { PasswordSVG, WhiteAnchorSVG } from "@assets";
import { PrimaryButton } from "@components";
import { useAppContext } from "@context";
import { LinearGradient } from "expo-linear-gradient";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

export const Profile = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { logOut } = useAppContext();

  const { userData, isAdmin } = useAppContext();

  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <LinearGradient colors={["#02367B", "#72A5D3"]} style={styles.background} />
        <View style={{ paddingTop: insets.top + 25, justifyContent: "center", alignItems: "center" }}>
          {/* Profile Details */}
          <WhiteAnchorSVG width={64} height={64} />
          <Text style={styles.profileNameText}>{userData?.name}</Text>
          <Text style={styles.profileWorkUnitText}>{userData?.work_unit?.name}</Text>
          <PrimaryButton
            title={isAdmin ? "Admin" : "Surveyor"}
            customStyle={styles.editButton}
            customButtonTextStyle={styles.editButtonText}
            disabled={true}
          />
        </View>
      </View>
      <View style={styles.bottomHalf}>
        <View style={{ paddingTop: 25 }}>
          <TouchableOpacity style={styles.bottomSheetMenu} activeOpacity={0.8} onPress={() => navigation.navigate("ChangePassword")}>
            <View style={styles.titleWrapper}>
              <PasswordSVG width={24} height={24} />
              <Text style={styles.bottomSheetMenuText}>Kata Sandi</Text>
            </View>
            <AntDesign name="right" size={16} color="black" />
          </TouchableOpacity>
          <PrimaryButton title="Keluar" fullWidth customStyle={styles.logoutButton} onPress={() => logOut()} />
        </View>
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
  },
  bottomHalf: {
    flex: 2.1,
    backgroundColor: "#F1F1F1", // White color
    paddingHorizontal: 20,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  profileNameText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
    marginTop: 12,
  },
  profileWorkUnitText: {
    fontSize: 12,
    fontWeight: "400",
    color: "white",
  },
  bottomSheetMenu: {
    height: 48,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bottomSheetMenuText: {
    fontSize: 12,
    fontWeight: "400",
  },
  editButton: {
    borderRadius: 100,
    backgroundColor: "#72A5D3",
    width: 110,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  editButtonText: { fontWeight: "400", textAlign: "center", fontSize: 12 },
  logoutButton: {
    backgroundColor: "#FF4545",
    marginTop: 24,
  },
});
