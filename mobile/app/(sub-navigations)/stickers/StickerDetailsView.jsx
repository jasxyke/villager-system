import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../../styles/colors";
import TabsGradient from "../../../components/gradients/TabsGradient";
import { useLocalSearchParams } from "expo-router";
import useCrudCarStickerRequests from "../../../hooks/stickers/useCrudStickerRequests";
import LoadingScreen from "../../../components/common/LoadingScreen";
import { formatUserName } from "../../../utils/DataFormatter";

const StickerDetailedView = () => {
  const { stickerId } = useLocalSearchParams();
  const {
    loading,
    error,
    data: stickerDetails,
    fetchCarStickerRequest,
  } = useCrudCarStickerRequests();

  // Fetch sticker details when component mounts
  useEffect(() => {
    if (stickerId) {
      fetchCarStickerRequest(stickerId);
    }
  }, [stickerId]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!stickerDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No permit details available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TabsGradient />
      <Text style={styles.modalTitle}>Sticker Details</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Resident Information */}
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>Resident Information</Text>
          {[
            {
              label: "Name",
              value: formatUserName(stickerDetails?.resident?.user, false),
            },
            { label: "Block", value: stickerDetails?.resident?.house?.block },
            { label: "Lot", value: stickerDetails?.resident?.house?.lot },
            {
              label: "Contact Number",
              value: stickerDetails?.resident?.user?.contact_number,
            },
            { label: "Email", value: stickerDetails?.resident?.user?.email },
          ].map(({ label, value }) => (
            <View key={label} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{label}:</Text>
              <Text style={styles.detailValue}>{value || "N/A"}</Text>
            </View>
          ))}
        </View>

        {/* Vehicle Information */}
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>Vehicle Information</Text>
          {[
            { label: "Model", value: stickerDetails?.car_model },
            { label: "License Plate", value: stickerDetails?.car_plate_number },
          ].map(({ label, value }) => (
            <View key={label} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{label}:</Text>
              <Text style={styles.detailValue}>{value || "N/A"}</Text>
            </View>
          ))}
        </View>

        {/* Request Details */}
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>Request Details</Text>
          {[
            { label: "Request Date", value: stickerDetails?.application_date },
            { label: "Status", value: stickerDetails?.request_status },
            { label: "Approved Date", value: stickerDetails?.approval_date },
            { label: "Completed Date", value: stickerDetails?.completed_date },
            { label: "Claimed Date", value: stickerDetails?.claimed_date },
            { label: "Additional Note", value: stickerDetails?.note },
          ].map(({ label, value }) => (
            <View key={label} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{label}:</Text>
              <Text style={styles.detailValue}>{value || "N/A"}</Text>
            </View>
          ))}
        </View>

        {/* Fees and Payments */}
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>Fees and Payments</Text>
          {[
            { label: "Sticker Fee", value: stickerDetails?.sticker_fee },
            // { label: "Processing Fee", value: stickerDetails?.processing_fee },
          ].map(({ label, value }) => (
            <View key={label} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{label}:</Text>
              <Text style={styles.detailValue}>PHP {value || "N/A"}</Text>
            </View>
          ))}
        </View>

        {/* Payment Details */}
        {stickerDetails?.sticker_payments?.length > 0 ? (
          <View style={styles.detailSection}>
            <Text style={styles.detailTitle}>Payment Details</Text>
            {stickerDetails?.sticker_payments.map((payment, index) => (
              <View key={index} style={styles.detailRow}>
                {[
                  { label: "Payment Date", value: payment?.payment_date },
                  { label: "Payment Status", value: payment?.payment_status },
                  { label: "Paid Amount", value: payment?.amount },
                ].map(({ label, value }) => (
                  <View key={label} style={styles.detailRow}>
                    <Text style={styles.detailLabel}>{label}:</Text>
                    <Text style={styles.detailValue}>PHP {value || "N/A"}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ) : null}

        {/* Documents */}
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>Documents</Text>
          <View style={styles.documentContainer}>
            {stickerDetails?.sticker_documents?.map((doc, index) => (
              <View key={index} style={styles.documentBox}>
                <Image
                  source={{ uri: doc.document_url }}
                  style={styles.documentImage}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
    color: colors.black,
  },
  scrollContainer: {
    padding: 20,
  },
  detailSection: {
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.black,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    color: colors.black,
  },
  detailValue: {
    fontSize: 14,
    color: colors.black,
  },
  documentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  documentBox: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  documentImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  buttonContainer: {
    marginTop: 20, // Optional, for overall spacing
  },
  buttonWrapper: {
    marginBottom: 10, // Adjust this value for desired spacing between buttons
  },
});

export default StickerDetailedView;
