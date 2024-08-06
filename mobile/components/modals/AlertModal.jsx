import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../styles/colors";

const AlertModal = ({ title, message, visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={() => onClose(false)}
      transparent={true}
    >
      <View
        className="flex-1 h-full justify-center items-center"
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      >
        <View className="rounded-lg p-5 h-auto w-[70%] bg-green shadow-lg">
          <Text className="font-pJaldiBold text-white mb-3 text-2xl">
            {title}
          </Text>
          <Text className="font-pRegular text-white text-base text-center">
            {message}
          </Text>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => onClose(false)}
            className="w-[40%] ml-auto p-2 mt-5 bg-paleGreen"
          >
            <Text className="font-pRegular text-base font-bold text-white">
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 5,
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: colors.paleGreen,
  },
});

export default AlertModal;
