import { useCallback, useEffect, useState } from "react";
import { Platform, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";

import { PrimaryButton } from "@components";
import RenderHtml from "react-native-render-html";
import { generatePdfHtml } from "@utils";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";
import dayjs from "dayjs";
import { toast } from "sonner-native";

export const ReportDetail = ({ navigation, route }) => {
  const { width } = useWindowDimensions();
  const [source, setSource] = useState("<div></div>");

  async function saveFile(uri, filename, mimetype) {
    if (Platform.OS === "android") {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
          })
          .catch((e) => console.log(e));
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  }

  const generatePdf = useCallback(async () => {
    try {
      const file = await printToFileAsync({
        html: source,
        base64: true,
        margins: {
          left: 20,
          top: 50,
          right: 20,
          bottom: 100,
        },
      });
      const filename = `laporan_${route?.params?.reportData?.ship_name}_${dayjs(route?.params?.reportData?.date)?.format("DD_MM_YYYY")}`;

      await saveFile(file?.uri, filename, "application/pdf");
      toast.success("Laporan berhasil di simpan");
    } catch (error) {
      toast.error("Gagal menyimpan laporan");
    }
  }, [source]);

  useEffect(() => {
    if (route?.params?.reportData) {
      const { ship_name: shipName, survey, location: address, date, created_by, description } = route?.params?.reportData;

      const content = generatePdfHtml(shipName, survey?.name, address, dayjs(date)?.format("DD MMMM YYYY"), created_by?.name, description);

      setSource(content);
    }
  }, [route?.params?.reportData]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        <View style={styles.formContainer}>
          <RenderHtml
            tagsStyles={{
              body: {
                fontFamily: "Roboto, sans-serif",
              },
              table: {
                fontFamily: "Arial, sans-serif",
                borderCollapse: "collapse",
                // width: "100%",
              },
              th: {
                borderWidth: 1,
                borderColor: "#dddddd",
                textAlign: "left",
                padding: 8,
              },
              td: {
                borderWidth: 1,
                borderColor: "#dddddd",
                textAlign: "left",
                padding: 8,
                // maxWidth: '40px',
              },
              tr: {
                backgroundColor: "transparent",
              },
              "tr:nth-child(even)": {
                backgroundColor: "#dddddd",
              },
            }}
            classesStyles={{
              headerTitle: {
                textAlign: "center",
                marginbottom: "4px",
              },
              address: {
                textAlign: "center",
                marginTop: -10,
              },
              date: {
                textAlign: "center",
                marginTop: -20,
              },
              descriptionContainer: {
                marginTop: "20px",
              },
              surveyorInfo: {
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: "100px",
              },
              signatureContainer: {
                width: "150px",
                height: "150px",
              },
              centerText: {
                textAlign: "center",
              },
              surveyorTitle: {
                textAlign: "center",
                marginBottom: 70,
              },
            }}
            contentWidth={width}
            source={{ html: source }}
          />
        </View>
      </ScrollView>
      <View style={styles.CTAContainer}>
        <PrimaryButton title={"Download Laporan"} onPress={generatePdf} />
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
    padding: 20,
    paddingTop: 32,
  },
  formContainer: { gap: 20 },
  CTAContainer: { paddingHorizontal: 20, paddingBottom: 21, paddingTop: 12 },
});
