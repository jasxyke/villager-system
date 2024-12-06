import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import TabsGradient from "../../../components/gradients/TabsGradient";
import { useAuthContext } from "../../../context/AuthContext";
import { colors } from "../../../styles/colors";
import useFetchApprovedRequests from "../../../hooks/permits/useFetchApprovedRequests";
import { formatName } from "../../../utils/DataFormatter";

const CurrentPermit = () => {
  const { user } = useAuthContext();
  const { approvedRequests, loading, error, refetch } =
    useFetchApprovedRequests(); // Use the hook
  const [refreshing, setRefreshing] = useState(false);

  // Fetch approved requests for the current user when component mounts
  useEffect(() => {
    if (user?.resident.id) {
      refetch(user.resident.id);
    }
  }, [user]);

  const handleShowDetailedView = (permit) => {
    console.log("Selected Permit:", permit);
    router.push("./ClearanceDetailsView"); // Navigate to the details page
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    if (user?.resident.id) {
      await refetch(user.resident.id); // Refetch the data
    }
    setRefreshing(false);
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <TabsGradient />
      <View style={styles.container}>
        {/* FlatList for scrollable list with pull-to-refresh */}
        {loading ? (
          <ActivityIndicator size="large" color={colors.green} />
        ) : approvedRequests.length === 0 ? (
          <Text>No approved permits found.</Text>
        ) : (
          <FlatList
            data={approvedRequests}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => handleShowDetailedView(item)}
              >
                <Text style={styles.cardTitle}>{item.purpose}</Text>
                <View style={styles.cardContent}>
                  <Text style={styles.cardText}>
                    <Text style={styles.cardLabel}>Reference Number:</Text>{" "}
                    {item.reference_number}
                  </Text>
                  <Text style={styles.cardText}>
                    <Text style={styles.cardLabel}>Permit Type:</Text>{" "}
                    {item.permit_type}
                  </Text>
                  <Text style={styles.cardText}>
                    <Text style={styles.cardLabel}>Status:</Text>{" "}
                    {formatName(item.permit_status)}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            refreshing={refreshing}
            onRefresh={handleRefresh} // Pull-to-refresh functionality
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
    color: colors.red,
    textAlign: "center",
    fontSize: 16,
  },
});

export default CurrentPermit;
