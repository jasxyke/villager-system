import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../styles/colors";
import TabsGradient from "../../components/gradients/TabsGradient";
import { useAuthContext } from "../../context/AuthContext";
import useFetchPaymentHistory from "../../hooks/permits/usePaymentHistory";

const CurrentPermit = () => {
  const { payments, loading, error, refetch, message } = useFetchPaymentHistory();
  const { user } = useAuthContext();

  // Dummy permit data for demonstration
  const dummyPermits = [
    { id: 1, type: "Building Permit", status: "Approved", amount: "5000" },
    { id: 2, type: "Construction Supply Permit", status: "Pending", amount: "2000" },
    { id: 3, type: "Car Sticker", status: "Rejected", amount: "500" },
  ];

  const handleShowDetailedView = (permit) => {
    console.log("Selected Permit:", permit);
    router.push("../forms/ClearanceDetailsView"); // Navigate to details page
  };

  useEffect(() => {
    if (user) {
      refetch(user.resident.id); // Fetch payment history when the component mounts
    }
  }, [user]);

  const renderPaymentItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleShowDetailedView(item)} // Demonstrating touchability
    >
      <Text style={styles.cardTitle}>{item.payment_date}</Text>
      <View style={styles.cardContent}>
        <Text style={styles.cardText}>
          <Text style={styles.cardLabel}>Status:</Text> {item.payment_status}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.cardLabel}>Amount:</Text> PHP {item.amount}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderDummyPermitItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleShowDetailedView(item)}
    >
      <Text style={styles.cardTitle}>{item.type}</Text>
      <View style={styles.cardContent}>
        <Text style={styles.cardText}>
          <Text style={styles.cardLabel}>Status:</Text> {item.status}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.cardLabel}>Amount:</Text> PHP {item.amount}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <TabsGradient />
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Payment History</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <FlatList
            data={payments} // Using real payment data here
            renderItem={renderPaymentItem}
            keyExtractor={(item, index) => `payment-${index}`}
            contentContainerStyle={styles.paymentHistoryList}
          />
        )}

        <Text style={styles.sectionTitle}>Permits</Text>
        <FlatList
          data={dummyPermits} // Dummy permits for demonstration
          renderItem={renderDummyPermitItem}
          keyExtractor={(item) => item.id.toString()}
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
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: colors.black,
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

export default CurrentPermit;
