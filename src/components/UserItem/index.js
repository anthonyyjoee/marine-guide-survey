import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Row } from "../Row";
import { Col } from "../Col";

export const UserItem = ({ item, navigation }) => (
  <TouchableOpacity activeOpacity={0.8} style={styles.userItemContainer} onPress={() => navigation?.navigate("CreateUser", { userData: item })}>
    <Row gap={8}>
      <Col span={24}>
        <View>
          <Text style={{ fontWeight: "500", marginBottom: 12 }}>{item?.name ?? ""}</Text>
          <Row>
            <Col span={8}>
              <View>
                <Text style={{ fontWeight: "400", color: "#A3A6AE", fontSize: 11 }}>Role:</Text>
                <Text style={{ fontWeight: "500", fontSize: 11 }}>{item?.role ?? ""}</Text>
              </View>
            </Col>
            <Col span={8}>
              <View>
                <Text style={{ fontWeight: "400", color: "#A3A6AE", fontSize: 11 }}>Unit Kerja:</Text>
                <Text style={{ fontWeight: "500", fontSize: 11 }}>{item?.work_unit?.name ?? "?"}</Text>
              </View>
            </Col>
            <Col span={8}>
              <View>
                <Text style={{ fontWeight: "400", color: "#A3A6AE", fontSize: 11 }}>Dibuat Oleh:</Text>
                <Text style={{ fontWeight: "500", fontSize: 11 }}>{item?.created_by?.name ?? "Sistem"}</Text>
              </View>
            </Col>
          </Row>
        </View>
      </Col>
    </Row>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  userItemContainer: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#EDF2FB",
  },
  mainInfoContainer: {
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontWeight: "500",
    fontSize: 16,
  },
  roleText: {
    fontSize: 13,
    color: "white",
  },
  roleWrapper: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: "#3C6EC5",
    borderRadius: 4,
  },
  userCreatedBy: {
    fontSize: 13,
    color: "gray",
  },
});
