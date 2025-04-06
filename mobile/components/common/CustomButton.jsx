// CustomButton.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const CustomButton = ({ title, onPress, loading }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={loading}
    >
      <Text style={styles.buttonText}>{loading ? "Submitting..." : title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.greyGreen,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    flex: 1,
    height: 53,
    marginTop: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
  },
});

export default CustomButton;
