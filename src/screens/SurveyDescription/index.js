import { InputText } from "@components";
import { StyleSheet, useWindowDimensions, View } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import RenderHtml from "react-native-render-html";

export const SurveyDescription = ({ navigation, route }) => {
  const { width } = useWindowDimensions();
  const source = {
    html: route?.params?.surveyData?.description,
  };
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        <View style={styles.formContainer}>
          <InputText value={route?.params?.surveyData?.name} label="Nama Survey" placeholder="Nama Survey" disabled />
          <RenderHtml contentWidth={width} source={source} />
        </View>
      </ScrollView>
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
});
