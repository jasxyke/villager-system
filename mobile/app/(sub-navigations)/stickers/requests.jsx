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

const CarStickerRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy data for car sticker requests
  useEffect(() => {
    // Simulating an API call with a timeout
    setTimeout(() => {
      setRequests([
        {
          id: 1,
          request_date: "2024-07-01",
          sticker_request: {
            car_model: "Toyota Camry",
            car_plate_number: "XYZ 1234",
          },
          status: "Approved",
        },
        {
          id: 2,
          request_date: "2024-06-15",
          sticker_request: {
            car_model: "Honda Accord",
            car_plate_number: "ABC 5678",
          },
          status: "Pending",
        },
        {
          id: 3,
          request_date: "2024-05-10",
          sticker_request: {
            car_model: "Ford Mustang",
            car_plate_number: "DEF 9012",
          },
          status: "Approved",
        },
        {
          id: 4,
          request_date: "2024-04-05",
          sticker_request: {
            car_model: "Chevrolet Camaro",
            car_plate_number: "GHI 3456",
          },
          status: "Rejected",
        },
      ]);
      setLoading(false);
    }, 2000); // Simulate loading delay
  }, []);

  // Render a single request item
  const renderRequestItem = ({ item }) => (
    <View style={styles.requestItem}>
      <Text style={styles.boldText}>
        Request Date:{" "}
        <Text style={styles.requestText}>{item.request_date}</Text>
      </Text>
      <Text style={styles.boldText}>
        Car Model:{" "}
        <Text style={styles.requestText}>{item.sticker_request.car_model}</Text>
      </Text>
      <Text style={styles.boldText}>
        Car Plate Number:{" "}
        <Text style={styles.requestText}>
          {item.sticker_request.car_plate_number}
        </Text>
      </Text>
      <Text style={styles.boldText}>
        Status: <Text style={styles.requestText}>{item.status}</Text>
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <TabsGradient />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.white} />
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
    backgroundColor: colors.green, // Adjust to fit your theme
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  boldText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold", // Make sure only labels are bold
    marginBottom: 5,
  },
  requestText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "normal", // Ensure values are not bold
  },
  noRequestsText: {
    color: colors.white,
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default CarStickerRequests;
