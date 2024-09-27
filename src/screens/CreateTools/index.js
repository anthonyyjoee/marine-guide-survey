import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

import { InputText, PrimaryButton } from "@components";
import { useAuthorizedMutation } from "@hooks";
import { API_PATH, API_REQUEST_METHODS, ERROR_MESSAGE } from "@constant";
import { useAppContext } from "@context";
import { toast } from "sonner-native";

export const CreateTools = ({ navigation, route }) => {
  const { isAdmin } = useAppContext();

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const { mutate: createTools, isLoading: isLoadingCreateTools } = useAuthorizedMutation({
    urlPath: API_PATH.SECURE.TOOLS.ROOT,
    method: API_REQUEST_METHODS.POST,
    reactQueryOptions: {
      onSuccess: (data) => {
        toast.success("Alat baru berhasil dibuat");
        navigation?.navigate("ToolsList");
      },
      onError: (err) => {
        toast.error(ERROR_MESSAGE[err?.message] ?? ERROR_MESSAGE?.INTERNAL_SERVER_ERROR);
      },
    },
  });

  const { mutate: updateTools, isLoading: isLoadingUpdateTools } = useAuthorizedMutation({
    urlPath: API_PATH.SECURE.TOOLS.ID(route?.params?.toolsData?.id),
    method: API_REQUEST_METHODS.PUT,
    reactQueryOptions: {
      onSuccess: () => {
        toast.success("Alat berhasil diubah");
        navigation?.navigate("ToolsList");
      },
      onError: (err) => {
        toast.error(ERROR_MESSAGE[err?.message] ?? ERROR_MESSAGE?.INTERNAL_SERVER_ERROR);
      },
    },
  });

  const onSubmit = useCallback(() => {
    const payload = {
      name: form?.name ?? "",
      description: form?.description ?? "",
    };
    if (route?.params?.toolsData) {
      updateTools(payload);
    } else {
      createTools(payload);
    }
  }, [createTools, form]);

  const onChange = useCallback((value, key) => {
    setForm((oldVal) => {
      return {
        ...oldVal,
        [key]: value,
      };
    });
  }, []);

  useEffect(() => {
    if (route?.params?.toolsData) {
      const toolsData = route?.params?.toolsData;
      setForm({
        name: toolsData?.name ?? "",
        description: toolsData?.description ?? "",
      });
    }
  }, [route?.params]);

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 32, paddingBottom: 21 }}>
      <View style={{ flex: 1, justifyContent: "space-between", alignContent: "space-between" }}>
        <View style={{ gap: 20 }}>
          <InputText onChange={onChange} name="name" value={form?.name} label="Nama Peralatan" placeholder="Nama Peralatan" disabled={!isAdmin} />
          <InputText
            onChange={onChange}
            name="description"
            value={form?.description}
            label="Deskripsi Peralatan"
            placeholder="Deskripsi Peralatan"
            multiline
            disabled={!isAdmin}
          />
        </View>
        {isAdmin ? <PrimaryButton onPress={onSubmit} title={"Simpan"} fullWidth disabled={isLoadingCreateTools} /> : null}
      </View>
    </View>
  );
};
