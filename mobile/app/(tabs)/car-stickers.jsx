import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import AppHeader from "../../components/common/AppHeader";
import TabsGradient from "../../components/gradients/TabsGradient";
import { colors } from "../../styles/colors";
import { router } from "expo-router";

const carStickers = () => {
  return (
    <View className="flex-1">
      <TabsGradient />
      <AppHeader />
      <View className="p-6">
        <Text style={styles.title}>Car Stickers</Text>

        {/* Button to navigate to Car Sticker Form */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.navigate("../forms/sticker-form")}
        >
          <Text style={styles.buttonText}>Request a Car Sticker</Text>
        </TouchableOpacity>

        {/* Button to navigate to Payment History */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.navigate("../stickers/requests")}
        >
          <Text style={styles.buttonText}>Sticker Requests</Text>
        </TouchableOpacity>

        {/* Button to navigate to Pending Requests */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.navigate("../stickers/history")}
        >
          <Text style={styles.buttonText}>Payment History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    height: "100%",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 30,
  },
  button: {
    backgroundColor: colors.primary, // Adjust color to match your theme
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default carStickers;
