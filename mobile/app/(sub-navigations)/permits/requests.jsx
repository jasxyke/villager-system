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
import { useAuthContext } from "../../../context/AuthContext";
import useFetchPermitRequests from "../../../hooks/permits/useFetchPermitRequests";

const PermitRequests = () => {
  const { permitRequests, loading, error, refetch } = useFetchPermitRequests();
  const { user } = useAuthContext();
  // Fetch permit requests when the component mounts
  useEffect(() => {
    if (user) {
      refetch(user.resident.id);
    }
    // Replace with the actual resident ID
  }, [user.resident.id]);

  // Render item for FlatList
  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.purpose}</Text>
        <View style={styles.cardContent}>
          {/* Conditionally render Floor Size only if it has a valid value */}
          {item.floor_size != null && item.floor_size > 0 && (
            <Text style={styles.cardText}>
              <Text style={styles.cardLabel}>Floor Size:</Text>{" "}
              {item.floor_size} m²
            </Text>
          )}
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

  // Conditional rendering based on loading, error, and data states
  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={{ marginTop: 20 }}
      />
    );
  }

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
        <FlatList
          data={permitRequests}
          renderItem={renderItem}
          keyExtractor={(item, index) => `permit-${index}`}
          contentContainerStyle={styles.permitRequestsList}
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
    // shadowColor: colors.black,
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 6,
    // elevation: 4,
    marginBottom: 15,
    padding: 20,
    borderWidth: 1,
    // borderColor: colors.lightGray,
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
