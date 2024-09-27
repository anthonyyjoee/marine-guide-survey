import React, { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import { AnchorSVG } from "@assets";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Row } from "../Row";
import { Col } from "../Col";
import dayjs from "dayjs";

export const ReportItem = ({ item, navigation }) => {
  const onPress = useCallback(
    (item) => {
      navigation?.navigate("ReportDetail", { reportData: item });
    },
    [navigation]
  );

  return (
    <TouchableOpacity style={styles.bottomSheetMenu} activeOpacity={0.8} onPress={() => onPress(item)}>
      <Row gap={8}>
        <Col span={24}>
          <View style={styles.titleWrapper}>
            <View>
              <Text style={{ fontWeight: "500", marginBottom: 12 }}>{item?.ship_name ?? ""}</Text>
              <Row>
                <Col span={8}>
                  <View>
                    <Text style={{ fontWeight: "400", color: "#A3A6AE", fontSize: 11 }}>Dibuat Oleh:</Text>
                    <Text style={{ fontWeight: "500", fontSize: 11 }}>{item?.created_by?.name ?? ""}</Text>
                  </View>
                </Col>
                <Col span={8}>
                  <View>
                    <Text style={{ fontWeight: "400", color: "#A3A6AE", fontSize: 11 }}>Lokasi:</Text>
                    <Text style={{ fontWeight: "500", fontSize: 11 }}>
                      {item?.location?.length > 13 ? item?.location.substring(0, 13) + "..." : item?.location}
                    </Text>
                  </View>
                </Col>
                <Col span={8}>
                  <View>
                    <Text style={{ fontWeight: "400", color: "#A3A6AE", fontSize: 11 }}>Tanggal:</Text>
                    <Text style={{ fontWeight: "500", fontSize: 11 }}>{dayjs(item?.date).format("DD MMM YYYY") ?? ""}</Text>
                  </View>
                </Col>
              </Row>
            </View>
          </View>
        </Col>
      </Row>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bottomSheetMenu: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bottomSheetMenuText: {
    fontSize: 12,
    fontWeight: "400",
  },
});
