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
import useFetchApprovedStickerRequests from "../../../hooks/stickers/useApprovedStickers";
import { formatName, formatToReadableDate } from "../../../utils/DataFormatter";

const CurrentStickers = () => {
  const { approvedStickerRequests, loading, error, refetch } =
    useFetchApprovedStickerRequests();
  const { user } = useAuthContext();

  // Fetch approved sticker requests when the user is available
  useEffect(() => {
    if (user) {
      refetch(user.resident.id);
    }
  }, [user]);

  const handleShowDetailedView = (sticker) => {
    router.push({
      pathname: "./StickerDetailsView",
      params: { stickerId: sticker.id },
    }); // Navigate to details page
  };

  const renderStickerItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleShowDetailedView(item)}
    >
      <Text style={styles.cardTitle}>
        {formatToReadableDate(item.approval_date)}
      </Text>
      <View style={styles.cardContent}>
        <Text style={styles.cardText}>
          <Text style={styles.cardLabel}>Car Model:</Text> {item.car_model}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.cardLabel}>Car Plate Number:</Text>{" "}
          {item.car_plate_number}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.cardLabel}>Status:</Text>{" "}
          {formatName(item.request_status)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <TabsGradient />
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Approved Car Stickers</Text>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{ marginTop: 20 }}
          />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : approvedStickerRequests.length > 0 ? (
          <FlatList
            data={approvedStickerRequests}
            renderItem={renderStickerItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.stickerList}
          />
        ) : (
          <Text style={styles.noStickersText}>
            No approved car stickers available.
          </Text>
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
  stickerList: {
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  noStickersText: {
    color: colors.white,
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default CurrentStickers;
