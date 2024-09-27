import { useCallback, useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";

import { ScrollView } from "react-native-gesture-handler";

import { InputText, PrimaryButton, SingleSelectDropdown } from "@components";
import { useAuthorizedMutation, useAuthorizedQuery } from "@hooks";
import { API_PATH, API_REQUEST_METHODS, COLORS, ERROR_MESSAGE } from "@constant";
import LottieView from "lottie-react-native";
import { toast } from "sonner-native";
import { TouchableOpacity } from "@gorhom/bottom-sheet";

const defaultFormValue = {
  name: "",
  email: "",
  password: "",
  workUnit: "",
  role: "",
};

export const CreateUser = ({ navigation, route }) => {
  const animation = useRef();

  const [form, setForm] = useState(defaultFormValue);

  const { mutate: createUser, isLoading: isLoadingCreateUser } = useAuthorizedMutation({
    urlPath: API_PATH.SECURE.STAFF.ROOT,
    method: API_REQUEST_METHODS.POST,
    reactQueryOptions: {
      onSuccess: (data) => {
        setForm(defaultFormValue);
        toast.success("User baru berhasil dibuat");
        navigation?.navigate("UserList");
      },
      onError: (err) => {
        toast.error(ERROR_MESSAGE[err?.message] ?? ERROR_MESSAGE?.INTERNAL_SERVER_ERROR);
      },
    },
  });

  const { mutate: resetPassword, isLoading: isLoadingResetPassword } = useAuthorizedMutation({
    urlPath: API_PATH.SECURE.STAFF.RESET_PASSWORD(route?.params?.userData?.id),
    method: API_REQUEST_METHODS.PATCH,
    reactQueryOptions: {
      onSuccess: (data) => {
        setForm(defaultFormValue);
        toast.success("Password berhasil di reset");
        navigation?.navigate("UserList");
      },
      onError: (err) => {
        toast.error(ERROR_MESSAGE[err?.message] ?? ERROR_MESSAGE?.INTERNAL_SERVER_ERROR);
      },
    },
  });

  const {
    data: workUnitList,
    refetch: refetchWorkUnitList,
    isLoading: isLoadingWorkUnitList,
    isRefetching: isRefetchingWorkUnitList,
  } = useAuthorizedQuery({
    urlPath: API_PATH.SECURE.WORK_UNIT.FILTER({ search: "" }),
    reactQueryOptions: {
      enabled: true,
      onError: (err) => {
        toast.error(ERROR_MESSAGE[err?.message] ?? ERROR_MESSAGE?.INTERNAL_SERVER_ERROR);
      },
    },
  });

  const onSubmit = useCallback(() => {
    const payload = {
      name: form?.name ?? "",
      email: form?.email ?? "",
      password: form?.password ?? "",
      work_unit: workUnitList?.data?.find((unit) => unit?.id === form?.workUnit) ?? "",
      role: form?.role ?? "",
    };

    createUser(payload);
  }, [createUser, form]);

  const onChange = useCallback((value, key) => {
    setForm((oldVal) => {
      return {
        ...oldVal,
        [key]: value,
      };
    });
  }, []);

  const roleData = [
    { label: "Admin", value: "ADMIN" },
    { label: "Staff", value: "STAFF" },
  ];

  useEffect(() => {
    if (route?.params?.userData) {
      const data = route?.params?.userData;
      setForm({
        name: data?.name ?? "",
        email: data?.email ?? "",
        password: data?.password ?? "",
        workUnit: data?.work_unit?.id ?? "",
        role: data?.role ?? "",
      });
    } else {
      setForm(defaultFormValue);
    }
  }, [route?.params]);

  return (
    <View style={styles.container}>
      {isLoadingCreateUser || isLoadingWorkUnitList || isLoadingResetPassword ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 99999,
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
      ) : null}
      <KeyboardAvoidingView
        style={[styles.scrollViewContentContainer, { padding: 0, paddingTop: 0 }]}
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 100}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
          <View style={styles.formContainer}>
            <InputText onChange={onChange} name="name" value={form?.name} label="Nama" placeholder="Nama" disabled={route?.params?.userData} />
            <SingleSelectDropdown
              data={workUnitList?.data?.map((unit) => ({ value: unit.id, label: unit.name }))}
              value={form?.workUnit}
              placeholder="Unit Kerja"
              searchPlaceholder={"Cari Unit Kerja"}
              onChange={onChange}
              name="workUnit"
              label="Unit Kerja"
              disabled={route?.params?.userData}
            />
            <SingleSelectDropdown
              data={roleData}
              value={form?.role}
              placeholder="Role"
              searchPlaceholder={"Cari"}
              onChange={onChange}
              name="role"
              label="Role"
              disabled={route?.params?.userData}
            />
            <InputText
              onChange={onChange}
              name="email"
              value={form?.email}
              label="Email"
              placeholder="johndoe@gmail.com"
              disabled={route?.params?.userData}
            />
            <InputText
              onChange={onChange}
              name="password"
              value={form?.password}
              label="Password"
              placeholder="Password"
              type="password"
              disabled={!!route?.params?.userData}
            />
            {route?.params?.userData ? (
              <TouchableOpacity activeOpacity={0.7} onPress={() => resetPassword()}>
                <Text style={styles.resetPassword}>Reset Password?</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {route?.params?.userData ? null : (
        <View style={styles.CTAContainer}>
          <PrimaryButton
            onPress={onSubmit}
            disabled={isLoadingCreateUser || isLoadingWorkUnitList}
            title={"Simpan"}
            customStyle={styles.CTACustomStyle}
            fullWidth
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollViewContentContainer: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 32,
  },
  formContainer: { gap: 20 },
  CTAContainer: { paddingHorizontal: 20, paddingBottom: 21 },
  CTACustomStyle: { marginTop: 12 },
  resetPassword: {
    color: COLORS.primary,
    textDecorationLine: "underline",
    marginTop: -12,
    marginLeft: 6,
  },
});
