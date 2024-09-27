import { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Row } from "../Row";
import { Col } from "../Col";

export const WorkUnitItem = ({ item, navigation }) => {
  const onPress = useCallback(
    (item) => {
      navigation?.navigate("CreateWorkUnit", { workUnitData: item });
    },
    [navigation]
  );

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.workUnitItemContainer} onPress={() => onPress(item)}>
      <Row gap={8}>
        <Col span={24}>
          <View>
            <Text style={{ fontWeight: "500", marginBottom: 12 }}>{item?.name ?? ""}</Text>
            <Row>
              <Col span={12}>
                <View>
                  <Text style={{ fontWeight: "400", color: "#A3A6AE", fontSize: 11 }}>Lokasi:</Text>
                  <Text style={{ fontWeight: "500", fontSize: 11 }}>
                    {item?.address?.length > 13 ? item?.address.substring(0, 13) + "..." : item?.address}
                  </Text>
                </View>
              </Col>
              <Col span={12}>
                <View>
                  <Text style={{ fontWeight: "400", color: "#A3A6AE", fontSize: 11, textAlign: "right" }}>Dibuat Oleh:</Text>
                  <Text style={{ fontWeight: "500", fontSize: 11, textAlign: "right" }}>{item?.created_by?.name ?? ""}</Text>
                </View>
              </Col>
            </Row>
          </View>
        </Col>
      </Row>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  workUnitCreatedBy: {
    fontSize: 13,
    color: "gray",
  },
  workUnitItemContainer: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#EDF2FB",
  },
  workUnitName: {
    fontWeight: "500",
    fontSize: 14,
  },
});
