import { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";

import { InputText, PrimaryButton } from "@components";
import { useAuthorizedMutation } from "@hooks";
import { API_PATH, API_REQUEST_METHODS, ERROR_MESSAGE } from "@constant";
import LottieView from "lottie-react-native";
import { toast } from "sonner-native";

export const CreateWorkUnit = ({ navigation, route }) => {
  const animation = useRef();
  const [form, setForm] = useState({
    name: "",
    address: "",
  });

  const { mutate: crateWorkUnit, isLoading: isLoadingCreateWorkUnit } = useAuthorizedMutation({
    urlPath: API_PATH.SECURE.WORK_UNIT.ROOT,
    method: API_REQUEST_METHODS.POST,
    reactQueryOptions: {
      onSuccess: () => {
        toast.success("Unit kerja baru berhasil dibuat");
        navigation?.navigate("WorkUnitList");
      },
      onError: (err) => {
        toast.error(ERROR_MESSAGE[err?.message] ?? ERROR_MESSAGE?.INTERNAL_SERVER_ERROR);
      },
    },
  });

  const { mutate: updateWorkUnit, isLoading: isLoadingUpdateWorkUnit } = useAuthorizedMutation({
    urlPath: API_PATH.SECURE.WORK_UNIT.ID(route?.params?.workUnitData?.id),
    method: API_REQUEST_METHODS.PUT,
    reactQueryOptions: {
      onSuccess: () => {
        toast.success("Unit kerja berhasil diubah");
        navigation?.navigate("WorkUnitList");
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

  const onSubmit = useCallback(
    (form) => {
      const payload = {
        name: form?.name,
        address: form?.address,
      };

      if (route?.params?.workUnitData) {
        updateWorkUnit(payload);
      } else {
        crateWorkUnit(payload);
      }
    },
    [crateWorkUnit, route?.params]
  );

  useEffect(() => {
    if (route?.params?.workUnitData) {
      const workUnitData = route?.params?.workUnitData;
      setForm({
        name: workUnitData?.name ?? "",
        address: workUnitData?.address ?? "",
      });
    }
  }, [route?.params]);

  return (
    <>
      {isLoadingCreateWorkUnit || isLoadingUpdateWorkUnit ? (
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
            <InputText onChange={onChange} name="name" value={form?.name} label="Nama Unit Kerja" placeholder="Unit Kerja 1" />
            <InputText onChange={onChange} name="address" value={form?.address} label="Lokasi Unit Kerja" placeholder="Jakarta" multiline />
          </View>
          <PrimaryButton onPress={() => onSubmit(form)} title={"Simpan"} fullWidth disabled={isLoadingCreateWorkUnit || isLoadingUpdateWorkUnit} />
        </View>
      </View>
    </>
  );
};
