import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { InputText, PrimaryButton, UserItem } from "@components";
import { useAuthorizedQuery } from "@hooks";
import { API_PATH, ERROR_MESSAGE } from "@constant";
import { useIsFocused } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { toast } from "sonner-native";

export const UserList = ({ navigation }) => {
  const isFocused = useIsFocused();
  const animation = useRef();

  const [form, setForm] = useState({
    search: "",
  });

  const {
    data: userList,
    refetch: refetchUserList,
    isLoading: isLoadingUserList,
    isRefetching: isRefetchinguserList,
  } = useAuthorizedQuery({
    urlPath: API_PATH.SECURE.STAFF.FILTER({ search: form.search }),
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
      refetchUserList();
    }
  }, [isFocused]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <InputText onChange={onChange} name="search" value={form?.search} placeholder="Cari User / Admin" />
        </View>
        {isLoadingUserList ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
            data={userList?.data}
            keyExtractor={(item) => item?.id}
            contentContainerStyle={styles.scrollViewContentContainer}
            renderItem={({ item }) => <UserItem item={item} navigation={navigation} />}
          />
        )}
        <View style={styles.CTAContainer}>
          <PrimaryButton
            disabled={isLoadingUserList}
            onPress={() => navigation.navigate("CreateUser")}
            title={"Buat User Baru"}
            customStyle={styles.CTACustomStyle}
          />
        </View>
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
