import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppContext } from "@context";

export const List = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { userData } = useAppContext();

  return (
    <View style={{ ...styles.container }}>
      <LinearGradient colors={["#02367B", "#72A5D3"]} style={styles.background} />
      <View style={{ flex: 1, paddingTop: insets.top + 56 }}>
        <View style={styles.bottomSheetMenuWrapper}>
          {userData?.role === "ADMIN" ? (
            <>
              <TouchableOpacity style={styles.bottomSheetMenu} activeOpacity={0.8} onPress={() => navigation.navigate("UserList")}>
                <View style={styles.titleWrapper}>
                  <Ionicons name="people-sharp" size={24} color="black" />
                  <Text style={styles.bottomSheetMenuText}>User / Admin</Text>
                </View>
                <AntDesign name="right" size={16} color="black" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.bottomSheetMenu} activeOpacity={0.8} onPress={() => navigation.navigate("WorkUnitList")}>
                <View style={styles.titleWrapper}>
                  <Ionicons name="briefcase" size={24} color="black" />
                  <Text style={styles.bottomSheetMenuText}>Unit Kerja</Text>
                </View>
                <AntDesign name="right" size={16} color="black" />
              </TouchableOpacity>
            </>
          ) : null}

          <TouchableOpacity style={styles.bottomSheetMenu} activeOpacity={0.8} onPress={() => navigation.navigate("ToolsList")}>
            <View style={styles.titleWrapper}>
              <Ionicons name="hammer" size={24} color="black" />
              <Text style={styles.bottomSheetMenuText}>Peralatan</Text>
            </View>
            <AntDesign name="right" size={16} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  bottomSheetMenuWrapper: { width: "100%", gap: 16, paddingHorizontal: 24 },
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
});
