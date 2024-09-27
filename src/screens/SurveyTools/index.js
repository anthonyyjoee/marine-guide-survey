import { InputText, ToolsItem } from "@components";
import { FlatList, StyleSheet, Text, useWindowDimensions, View } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import RenderHtml from "react-native-render-html";

export const SurveyTools = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <View style={{ padding: 20 }}>
        <InputText value={route?.params?.surveyData?.name} label="Nama Survey" placeholder="Nama Survey" disabled />
        <View style={{marginTop: 24}}>
          <Text style={{marginBottom: 4, fontWeight: "400", fontSize: 12 }}>Peralatan</Text>
          <FlatList
            data={route?.params?.surveyData?.tools ?? []}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.scrollViewContentContainer}
            renderItem={({ item }) => <ToolsItem item={item} navigation={navigation} />}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollViewContentContainer: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
