import { StyleSheet, TextInput } from "react-native";
import React from "react";

const Input = ({
  placeholder,
  secureTextEntry,
  onChangeText,
  autoCapitalize,
  multiline,
  value,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      style={styles.textInput}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize}
      multiline={multiline}
      value={value}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    marginHorizontal: 20,
    padding: 10,
    marginBottom: 25,
    borderBottomWidth: 0.9,
    borderBottomColor: "gray",
  },
});
