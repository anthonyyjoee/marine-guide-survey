import { useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import Entypo from "@expo/vector-icons/Entypo";

import { ReportTemplateModal } from "../ReportTemplateModal";

const MIN_HEIGHT = 70;

export const InputText = ({ onChange, value, placeholder = "", label, type, name, multiline, style, disabled, isRichText, richTextOption }) => {
  const richTextRef = useRef();

  const [height, setHeight] = useState(isRichText ? 70 : 25);
  const [templateModalVisible, setTemplateModalVisible] = useState(false);
  const [isHidePassword, setIsHidePassword] = useState(true);

  const contentStyle = useMemo(() => {
    return {
      cssText: `p {font-size: 14px} span {font-size: 14px} div {font-size: 14px} table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%; } tr:nth-child(even) { background-color: #F9F9F9; } tr td { border: 1px solid #dddddd; padding: 8px }`,
    };
  }, []);

  const generateTD = (column, curentRow) => {
    let td = Array.from({ length: column }, (_, i) => {
      if (i === 0) {
        return `<td style='max-width: 40px'>${curentRow === 0 ? "No" : curentRow}</td>`;
      } else {
        return "<td style='min-width: 30px'></td>";
      }
    });
    return td;
  };

  const generateTable = (row, column) => {
    let tr = Array.from({ length: row }, (_, i) => `<tr>${generateTD(column, i).join("")}</tr>`);
    let table = `<table border='1'>${tr.join("")}</table>`;

    return table;
  };

  return (
    <View>
      {label ? <Text style={{ marginBottom: 4, fontWeight: "400", fontSize: 12 }}>{label}</Text> : null}
      {isRichText ? (
        <View style={styles.richTextContainer}>
          <ReportTemplateModal
            visible={templateModalVisible}
            onClose={() => setTemplateModalVisible(false)}
            onPress={(row, col) => {
              const html = generateTable(row, col);
              richTextRef.current.insertHTML(html);
              setTemplateModalVisible(false);
            }}
          />

          <RichToolbar
            selectedIconTint={"#3C6EC5"}
            style={styles.toolbar}
            getEditor={() => richTextRef?.current}
            table={() => {
              setTemplateModalVisible(true);
            }}
            iconMap={{
              [actions.heading1]: ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>,
              [actions.heading2]: ({ tintColor }) => <Text style={{ color: tintColor }}>H2</Text>,
              [actions.heading3]: ({ tintColor }) => <Text style={{ color: tintColor }}>H3</Text>,
              [actions.setParagraph]: ({ tintColor }) => <Text style={{ color: tintColor }}>P</Text>,
            }}
            actions={[
              actions.setParagraph,
              actions.heading1,
              actions.heading2,
              actions.heading3,
              actions.alignLeft,
              actions.alignCenter,
              actions.alignFull,
              actions.alignRight,
              actions.setBold,
              actions.removeFormat,
              actions.setItalic,
              actions.setUnderline,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.table,
              actions.keyboard,
              actions.undo,
              actions.redo,
            ]}
          />
          <RichEditor
            ref={richTextRef}
            editorStyle={contentStyle}
            initialContentHTML={value}
            initialHeight={richTextOption?.scrollable ? 0 : 100}
            scrollEnabled
            showsHorizontalScrollIndicator
            showsVerticalScrollIndicator
            useContainer={richTextOption?.scrollable ? false : true}
            containerStyle={
              richTextOption?.scrollable
                ? { minHeight: richTextOption?.minHeight ?? 250, maxHeight: richTextOption?.maxHeight ?? 250 }
                : { minHeight: 100 }
            }
            style={[disabled ? styles.disabledInput : {}, style]}
            onChange={(val) => onChange(val, name)}
          />
        </View>
      ) : type === "password" ? (
        <View style={[styles.passwordInput, disabled ? styles.disabledInput : {}]}>
          <TextInput
            name={name}
            style={[{ height: 48, borderRadius: 10 }, { flex: 1 }, style]}
            onChangeText={(value) => onChange(value, name)}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#737373"
            editable={!disabled}
            secureTextEntry={isHidePassword}
          />
          <TouchableOpacity onPress={() => setIsHidePassword((oldVal) => !oldVal)} disabled={disabled}>
            {isHidePassword ? <Entypo name="eye-with-line" size={18} color="black" /> : <Entypo name="eye" size={18} color="black" />}
          </TouchableOpacity>
        </View>
      ) : (
        <TextInput
          onContentSizeChange={(e) => setHeight(e.nativeEvent.contentSize.height + 25)}
          multiline={multiline}
          scrollEnabled={!multiline}
          name={name}
          style={[
            styles.inputBox,
            multiline ? styles.multiLineBox : {},
            multiline ? { height: height > MIN_HEIGHT ? height : MIN_HEIGHT } : {},
            disabled ? styles.disabledInput : {},
            style,
          ]}
          onChangeText={(value) => onChange(value, name)}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#737373"
          editable={!disabled}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    height: 140,
  },
  inputBox: {
    height: 48,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    border: "1px",
    borderColor: "#D3D3D3",
  },
  passwordInput: {
    alignItems: "center",
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    border: "1px",
    borderColor: "#D3D3D3",
    flexDirection: "row",
    paddingHorizontal: 10,
    gap: 10,
  },
  multiLineBox: {
    minHeight: MIN_HEIGHT,
    textAlignVertical: "top",
  },
  disabledInput: {
    backgroundColor: "#f0f0f0",
  },
  richTextContainer: {
    borderWidth: 1,
    borderRadius: 10,
    border: "1px",
    borderColor: "#D3D3D3",
    overflow: "hidden",
  },
});
