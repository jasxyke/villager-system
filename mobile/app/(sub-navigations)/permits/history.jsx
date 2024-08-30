import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { colors } from "../../../styles/colors";
import TabsGradient from "../../../components/gradients/TabsGradient";

const PaymentHistory = () => {
  // Example data for payments
  const payments = [
    {
      payment_date: "2024-08-01",
      payment_status: "Completed",
      amount: 150.0,
    },
    {
      payment_date: "2024-08-15",
      payment_status: "Pending",
      amount: 75.5,
    },
    {
      payment_date: "2024-08-20",
      payment_status: "Failed",
      amount: 120.0,
    },
    {
      payment_date: "2024-08-25",
      payment_status: "Completed",
      amount: 200.0,
    },
    // Add more sample data as needed
  ];

  // Render item for FlatList
  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.payment_date}</Text>
        <View style={styles.cardContent}>
          <Text style={styles.cardText}>
            <Text style={styles.cardLabel}>Status:</Text> {item.payment_status}
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.cardLabel}>Amount:</Text> PHP {item.amount}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <TabsGradient />
      <View style={styles.container}>
        <FlatList
          data={payments}
          renderItem={renderItem}
          keyExtractor={(item, index) => `payment-${index}`}
          contentContainerStyle={styles.paymentHistoryList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    // borderRadius: 5,
    // borderWidth: 1,
    // borderColor: colors.primary,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.white,
    borderColor: "white",
    borderBottomWidth: 1,
  },
  card: {
    backgroundColor: colors.green,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 10,
  },
  cardContent: {
    marginVertical: 10,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 8,
    color: colors.white,
  },
  cardLabel: {
    fontWeight: "bold",
  },
  paymentHistoryList: {
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
  },
});

export default PaymentHistory;
