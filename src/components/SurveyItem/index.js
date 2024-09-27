import React, { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import { AnchorSVG } from "@assets";
import { useAppContext } from "@context";

export const SurveyItem = ({ item, navigation }) => {
  const { isAdmin } = useAppContext();
  
  const onPress = useCallback(
    (item) => {
      if (isAdmin) {
        navigation?.navigate("CreateSurvey", { surveyData: item });
      } else {
        navigation?.navigate("SurveyDetail", { surveyData: item });
      }
    },
    [navigation]
  );

  return (
    <TouchableOpacity style={styles.bottomSheetMenu} activeOpacity={0.8} onPress={() => onPress(item)}>
      <View style={styles.titleWrapper}>
        <AnchorSVG width={32} height={32} />
        <Text style={styles.bottomSheetMenuText}>{item?.name ?? ""}</Text>
      </View>
      <AntDesign name="right" size={16} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bottomSheetMenu: {
    paddingVertical: 16,
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
