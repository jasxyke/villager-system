import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../../styles/colors";
import TabsGradient from "../../../components/gradients/TabsGradient";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy data for car sticker payments
  useEffect(() => {
    // Simulating an API call with a timeout
    setTimeout(() => {
      setPayments([
        {
          id: 1,
          payment_date: "2024-07-01",
          amount: 50,
          status: "Paid",
          sticker_request: {
            car_model: "Toyota Camry",
            car_plate_number: "XYZ 1234",
          },
        },
        {
          id: 2,
          payment_date: "2024-06-15",
          amount: 75,
          status: "Pending",
          sticker_request: {
            car_model: "Honda Accord",
            car_plate_number: "ABC 5678",
          },
        },
        {
          id: 3,
          payment_date: "2024-05-10",
          amount: 100,
          status: "Paid",
          sticker_request: {
            car_model: "Ford Mustang",
            car_plate_number: "DEF 9012",
          },
        },
        {
          id: 4,
          payment_date: "2024-04-05",
          amount: 80,
          status: "Failed",
          sticker_request: {
            car_model: "Chevrolet Camaro",
            car_plate_number: "GHI 3456",
          },
        },
      ]);
      setLoading(false);
    }, 2000); // Simulate loading delay
  }, []);

  // Render a single payment item
  const renderPaymentItem = ({ item }) => (
    <View style={styles.paymentItem}>
      <Text style={styles.paymentText}>
        <Text style={styles.boldText}>Date:</Text> {item.payment_date}
      </Text>
      <Text style={styles.paymentText}>
        <Text style={styles.boldText}>Car Model:</Text>{" "}
        {item.sticker_request.car_model}
      </Text>
      <Text style={styles.paymentText}>
        <Text style={styles.boldText}>Car Plate Number:</Text>{" "}
        {item.sticker_request.car_plate_number}
      </Text>
      <Text style={styles.paymentText}>
        <Text style={styles.boldText}>Amount:</Text> ${item.amount}
      </Text>
      <Text style={styles.paymentText}>
        <Text style={styles.boldText}>Status:</Text> {item.status}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <TabsGradient />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.white} />
        ) : payments.length > 0 ? (
          <FlatList
            data={payments}
            renderItem={renderPaymentItem}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <Text style={styles.noPaymentsText}>No payments found.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  paymentItem: {
    backgroundColor: colors.green, // Adjust to fit your theme
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  paymentText: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  noPaymentsText: {
    color: colors.white,
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default PaymentHistory;
