import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../../styles/colors";
import TabsGradient from "../../../components/gradients/TabsGradient";
import usePendingCarStickerRequests from "../../../hooks/stickers/usePendingCarStickerRequests"; // Adjust the import path
import { useAuthContext } from "../../../context/AuthContext";

const CarStickerRequests = () => {
  const { requests, loading, error, fetchPendingRequests } =
    usePendingCarStickerRequests();
  useEffect(() => {
    fetchPendingRequests();
  }, []);
  const renderRequestItem = ({ item }) => (
    <View style={styles.requestItem}>
      <Text style={styles.boldText}>
        Request Date:{" "}
        <Text style={styles.requestText}>{item.application_date}</Text>
      </Text>
      <Text style={styles.boldText}>
        Car Model: <Text style={styles.requestText}>{item.car_model}</Text>
      </Text>
      <Text style={styles.boldText}>
        Car Plate Number:{" "}
        <Text style={styles.requestText}>{item.car_plate_number}</Text>
      </Text>
      <Text style={styles.boldText}>
        Status: <Text style={styles.requestText}>{item.request_status}</Text>
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <TabsGradient />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.white} />
        ) : error ? (
          <Text style={styles.noRequestsText}>{error}</Text>
        ) : requests.length > 0 ? (
          <FlatList
            data={requests}
            renderItem={renderRequestItem}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <Text style={styles.noRequestsText}>No requests found.</Text>
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
  requestItem: {
    backgroundColor: colors.green,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  boldText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  requestText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "normal",
  },
  noRequestsText: {
    color: colors.white,
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default CarStickerRequests;
