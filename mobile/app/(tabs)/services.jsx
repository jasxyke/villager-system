import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import TabsGradient from "../../components/gradients/TabsGradient";
import AppHeader from "../../components/common/AppHeader";
import { colors } from "../../styles/colors";
import { router } from "expo-router";

const services = () => {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <View style={styles.centered}>
        <TabsGradient />
        <ActivityIndicator size="large" color={"white"} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TabsGradient />
      <AppHeader />
      <View className="p-6">
        <Text style={styles.title}>Services</Text>
        {/* navigate to booking */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("../booking")}
        >
          <Text style={styles.buttonText}>Bookings</Text>
        </TouchableOpacity>
        {/* navigate to car stickers */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("../car-stickers")}
        >
          <Text style={styles.buttonText}>Get a Car Sticker</Text>
        </TouchableOpacity>
        {/* navigate to clearance requests */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("../clearances")}
        >
          <Text style={styles.buttonText}>Request a Clearance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("../home-tab/complaint")}
        >
          <Text style={styles.buttonText}>Send a Complaint</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
    alignItems: "center",
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 30,
  },
});

export default services;
