import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import { InputText, ReportItem, SurveyItem } from "@components";
import { useAuthorizedQuery } from "@hooks";
import { API_PATH, ERROR_MESSAGE } from "@constant";
import LottieView from "lottie-react-native";
import { toast } from "sonner-native";

export const Report = ({ navigation }) => {
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const animation = useRef(null);

  const [form, setForm] = useState({
    search: "",
  });

  const {
    data: surveyList,
    refetch: refetchSurveyList,
    isLoading,
  } = useAuthorizedQuery({
    urlPath: API_PATH.SECURE.REPORT.FILTER({ search: form.search }),
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
      <LinearGradient colors={["#02367B", "#72A5D3"]} style={[styles.container, { paddingTop: insets.top + 38 }]}>
        <View style={styles.searchBarContainer}>
          <InputText
            onChange={onChange}
            name="search"
            value={form?.search}
            placeholder="Cari Laporan"
            style={{ backgroundColor: "white", borderRadius: 10, borderWidth: 1, borderColor: "rgba(0, 0, 0, 0.10)" }}
          />
        </View>
        {isLoading ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "50%",
            }}
          >
            <LottieView
              autoPlay
              ref={animation}
              style={{
                width: 100,
                height: 100,
                justifyContent: "center",
                zIndex: 9999999,
              }}
              source={require("../../assets/loader.json")}
            />
          </View>
        ) : (
          <FlatList
            data={surveyList?.data}
            keyExtractor={(item) => item?.id}
            contentContainerStyle={styles.scrollViewContentContainer}
            renderItem={({ item }) => <ReportItem item={item} navigation={navigation} />}
          />
        )}
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollViewContentContainer: {
    flexGrow: 1,
    flexDirection: "column",
    padding: 20,
    paddingTop: 12,
    gap: 10,
    paddingBottom: 100,
  },
  formContainer: { gap: 20 },
  multiSelectSelectedItemContainer: {
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#EDF2FB",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
  },
  multiSelectLabel: { fontSize: 12, fontWeight: "500", marginBottom: 3 },
  multiSelectDescription: { fontSize: 12, color: "gray" },
  searchBarContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
  },
  background: {
    height: "100%",
  },
});
