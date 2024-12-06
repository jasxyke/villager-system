import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../../styles/colors";
import TabsGradient from "../../../components/gradients/TabsGradient";
import useFetchPaymentHistory from "../../../hooks/stickers/usePaymentHistory";

const PaymentHistory = () => {
  const { payments, loading, error, fetchPayments } = useFetchPaymentHistory();

  useEffect(() => {
    fetchPayments();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.paymentItem}>
      <Text style={styles.paymentText}>
        <Text style={styles.boldText}>Date:</Text> {item.payment_date}
      </Text>
      <Text style={styles.paymentText}>
        <Text style={styles.boldText}>Car Model:</Text>{" "}
        {item.car_sticker_request.car_model}
      </Text>
      <Text style={styles.paymentText}>
        <Text style={styles.boldText}>Car Plate Number:</Text>{" "}
        {item.car_sticker_request.car_plate_number}
      </Text>
      <Text style={styles.paymentText}>
        <Text style={styles.boldText}>Amount:</Text> ${item.amount}
      </Text>
      <Text style={styles.paymentText}>
        <Text style={styles.boldText}>Status:</Text> {item.status}
      </Text>
    </View>
  );

  if (error) {
    return (
      <Text style={{ color: "red", textAlign: "center", marginTop: 20 }}>
        {error}
      </Text>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <TabsGradient />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{ marginTop: 20 }}
          />
        ) : payments.length === 0 ? (
          <Text style={styles.noPaymentsText}>No payments found.</Text>
        ) : (
          <FlatList
            data={payments}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.paymentsList}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 10,
  },
  paymentItem: {
    backgroundColor: colors.green,
    borderRadius: 10,
    marginBottom: 15,
    padding: 20,
    borderWidth: 1,
  },
  paymentText: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  paymentsList: {
    marginBottom: 10,
  },
  noPaymentsText: {
    color: colors.white,
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default PaymentHistory;
