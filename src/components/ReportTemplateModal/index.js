import { useState } from "react";
import { Button, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, View } from "react-native";

import Feather from "@expo/vector-icons/Feather";

import { PrimaryButton } from "../PrimaryButton";

export const ReportTemplateModal = ({ visible, onClose, onPress }) => {
  const [formValue, setFormValue] = useState({
    column: 0,
    row: 0,
  });

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}>
          <View style={styles.modalView}>
            <View style={styles.headerContainer}>
              <Text style={styles.modalTitle}>Buat Tabel</Text>
              <Feather name="x" size={14} color="gray" onPress={onClose} />
            </View>
            <View style={styles.formContainer}>
              <View>
                <Text style={styles.label}>Baris</Text>
                <TextInput
                  style={[styles.inputBox]}
                  value={formValue.row}
                  placeholder="Baris"
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    setFormValue((oldVal) => ({
                      ...oldVal,
                      row: value,
                    }))
                  }
                />
              </View>
              <View>
                <Text style={styles.label}>Kolom</Text>
                <TextInput
                  style={[styles.inputBox]}
                  value={formValue.column}
                  placeholder="Kolom"
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    setFormValue((oldVal) => ({
                      ...oldVal,
                      column: value,
                    }))
                  }
                />
              </View>
            </View>
            <PrimaryButton
              disabled={!formValue.column || !formValue.row || formValue.column == 0 || formValue.row == 0}
              fullWidth
              onPress={() => onPress(formValue.row, formValue.column)}
              customStyle={styles.button}
              title="Generate"
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    height: 140,
  },
  label: { marginBottom: 4, fontWeight: "400", fontSize: 12 },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  inputBox: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    border: "1px",
    borderColor: "#D3D3D3",
  },
  modalTitle: {
    fontWeight: "600",
    fontSize: 16,
  },
  button: { height: 40 },
  formContainer: {
    gap: 12,
    marginBottom: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 12,
    width: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
