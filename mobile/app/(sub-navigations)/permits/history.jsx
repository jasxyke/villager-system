import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { colors } from "../../../styles/colors";
import TabsGradient from "../../../components/gradients/TabsGradient";
import { useAuthContext } from "../../../context/AuthContext";
import useFetchPaymentHistory from "../../../hooks/permits/usePaymentHistory";

const PaymentHistory = () => {
  const { payments, loading, error, refetch, message } =
    useFetchPaymentHistory();
  const { user } = useAuthContext();
  useEffect(() => {
    if (user) refetch(user.resident.id); // Fetch payment history when component mounts
  }, []);

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
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <FlatList
            data={payments}
            renderItem={renderItem}
            keyExtractor={(item, index) => `payment-${index}`}
            contentContainerStyle={styles.paymentHistoryList}
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
});

export default PaymentHistory;
