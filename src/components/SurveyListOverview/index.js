import { useCallback, useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useIsFocused } from "@react-navigation/native";
import LottieView from "lottie-react-native";

import { Col } from "../Col";
import { Row } from "../Row";

import { useAuthorizedQuery } from "@hooks";
import { AnchorSVG, MenuSVG } from "@assets";
import { API_PATH, ERROR_MESSAGE } from "@constant";
import { useAppContext } from "@context";
import {toast} from "sonner-native";

export const SurveyListOverview = ({ navigation }) => {
  const isFocused = useIsFocused();
  const animation = useRef(null);
  const { isAdmin, userData } = useAppContext();

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

  useEffect(() => {
    if (isFocused) refetchSurveyList();
  }, [isFocused]);

  const onSurveyPressed = useCallback(
    (survey) => {
      if (isAdmin) {
        navigation.navigate("CreateSurvey", { surveyData: survey });
      } else {
        navigation.navigate("SurveyDetail", { surveyData: survey });
      }
    },
    [navigation, isAdmin]
  );

  return (
    <View style={styles.contentWrapper}>
      {isLoadingSurveyList ? (
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
        <Row gutter={[6, 8]}>
          {surveyList?.data?.map((survey) => {
            return (
              <Col span={6} key={survey?.id}>
                <TouchableOpacity onPress={() => onSurveyPressed(survey)} style={styles.surveyItemContainer} key={survey?.id}>
                  <View style={styles.surveyItemWrapper}>
                    <AnchorSVG width={32} height={32} />
                  </View>
                  <Text style={styles.surveyTitle}>{survey?.name}</Text>
                </TouchableOpacity>
              </Col>
            );
          })}
          <Col span={6} key="allSurvey">
            <TouchableOpacity onPress={() => navigation.navigate("SurveyList")} style={styles.surveyItemContainer}>
              <View style={styles.surveyItemWrapper}>
                <MenuSVG width={32} height={32} />
              </View>
              <Text style={styles.surveyTitle}>Semua Survey</Text>
            </TouchableOpacity>
          </Col>
        </Row>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 20,
  },
  surveyItemContainer: {
    width: "100%",
  },
  surveyItemWrapper: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#ECF2FB",
    borderRadius: 10,
    marginBottom: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  surveyTitle: {
    textAlign: "center",
    fontSize: 10,
    fontWeight: "400",
    padding: 0,
  },
});
