import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { InputText, PrimaryButton } from "@components";

import { useNonAuthorizedMutation } from "@hooks";
import { API_PATH, API_REQUEST_METHODS, ERROR_MESSAGE } from "@constant";
import { setUserAuthToken } from "@utils";
import { useAppContext } from "@context";
import { WhiteAnchorSVG } from "@assets";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { toast } from "sonner-native";

export const Login = () => {
  const { setUserData } = useAppContext();
  const animation = useRef();
  const insets = useSafeAreaInsets();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { mutate: login, isLoading: isLoginLoading } = useNonAuthorizedMutation({
    urlPath: API_PATH.PUBLIC.LOGIN,
    method: API_REQUEST_METHODS.POST,
    reactQueryOptions: {
      onSuccess: (data) => {
        toast.success("Berhasil Masuk");
        setUserAuthToken(data?.data?.accessToken);
        setUserData(data?.data?.userData);
      },
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

  return (
    <View style={styles.container}>
      <View style={[styles.topHalf]}>
        <LinearGradient colors={["#02367B", "#72A5D3"]} style={[styles.background, { paddingTop: insets.top + 10, width: "100%" }]}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {/* Profile Details */}
            <WhiteAnchorSVG width={32} height={32} />
            <Text style={styles.profileNameText}>Selamat Datang di Marine Guide Survey</Text>
            <Text style={styles.profileWorkUnitText}>Silakan login terlebih dahulu untuk memulai eksplorasi Anda.</Text>
          </View>
        </LinearGradient>
      </View>
      <View style={styles.bottomHalf} />

      {/* Overlay Content */}
      <View style={[styles.overlay]}>
        {isLoginLoading ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              width: "100%",
              zIndex: 9999999,
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
        ) : null}
        <View style={styles.loginContainer}>
          <View style={{ gap: 20 }}>
            <InputText onChange={onChange} name="email" value={form?.email} label="Email" placeholder="johndoe@mail.co" />
            <InputText onChange={onChange} name="password" value={form?.password} label="Password" placeholder="Password" type="password" />
          </View>

          <PrimaryButton
            fullWidth
            onPress={() =>
              login({
                email: form?.email ?? "",
                password: form?.password ?? "",
              })
            }
            disabled={isLoginLoading}
            title="Masuk"
          />
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
    // justifyContent: "center",
    alignItems: "center",
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  overlayText: {
    fontSize: 24,
    color: "#000", // Text color for overlay
    marginBottom: 20,
  },
  background: {
    height: "100%",
  },
  loginContainer: {
    width: "100%",
    height: 300,
    paddingTop: 35,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 21,
    justifyContent: "space-between",
  },
  profileNameText: {
    fontSize: 30,
    fontWeight: "700",
    color: "white",
    marginTop: 24,
    marginBottom: 22,
    textAlign: "center",
    maxWidth: 300,
  },
  profileWorkUnitText: {
    fontSize: 12,
    fontWeight: "400",
    color: "white",
    textAlign: "center",
    maxWidth: 250,
  },
});
