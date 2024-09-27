import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { MultiSelect } from "react-native-element-dropdown";
import FeatherIcon from "react-native-vector-icons/Feather";
import Feather from "@expo/vector-icons/Feather";

export const MultiSelectDropdown = ({ data = [], value, placeholder, searchPlaceholder, onChange, label, name, renderSelectedItem }) => {
  return (
    <View>
      {label ? <Text style={{ marginBottom: 4, fontWeight: "400", fontSize: 12 }}>{label}</Text> : null}
      <MultiSelect
        selectedStyle={styles.selectedOptionsStyle}
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data ?? []}
        maxHeight={300}
        search
        searchQuery={(keyword, lblValue) => lblValue.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())}
        labelField="label"
        valueField="value"
        dropdownPosition="bottom"
        activeColor="#2d61eb"
        placeholder={placeholder}
        searchPlaceholder={searchPlaceholder ?? "Cari"}
        value={value}
        renderSelectedItem={
          renderSelectedItem
            ? renderSelectedItem
            : (e, unSelect) => {
                return (
                  <View style={styles.selectedItemContainer}>
                    <Text style={{ fontSize: 12 }}>{e?.label}</Text>
                    <Feather name="x" size={14} color="gray" onPress={() => unSelect(e)} />
                  </View>
                );
              }
        }
        renderItem={(item, selected) => (
          <Text style={[styles.multiSelectItem, selected ? styles.activeSelectedItemStyle : styles.itemStyle]}>{item.label}</Text>
        )}
        onChange={(item) => {
          onChange(item, name);
        }}
        renderRightIcon={() => <FeatherIcon color="#D3D3D3" name="chevron-down" size={20} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 48,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    border: "1px",
    borderColor: "#D3D3D3",
    paddingLeft: 12,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  placeholderStyle: {
    color: "#C5C5C7",
    fontSize: 14,
  },

  inputSearchStyle: {
    height: 40,
    color: "black",
    fontSize: 14,
  },
  selectedOptionsStyle: {
    borderRadius: 25,
    backgroundColor: "red",
    color: "white",
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  multiSelectItem: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  activeSelectedItemStyle: {
    color: "white",
  },
  itemStyle: {
    color: "#2D3748",
  },
  selectedItemContainer: {
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#EDF2FB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 3,
  },
});
