import { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";

import { InputText, PrimaryButton } from "@components";
import { useAuthorizedMutation } from "@hooks";
import { API_PATH, API_REQUEST_METHODS, ERROR_MESSAGE } from "@constant";
import LottieView from "lottie-react-native";
import { toast } from "sonner-native";

export const ChangePassword = ({ navigation, route }) => {
  const animation = useRef();
  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
  });

  const { mutate: changePassword, isLoading: isLoadingChangePassword } = useAuthorizedMutation({
    urlPath: API_PATH.SECURE.CHANGE_PASSWORD,
    method: API_REQUEST_METHODS.POST,
    reactQueryOptions: {
      onSuccess: () => {
        toast.success('Kata sandi berhasil dirubah');
        navigation?.navigate("Profile");
      },
      onError: (err) => {
        toast.error(ERROR_MESSAGE[err?.message] ?? ERROR_MESSAGE?.INTERNAL_SERVER_ERROR);
      },
    },
  });

  const onChange = useCallback(
    (value, key) => {
      setForm((oldVal) => {
        return {
          ...oldVal,
          [key]: value,
        };
      });
    },
    [setForm]
  );

  const onSubmit = useCallback((form) => {
    const payload = {
      old_password: form?.old_password,
      new_password: form?.new_password,
    };
    changePassword(payload);
  }, []);

  return (
    <>
      {isLoadingChangePassword ? (
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
      <View style={{ flex: 1, padding: 20, paddingTop: 32, paddingBottom: 21 }}>
        <View style={{ flex: 1, justifyContent: "space-between", alignContent: "space-between" }}>
          <View style={{ gap: 20 }}>
            <InputText onChange={onChange} name="old_password" value={form?.old_password} label="Kata Sandi Lama" placeholder="" type="password" />
            <InputText onChange={onChange} name="new_password" value={form?.new_password} label="Kata Sandi Baru" placeholder="" type="password" />
          </View>
          <PrimaryButton onPress={() => onSubmit(form)} title={"Simpan"} fullWidth disabled={isLoadingChangePassword} />
        </View>
      </View>
    </>
  );
};
