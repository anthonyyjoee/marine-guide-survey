import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { InputText, PrimaryButton, ToolsItem } from "@components";
import { API_PATH, ERROR_MESSAGE } from "@constant";
import { useAuthorizedQuery } from "@hooks";
import { useAppContext } from "@context";
import { useIsFocused } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { toast } from "sonner-native";

export const ToolsList = ({ navigation }) => {
  const { userData } = useAppContext();
  const isFocused = useIsFocused();
  const animation = useRef();

  const [form, setForm] = useState({
    search: "",
  });

  const {
    data: toolsList,
    isLoading: isLoadingToolsList,
    refetch: refetchToolsList,
  } = useAuthorizedQuery({
    urlPath: API_PATH.SECURE.TOOLS.FILTER({ search: form.search }),
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
      refetchToolsList();
    }
  }, [isFocused]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <InputText onChange={onChange} name="search" value={form?.search} placeholder="Cari Peralatan" />
        </View>
        {isLoadingToolsList ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <LottieView
              autoPlay
              ref={animation}
              style={{
                width: 100,
                height: 100,
                justifyContent: "center",
              }}
              source={require("../../assets/loader.json")}
            />
          </View>
        ) : (
          <FlatList
            data={toolsList?.data ?? []}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.scrollViewContentContainer}
            renderItem={({ item }) => <ToolsItem item={item} navigation={navigation} />}
          />
        )}
        {userData?.role === "ADMIN" ? (
          <View style={styles.CTAContainer}>
            <PrimaryButton
              disabled={isLoadingToolsList}
              onPress={() => navigation.navigate("CreateTools")}
              title={"Buat Peralatan Baru"}
              customStyle={styles.CTACustomStyle}
            />
          </View>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollViewContentContainer: {
    flexGrow: 1,
    flexDirection: "column",
    padding: 20,
    paddingTop: 0,
    gap: 10,
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
  CTAContainer: { paddingHorizontal: 20, paddingBottom: 21 },
  searchBarContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
  },
  CTACustomStyle: { marginTop: 12 },
});
