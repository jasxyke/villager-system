// CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from "../../styles/colors";

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.greyGreen,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
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
