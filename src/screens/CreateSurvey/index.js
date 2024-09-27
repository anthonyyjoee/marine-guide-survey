import { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

import Feather from "@expo/vector-icons/Feather";

import { InputText, MultiSelectDropdown, PrimaryButton } from "@components";
import { useAuthorizedMutation, useAuthorizedQuery } from "@hooks";
import { API_PATH, API_REQUEST_METHODS, ERROR_MESSAGE } from "@constant";
import LottieView from "lottie-react-native";
import { toast } from "sonner-native";

export const CreateSurvey = ({ navigation, route }) => {
  const animation = useRef();
  const [form, setForm] = useState({
    name: "",
    description: "",
    surveyProcedure: "",
    reportTemplate: "",
    tools: [],
  });

  const { mutate: createSurvey, isLoading: isLoadingCreateSurvey } = useAuthorizedMutation({
    urlPath: API_PATH.SECURE.SURVEY.ROOT,
    method: API_REQUEST_METHODS.POST,
    reactQueryOptions: {
      onSuccess: () => {
        toast.success("Survey baru berhasil dibuat");
        navigation?.navigate("SurveyList");
      },
      onError: (err) => {
        toast.error(ERROR_MESSAGE[err?.message] ?? ERROR_MESSAGE?.INTERNAL_SERVER_ERROR);
      },
    },
  });

  const { mutate: updateSurvey, isLoading: isLoadingUpdateSurvey } = useAuthorizedMutation({
    urlPath: API_PATH.SECURE.SURVEY.ID(route?.params?.surveyData?.id),
    method: API_REQUEST_METHODS.PUT,
    reactQueryOptions: {
      onSuccess: () => {
        toast.success("Survey berhasil dirubah");
        navigation?.navigate("SurveyList");
      },
      onError: (err) => {
        toast.error(ERROR_MESSAGE[err?.message] ?? ERROR_MESSAGE?.INTERNAL_SERVER_ERROR);
      },
    },
  });

  const { data: toolsList, isLoading: isLoadingToolsList } = useAuthorizedQuery({
    urlPath: API_PATH.SECURE.TOOLS.FILTER({ search: "" }),
    reactQueryOptions: {
      enabled: true,
      onError: (err) => {
        toast.error(ERROR_MESSAGE[err?.message] ?? ERROR_MESSAGE?.INTERNAL_SERVER_ERROR);
      },
    },
  });

  const onSubmit = () => {
    const payload = {
      name: form?.name,
      description: form?.description,
      survey_procedure: form?.surveyProcedure,
      report_template: form?.reportTemplate,
      tools:
        toolsList?.data?.filter((tool) => {
          return form?.tools?.some((toolId) => toolId === tool?.id);
        }) ?? "",
    };

    if (route?.params?.surveyData) {
      updateSurvey(payload);
    } else {
      createSurvey(payload);
    }
  };

  const onChange = useCallback((value, key) => {
    setForm((oldVal) => {
      return {
        ...oldVal,
        [key]: value,
      };
    });
  }, []);

  useEffect(() => {
    if (route?.params?.surveyData) {
      const surveyData = route?.params?.surveyData;
      setForm({
        name: surveyData?.name ?? "",
        description: surveyData?.description ?? "",
        surveyProcedure: surveyData?.survey_procedure ?? "",
        reportTemplate: surveyData?.report_template ?? "",
        tools: surveyData?.tools?.map((tool) => tool?.id) ?? [],
      });
    }
  }, [route?.params]);

  return (
    <>
      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 100}
        style={styles.container}
      >
        {isLoadingCreateSurvey || isLoadingUpdateSurvey || isLoadingToolsList ? (
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView contentContainerStyle={styles.scrollViewContentContainer} keyboardShouldPersistTaps="handled">
            <View style={styles.formContainer}>
              <InputText onChange={onChange} name="name" value={form?.name} label="Nama Survey" placeholder="Nama Survey" />
              <MultiSelectDropdown
                data={toolsList?.data?.map((tool) => ({ label: tool?.name, value: tool?.id, description: tool?.description }))}
                onChange={onChange}
                name="tools"
                value={form?.tools}
                searchPlaceholder="Cari Peralatan"
                label="Peralatan"
                placeholder="Peralatan"
                renderSelectedItem={(e, unSelect) => {
                  return (
                    <View style={styles.multiSelectSelectedItemContainer}>
                      <View>
                        <Text style={styles.multiSelectLabel}>{e?.label}</Text>
                        <Text style={styles.multiSelectDescription}>{e?.description}</Text>
                      </View>
                      <Feather name="x" size={14} color="gray" onPress={() => unSelect(e)} />
                    </View>
                  );
                }}
              />
              <InputText onChange={onChange} name="description" value={form?.description} label="Deskripsi" placeholder="Deskripsi" isRichText />
              <InputText
                onChange={onChange}
                name="surveyProcedure"
                value={form?.surveyProcedure}
                label="Prosedur Survey"
                placeholder="Prosedur Survey"
                isRichText
              />
              <InputText
                onChange={onChange}
                name="reportTemplate"
                value={form?.reportTemplate}
                label="Template Report"
                placeholder="Template Report"
                isRichText
                richTextOption={{
                  scrollable: true,
                }}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View style={styles.CTAContainer}>
        <PrimaryButton
          onPress={onSubmit}
          title={"Simpan"}
          customStyle={styles.CTACustomStyle}
          fullWidth
          disabled={isLoadingCreateSurvey || isLoadingUpdateSurvey || isLoadingToolsList}
        />
      </View>
    </>
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
  CTACustomStyle: { marginTop: 12 },
});
