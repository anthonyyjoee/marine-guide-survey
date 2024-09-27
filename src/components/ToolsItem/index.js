import {useCallback} from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const ToolsItem = ({ item, navigation }) => {
  const onPress = useCallback((item) => {
    navigation?.navigate("CreateTools", { toolsData: item })
  }, [navigation]);

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.toolsItemContainer} onPress={() => onPress(item)}>
      <Text style={styles.toolsName}>{item?.name}</Text>
      <Text style={styles.toolsDescription} numberOfLines={1}>{item?.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toolsItemContainer: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#EDF2FB",
  },
  toolsName: {
    fontWeight: "500",
    fontSize: 14,
    marginBottom: 6,
  },
  toolsDescription: {
    fontSize: 13,
    color: "gray",
  },
});
