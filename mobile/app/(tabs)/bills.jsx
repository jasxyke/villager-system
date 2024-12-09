import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import TabsGradient from "../../components/gradients/TabsGradient";
import { colors } from "../../styles/colors";
import AppHeader from "../../components/common/AppHeader";
import useBills from "../../hooks/useBills";
import { useAuthContext } from "../../context/AuthContext";
import LoadingScreen from "../../components/common/LoadingScreen";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useSettings } from "../../context/SettingsContext";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";

const Bills = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [qrImage, setQrImage] = useState("");

  const { user } = useAuthContext();
  const { settings } = useSettings();
  const { bills, loading, error, refetch, totalBalance } = useBills();

  useEffect(() => {
    if (user) {
      refetch(user.resident.id);
    }
  }, [user]);

  useEffect(() => {
    if (settings) {
      setQrImage(settings.e_wallet_pic_url);
    }
  }, [settings]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch(user.resident.id);
    setRefreshing(false);
  };

  const handleDownload = async () => {
    try {
      // Check and request permissions
      const { granted } = await MediaLibrary.requestPermissionsAsync();
      if (!granted) {
        Alert.alert(
          "Permission Denied",
          "You need to grant permission to save images."
        );
        return;
      }

      // Generate a file URI in the device's FileSystem
      const filename = qrImage.split("/").pop(); // Extract the file name from the URL
      const localUri = FileSystem.cacheDirectory + filename;

      // Download the image to the local file system
      const downloadResumable = FileSystem.createDownloadResumable(
        qrImage,
        localUri
      );
      const { uri } = await downloadResumable.downloadAsync();

      // Save the image to the user's photo album
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);

      Alert.alert("Success", "QR Code saved to your album.");
    } catch (error) {
      console.error("Error downloading image:", error);
      Alert.alert("Error", "An error occurred while downloading the QR code.");
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      <TabsGradient />
      <AppHeader />
      <View style={styles.content}>
        {/* Total Balance Display */}
        <View style={styles.balanceContainer}>
          <FontAwesome6 name="peso-sign" size={40} color="black" />
          <Text style={styles.txtBalance}>
            {totalBalance || "Error calculating total balance"}
          </Text>
        </View>
        <Text style={styles.txtTitleBalance}>Balance</Text>
        {error && <Text style={styles.errorText}>Error loading bills</Text>}

        {/* Payment Info Section */}
        <View style={styles.row}>
          <View style={styles.card}>
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentText}>
                {settings.e_wallet_number || ""}
              </Text>
              <Text style={styles.paymentText}>Gcash</Text>
            </View>
            <TouchableOpacity
              style={styles.qrButton}
              onPress={() => setQrModalVisible(true)}
            >
              <Text style={styles.qrButtonText}>View QR</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bills Section */}
        <View style={styles.billSectionHeader}>
          <Text style={styles.billSectionTitle}>Monthly Bills</Text>
        </View>
        <FlatList
          style={styles.billsList}
          data={bills}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <View style={styles.billContainer}>
              <Text style={styles.billTitle}>
                Bill for{" "}
                {new Date(item.due_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </Text>
              <Text style={styles.billDetail}>Amount: PHP {item.amount}</Text>
              <Text style={styles.billDetail}>
                Due Date: {new Date(item.due_date).toLocaleDateString()}
              </Text>
              <Text style={styles.billDetail}>
                Status:{" "}
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Text>
              <Text style={styles.billDetail}>Balance: PHP {item.balance}</Text>
            </View>
          )}
        />

        {/* QR Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={qrModalVisible}
          onRequestClose={() => setQrModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>QR Code</Text>
              <Image
                source={{ uri: qrImage }}
                style={styles.qrImage}
                resizeMode="contain"
              />
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.downloadButton}
                  onPress={handleDownload}
                >
                  <Text style={styles.downloadButtonText}>Download QR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setQrModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: "center" },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  txtBalance: { fontSize: 40, fontWeight: "bold", marginLeft: 10 },
  txtTitleBalance: { fontSize: 16, color: colors.white, marginVertical: 10 },
  errorText: { color: "red" },
  row: { width: "90%", marginVertical: 20 },
  card: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentDetails: { flex: 1 },
  paymentText: { color: colors.white, fontSize: 18 },
  qrButton: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 5,
  },
  qrButtonText: { color: colors.white, fontWeight: "bold" },
  billSectionHeader: { marginVertical: 10, alignItems: "center" },
  billSectionTitle: { fontSize: 24, fontWeight: "bold", color: colors.white },
  billsList: { width: "100%" },
  billContainer: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    margin: 10,
    padding: 15,
  },
  billTitle: { fontSize: 16, fontWeight: "bold", color: colors.white },
  billDetail: { fontSize: 14, color: colors.white, marginVertical: 2 },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: colors.greyGreen,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  qrImage: { width: 200, height: 200, marginVertical: 10 },
  modalButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  downloadButton: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 10,
  },
  closeButton: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  downloadButtonText: { color: colors.white, fontWeight: "bold" },
  closeButtonText: { color: colors.white, fontWeight: "bold" },
});

export default Bills;
