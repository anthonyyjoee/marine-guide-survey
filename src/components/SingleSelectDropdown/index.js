import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { Dropdown } from "react-native-element-dropdown";
import FeatherIcon from "react-native-vector-icons/Feather";

export const SingleSelectDropdown = ({ data = [], value, placeholder, searchPlaceholder, onChange, label, name, disabled }) => {
  return (
    <View>
      {label ? <Text style={{ marginBottom: 4, fontWeight: "400", fontSize: 12 }}>{label}</Text> : null}
      <Dropdown
        autoScroll={false}
        style={[styles.dropdown, disabled ? styles.disabledInput : {}]}
        placeholderStyle={styles.placeholderStyle}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        disable={disabled}
        data={data}
        dropdownPosition="bottom"
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        search
        searchPlaceholder={searchPlaceholder ?? "Cari"}
        searchQuery={(keyword, lblValue) => lblValue.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())}
        onChange={(item) => {
          onChange(item.value, name);
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
  disabledInput: {
    backgroundColor: "#f0f0f0",
  },
});
