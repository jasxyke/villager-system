import React, { useEffect } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../../styles/colors";
import TabsGradient from "../../../components/gradients/TabsGradient";
import { useAuthContext } from "../../../context/AuthContext";
import useFetchPaymentHistory from "../../../hooks/stickers/usePaymentHistory";

const CurrentStickers = () => {
  const { payments, loading, error, fetchPayments } = useFetchPaymentHistory();
  const { user } = useAuthContext();

  // Dummy data for demonstration purposes
  const dummyPayments = [
    {
      id: 1,
      payment_date: "2024-12-01",
      car_sticker_request: {
        car_model: "Toyota Corolla",
        car_plate_number: "ABC1234",
      },
      amount: "1500",
      status: "Approved",
    },
    {
      id: 2,
      payment_date: "2024-11-15",
      car_sticker_request: {
        car_model: "Honda Civic",
        car_plate_number: "XYZ5678",
      },
      amount: "2000",
      status: "Pending",
    },
    {
      id: 3,
      payment_date: "2024-10-20",
      car_sticker_request: {
        car_model: "Ford Mustang",
        car_plate_number: "MUS1234",
      },
      amount: "3000",
      status: "Rejected",
    },
  ];

  useEffect(() => {
    if (user) {
      fetchPayments(user.resident.id); // Fetch car sticker payment history
    }
  }, [user]);

  const handleShowDetailedView = (sticker) => {
    console.log("Selected Sticker:", sticker);
    router.push("./StickerDetailsView"); // Navigate to details page
  };

  const renderPaymentItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleShowDetailedView(item)}
    >
      <Text style={styles.cardTitle}>{item.payment_date}</Text>
      <View style={styles.cardContent}>
        <Text style={styles.cardText}>
          <Text style={styles.cardLabel}>Car Model:</Text>{" "}
          {item.car_sticker_request.car_model}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.cardLabel}>Car Plate Number:</Text>{" "}
          {item.car_sticker_request.car_plate_number}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.cardLabel}>Amount:</Text> PHP {item.amount}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.cardLabel}>Status:</Text> {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const displayPayments = payments.length > 0 ? payments : dummyPayments;

  return (
    <View style={{ flex: 1 }}>
      <TabsGradient />
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Current Car Sticker</Text>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{ marginTop: 20 }}
          />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <FlatList
            data={displayPayments}
            renderItem={renderPaymentItem}
            keyExtractor={(item) => item.id.toString()}
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
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  noPaymentsText: {
    color: colors.white,
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default CurrentStickers;
