import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { colors } from "../../../styles/colors";
import TabsGradient from "../../../components/gradients/TabsGradient";

const StickerDetailedView = ({ stickerDetails}) => {

  return (
    <View style={styles.container}>
      <TabsGradient />
      <Text style={styles.modalTitle}>Sticker Details</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Resident Information */}
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>Resident Information</Text>
          {[
            { label: "Name", value: stickerDetails?.resident?.user?.name },
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

        {/* Fees and Payments */}
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>Fees and Payments</Text>
          {[
            { label: "Sticker Fee", value: stickerDetails?.sticker_fee },
            { label: "Processing Fee", value: stickerDetails?.processing_fee },
          ].map(({ label, value }) => (
            <View key={label} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{label}:</Text>
              <Text style={styles.detailValue}>PHP {value || "N/A"}</Text>
            </View>
          ))}
        </View>

        {/* Documents */}
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>Documents</Text>
          <View style={styles.documentContainer}>
            {stickerDetails?.sticker_documents?.map((doc, index) => (
              <View key={index} style={styles.documentBox}>
                <Image source={{ uri: doc.document_url }} style={styles.documentImage} />
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
      fontWeight: "bold",
      color: colors.black,
    },
    detailValue: {
      fontSize: 14,
      color: colors.black,
    },
    documentContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
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

  });
  
  export default StickerDetailedView;
  
