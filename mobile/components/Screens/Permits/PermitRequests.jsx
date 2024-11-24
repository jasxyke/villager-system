import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { colors } from "../../../styles/colors";

const PermitRequests = () => {
  // Example permit requests data
  const permitRequests = [
    {
      resident_name: "John Doe",
      purpose: "Building a shed",
      // floor_size: 20,
      permit_status: "pending",
      application_date: "2024-08-15",
      approval_date: null,
    },
    {
      resident_name: "Jane Smith",
      purpose: "Extending a patio",
      // floor_size: 35,
      permit_status: "approved",
      application_date: "2024-08-10",
      approval_date: "2024-08-20",
    },
    // Add more dummy data as needed
  ];

  // Render item for FlatList
  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.purpose}</Text>
        <View style={styles.cardContent}>
          <Text style={styles.cardText}>
            <Text style={styles.cardLabel}>Floor Size:</Text> {item.floor_size}{" "}
            m²
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.cardLabel}>Status:</Text> {item.permit_status}
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.cardLabel}>Application Date:</Text>{" "}
            {item.application_date}
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.cardLabel}>Approval Date:</Text>{" "}
            {item.approval_date || "N/A"}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Permit Requests</Text>
      <FlatList
        data={permitRequests}
        renderItem={renderItem}
        keyExtractor={(item, index) => `permit-${index}`}
        contentContainerStyle={styles.permitRequestsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    // backgroundColor: colors.white,
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
    color: "white",
  },
  cardLabel: {
    fontWeight: "bold",
  },
  permitRequestsList: {
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

export default PermitRequests;
