import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppHeader from "../../components/common/AppHeader";
import TabsGradient from "../../components/gradients/TabsGradient";
import { colors } from "../../styles/colors";

const Permits = () => {
  const handleShowRequests = () => {
    router.navigate("../permits/requests");
  };

  const handleShowPermitForm = () => {
    router.navigate("../forms/permit-form");
  };

  const handleShowPayment = () => {
    router.navigate("../permits/history");
  };

  const handleShowCurrentPermit = () => {
    router.navigate("../permits/current-permits");
  };

  return (
    <View style={styles.safeArea}>
      <TabsGradient />
      <AppHeader />
      <View style={styles.content}>
        <>
          <Text style={styles.title}>House Permits</Text>
          <TouchableOpacity
            style={[styles.button]}
            onPress={handleShowPermitForm}
          >
            <Text style={styles.buttonText}>Request a Permit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button]}
            onPress={handleShowRequests}
          >
            <Text style={styles.buttonText}>Pending Requests</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button]} onPress={handleShowPayment}>
            <Text style={styles.buttonText}>Payment History</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button]}
            onPress={handleShowCurrentPermit}
          >
            <Text style={styles.buttonText}>Current Permits</Text>
          </TouchableOpacity>
        </>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 25,
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
  requestButton: {
    backgroundColor: colors.primary,
  },
  pendingButton: {
    backgroundColor: colors.primary, // Adjust if needed
  },
  paymentHistoryButton: {
    backgroundColor: colors.primary, // Adjust if needed
  },
});

export default Permits;
