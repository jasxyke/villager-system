import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { colors } from "../../styles/colors";

const PaymentHistory = ({
  visible,
  onClose,
  stickerPayments,
  permitPayments,
}) => {
  if (!visible) return null;

  // Render item for FlatList
  const renderItem = ({ item }) => {
    return (
      <View style={styles.tableRow}>
        <Text style={styles.tableRowText}>{item.date}</Text>
        <Text style={styles.tableRowText}>{item.orNo || "-"}</Text>
        <Text style={styles.tableRowText}>{item.service || "-"}</Text>
        <Text style={styles.tableRowText}>{item.amount}</Text>
        {item.permitType && (
          <Text style={styles.tableRowText}>{item.permitType}</Text>
        )}
        {item.stickerModal && (
          <Text style={styles.tableRowText}>{item.stickerModal}</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment History</Text>

      <Text style={styles.subTitle}>Sticker Payments</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Date</Text>
        <Text style={styles.tableHeaderText}>OR No</Text>
        <Text style={styles.tableHeaderText}>Service</Text>
        <Text style={styles.tableHeaderText}>Amount</Text>
        <Text style={styles.tableHeaderText}>Sticker Modal</Text>{" "}
        {/* New Column */}
        <Text style={styles.tableHeaderText}>Issue Date</Text>{" "}
        {/* New Column */}
      </View>
      <FlatList
        data={stickerPayments}
        renderItem={renderItem}
        keyExtractor={(item, index) => `sticker-${index}`}
        contentContainerStyle={styles.paymentHistoryList}
      />

      <Text style={styles.subTitle}>Permit Payments</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Date</Text>
        <Text style={styles.tableHeaderText}>OR No</Text>
        <Text style={styles.tableHeaderText}>Service</Text>
        <Text style={styles.tableHeaderText}>Amount</Text>
        <Text style={styles.tableHeaderText}>Permit Type</Text>{" "}
        {/* New Column */}
        <Text style={styles.tableHeaderText}>Issue Date</Text>{" "}
        {/* New Column */}
      </View>
      <FlatList
        data={permitPayments}
        renderItem={renderItem}
        keyExtractor={(item, index) => `permit-${index}`}
        contentContainerStyle={styles.paymentHistoryList}
      />

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: colors.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.primary,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
    color: colors.primary,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: colors.lightGray,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  tableHeaderText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  tableRowText: {
    flex: 1,
    textAlign: "center",
  },
  paymentHistoryList: {
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

export default PaymentHistory;
