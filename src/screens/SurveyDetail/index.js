import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuthorizedQuery } from "@hooks";
import { API_PATH, ERROR_MESSAGE } from "@constant";
import { toast } from "sonner-native";

export const SurveyDetail = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();

  const [form, setForm] = useState({
    search: "",
  });

  const {
    data: surveyList,
    refetch: refetchSurveyList,
    isLoading: isLoadingSurveyList,
    isRefetching: isRefetchingSurveyList,
  } = useAuthorizedQuery({
    urlPath: API_PATH.SECURE.SURVEY.FILTER({ search: form.search, order_by: true, limit: false }),
    reactQueryOptions: {
      enabled: true,
      onError: (err) => {
        toast.error(ERROR_MESSAGE[err?.message] ?? ERROR_MESSAGE?.INTERNAL_SERVER_ERROR);
      },
    },
  });

  const onChange = useCallback((value, key) => {
    setForm((oldVal) => {
      return {
        ...oldVal,
        [key]: value,
      };
    });
  }, []);

  useEffect(() => {
    if (isFocused) {
      refetchSurveyList();
    }
  }, [isFocused]);

  return (
    <>
      <LinearGradient colors={["#02367B", "#72A5D3"]} style={[styles.container, { paddingTop: insets.top + 60 }]}>
        <View style={styles.bottomSheetMenuWrapper}>
          <>
            <TouchableOpacity
              style={styles.bottomSheetMenu}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("SurveyDescription", { surveyData: route?.params?.surveyData })}
            >
              <View style={styles.titleWrapper}>
                <Ionicons name="list" size={24} color="black" />
                <Text style={styles.bottomSheetMenuText}>Deskripsi Survey</Text>
              </View>
              <AntDesign name="right" size={16} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomSheetMenu}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("SurveyTools", { surveyData: route?.params?.surveyData })}
            >
              <View style={styles.titleWrapper}>
                <Ionicons name="hammer" size={24} color="black" />
                <Text style={styles.bottomSheetMenuText}>Peralatan Survey</Text>
              </View>
              <AntDesign name="right" size={16} color="black" />
            </TouchableOpacity>
          </>

          <TouchableOpacity
            style={styles.bottomSheetMenu}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("SurveyProcedure", { surveyData: route?.params?.surveyData })}
          >
            <View style={styles.titleWrapper}>
              <Ionicons name="briefcase" size={24} color="black" />
              <Text style={styles.bottomSheetMenuText}>Prosedur Survey</Text>
            </View>
            <AntDesign name="right" size={16} color="black" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </>
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
