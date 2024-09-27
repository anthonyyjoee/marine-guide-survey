import { useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import Feather from "@expo/vector-icons/Feather";

import { InputText, MultiSelectDropdown, PrimaryButton, SingleSelectDropdown } from "@components";
import { useAuthorizedMutation, useAuthorizedQuery } from "@hooks";
import { API_PATH, API_REQUEST_METHODS, COLORS, ERROR_MESSAGE } from "@constant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import LottieView from "lottie-react-native";
dayjs.extend(utc);
import { toast } from "sonner-native";

export const CreateReport = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [isShowCalendar, setIsShowCalendar] = useState(false);
  const animation = useRef();

  const [form, setForm] = useState({
    survey_id: "",
    ship_name: "",
    date: dayjs(),
    description: "",
    location: "",
  });

  const {
    data: surveyList,
    refetch: refetchSurveyList,
    isLoading: isLoadingSurveyList,
  } = useAuthorizedQuery({
    urlPath: API_PATH.SECURE.SURVEY.FILTER({ search: "", order_by: true, limit: 7 }),
    reactQueryOptions: {
      enabled: true,
      onError: (err) => {
        toast.error(ERROR_MESSAGE[err?.message] ?? ERROR_MESSAGE?.INTERNAL_SERVER_ERROR);
      },
    },
  });

  const { mutate: createReport, isLoading: isLoadingCreateReport } = useAuthorizedMutation({
    urlPath: API_PATH.SECURE.REPORT.ROOT,
    method: API_REQUEST_METHODS.POST,
    reactQueryOptions: {
      onSuccess: () => {
        toast.success("Laporan Berhasil Dibuat");
        navigation?.navigate("ReportList");
      },
      onError: (err) => {
        toast.error(ERROR_MESSAGE[err?.message] ?? ERROR_MESSAGE?.INTERNAL_SERVER_ERROR);
      },
    },
  });

  const onSubmit = () => {
    const payload = {
      survey_id: form?.survey_id ?? "",
      ship_name: form?.ship_name ?? "",
      date: dayjs(form?.date).utc().format() ?? "",
      description: form?.description ?? "",
      location: form?.location ?? "",
    };

    createReport(payload);
  };

  const onChange = useCallback((value, key) => {
    setForm((oldVal) => {
      return {
        ...oldVal,
        [key]: value,
      };
    });
  }, []);

  const toggleCalendar = useCallback(() => {
    setIsShowCalendar((oldVal) => !oldVal);
  }, [setIsShowCalendar]);

  useEffect(() => {
    const selectedSurvey = surveyList?.data?.find((survey) => survey?.id === form?.survey_id) ?? null;

    if (selectedSurvey) {
      const descriptionTemplate = {
        ...form,
        description: selectedSurvey?.description,
      };

      setForm(descriptionTemplate);
    }
  }, [form?.survey_id]);

  return (
    <>
      {isLoadingSurveyList || isLoadingCreateReport ? (
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
        <>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
            style={[styles.container]}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <ScrollView contentContainerStyle={styles.scrollViewContentContainer} keyboardShouldPersistTaps="handled">
                <View style={styles.formContainer}>
                  <SingleSelectDropdown
                    data={surveyList?.data?.map((unit) => ({ value: unit.id, label: unit.name }))}
                    value={form?.survey_id}
                    placeholder="Nama Survey"
                    searchPlaceholder={"Cari Survey"}
                    onChange={async (val, name) => {
                      setForm({ ...form, survey_id: "" });
                      setTimeout(() => {
                        onChange(val, name);
                      }, 100);
                    }}
                    name="survey_id"
                    label="Pilih Survey"
                  />
                  {form?.survey_id ? (
                    <>
                      <InputText onChange={onChange} name="ship_name" value={form?.ship_name} label="Nama Kapal" placeholder="Nama Kapal" />
                      <View>
                        <Text style={{ marginBottom: 4, fontWeight: "400", fontSize: 12 }}>Tanggal Survey</Text>
                        <TouchableOpacity
                          style={{
                            height: 48,
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 10,
                            border: "1px",
                            borderColor: "#D3D3D3",
                            justifyContent: "center",
                          }}
                          onPress={toggleCalendar}
                        >
                          <Text>{dayjs(form?.date)?.format("DD MMM YYYY")}</Text>
                        </TouchableOpacity>
                      </View>
                      <InputText
                        onChange={onChange}
                        name="location"
                        value={form?.location}
                        label="Lokasi Survey"
                        placeholder="Lokasi Survey"
                        multiline
                      />
                      <InputText
                        onChange={onChange}
                        name="description"
                        value={form?.description}
                        label="Deskripsi Laporan"
                        placeholder="Deskripsi Laporan"
                        isRichText
                      />
                    </>
                  ) : null}
                </View>
              </ScrollView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
          <View style={styles.CTAContainer}>
            <PrimaryButton onPress={onSubmit} title={"Buat Laporan"} customStyle={styles.CTACustomStyle} fullWidth disabled={false} />
          </View>
          <Modal animationType="fade" transparent={true} visible={isShowCalendar} onRequestClose={toggleCalendar}>
            <View style={styles.centeredView} onPress={toggleCalendar}>
              <View style={styles.modalView}>
                <DateTimePicker
                  selectedItemColor={COLORS.primary}
                  dayContainerStyle={{ borderRadius: 12 }}
                  mode="single"
                  date={form?.date}
                  onChange={(params) => {
                    onChange(params.date, "date");
                    toggleCalendar();
                  }}
                />
              </View>
            </View>
          </Modal>
        </>
      )}
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 12,
    paddingHorizontal: 12,
    width: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
