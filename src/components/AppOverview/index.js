import { StyleSheet, Text, View } from "react-native";
import { Row } from "../Row";
import { Col } from "../Col";
import { useAuthorizedQuery } from "@hooks";
import { API_PATH, ERROR_MESSAGE } from "@constant";
import { toast } from "sonner-native";
import { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { useIsFocused } from "@react-navigation/native";

export const AppOverview = () => {
  const animation = useRef();
  const isFocused = useIsFocused();

  const {
    data: userList,
    refetch: refetchUserList,
    isLoading: isLoadingUserList,
  } = useAuthorizedQuery({
    urlPath: API_PATH.SECURE.STAFF.FILTER({ search: "" }),
    reactQueryOptions: {
      enabled: true,
      onError: (err) => {
        toast.error(ERROR_MESSAGE[err?.message] ?? ERROR_MESSAGE?.INTERNAL_SERVER_ERROR);
      },
    },
  });

  const {
    data: surveyList,
    refetch: refetchSurveyList,
    isLoading: isLoadingSurveyList,
  } = useAuthorizedQuery({
    urlPath: API_PATH.SECURE.SURVEY.FILTER({ search: "" }),
    reactQueryOptions: {
      enabled: true,
      onError: (err) => {
        toast.error(ERROR_MESSAGE[err?.message] ?? ERROR_MESSAGE?.INTERNAL_SERVER_ERROR);
      },
    },
  });

  const {
    data: workUnitList,
    isLoading: isLoadingWorkUnitList,
    refetch: refetchWorkUnitList,
  } = useAuthorizedQuery({
    urlPath: API_PATH.SECURE.WORK_UNIT.FILTER({ search: "" }),
    reactQueryOptions: {
      enabled: true,
      onError: (err) => {
        toast.error(ERROR_MESSAGE[err?.message] ?? ERROR_MESSAGE?.INTERNAL_SERVER_ERROR);
      },
    },
  });

  useEffect(() => {
    if (isFocused) {
      refetchUserList();
      refetchSurveyList();
      refetchWorkUnitList();
    }
  }, [isFocused]);

  return (
    <View style={styles.appOverview}>
      <Text style={styles.appOverviewTitle}>Ringkasan Aktifitas</Text>
      {isLoadingUserList || isLoadingSurveyList || isLoadingWorkUnitList ? (
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
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
        <Row gutter={8}>
          <Col span={8}>
            <View style={styles.appOverviewItem}>
              <Text style={styles.appOverviewItemNumber}>{userList?.data?.length ?? 0}</Text>
              <Text style={styles.appOverviewItemTitle}>{"Akun Dibuat"}</Text>
            </View>
          </Col>
          <Col span={8}>
            <View style={styles.appOverviewItem}>
              <Text style={styles.appOverviewItemNumber}>{surveyList?.data?.length ?? 0}</Text>
              <Text style={styles.appOverviewItemTitle}>{"Survey Dibuat"}</Text>
            </View>
          </Col>
          <Col span={8}>
            <View style={styles.appOverviewItem}>
              <Text style={styles.appOverviewItemNumber}>{workUnitList?.data?.length ?? 0}</Text>
              <Text style={styles.appOverviewItemTitle}>{"Unit Kerja Dibuat"}</Text>
            </View>
          </Col>
        </Row>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  appOverview: {
    justifyContent: "flex-start",
    padding: 16,
    backgroundColor: "white",
    alignContent: "flex-start",
    borderRadius: 20,
    marginTop: 24,
  },
  appOverviewTitle: {
    marginLeft: 5,
    marginTop: 12,
    marginBottom: 13,
    fontWeight: "400",
  },
  appOverviewWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  appOverviewItem: {
    backgroundColor: "#ECF2FB",
    borderRadius: 10,
    padding: 18,
    marginBottom: 4,
    justifyContent: "center",
    width: "100%",
    height: 130,
  },
  appOverviewItemNumber: { fontSize: 24, fontWeight: "600", padding: 0, color: "#02367B" },
  appOverviewItemTitle: { maxWidth: 65, fontSize: 11, fontWeight: "400", padding: 0 },
});
