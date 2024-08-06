import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import TabsGradient from "../../components/gradients/TabsGradient";
import { colors } from "../../styles/colors";
import AppHeader from "../../components/common/AppHeader";

const Bills = () => {
  return (
    <View style={styles.container}>
      <TabsGradient />
      <AppHeader />
      <Text style={styles.txtBalance}>₱1,000,000</Text>
      <Text style={styles.txtTitleBalance}>Balance</Text>

      <View style={styles.paymentContainer}>
        <View style={styles.paymentBox}>
          <View style={styles.paymentDetails}>
            <Text style={styles.txtNumber}>0912 345 6789</Text>
            <Text style={styles.txtModePayment}>Gcash</Text>
          </View>
          <TouchableOpacity style={styles.qrButton}>
            <Text style={styles.txtViewQR}>View QR</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.monthlyPaymentContainer}>
        <View style={styles.monthlyPaymentHistory}>
          <Text>Monthly Payment</Text>
          <Text>June Bill</Text>
          <Text>PHP 500.000</Text>
          <Text>Balance: </Text>
          <Text>Paid: </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  txtBalance: {
    fontSize: 40,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 40,
  },

  txtTitleBalance: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },

  paymentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 20,
  },

  paymentBox: {
    width: 350,
    height: 125,
    backgroundColor: "#344C11",
    borderRadius: 20,
    opacity: 0.8,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  paymentDetails: {
    flex: 1,
  },

  txtNumber: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },

  txtModePayment: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },

  qrButton: {
    width: 150,
    height: 60,
    backgroundColor: "#AEC09A",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8,
    padding: 10,
  },

  txtViewQR: {
    color: "black",
    fontWeight: "bold",
  },

  monthlyPaymentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 20,
  },

  monthlyPaymentHistory: {
    width: 350,
    height: 275,
    backgroundColor: colors.primary,
    borderRadius: 20,
    opacity: 0.8,
    padding: 20,
    alignItems: "center",
  },
});

export default Bills;
