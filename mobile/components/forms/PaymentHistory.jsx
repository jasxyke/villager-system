import React from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';
import { colors } from "../../styles/colors";

const PaymentHistoryModal = ({ visible, onClose, paymentHistory }) => {

  const getRowStyle = (index) => {
    // Apply grey-green background for rows with total amounts
    if (paymentHistory[index]?.total) {
      return styles.totalRow;
    }
    // Alternating row colors
    return index % 2 === 0 ? styles.evenRow : styles.oddRow;
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Payment History</Text>
          <ScrollView style={styles.paymentTable}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Date</Text>
              <Text style={styles.tableHeaderText}>OR No.</Text>
              <Text style={styles.tableHeaderText}>Amount</Text>
            </View>
            {paymentHistory.map((payment, index) => (
              <View key={index} style={[styles.tableRow, getRowStyle(index)]}>
                {/* Conditionally render the date only if the service is empty */}
                {!payment.service && (
                  <Text style={styles.tableRowText}>{payment.date}</Text>
                )}
                <Text style={styles.tableRowText}>{payment.service}</Text>
                <Text style={styles.tableRowText}>{payment.orNo}</Text>
                <Text style={styles.tableRowText}>{payment.amount}</Text>
              </View>
            ))}
          </ScrollView>
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0.5, 0.5, 0.5, 0.5)', // Black color with 50% opacity
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.white,
  },
  paymentTable: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: colors.white,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    paddingBottom: 5,
    marginBottom: 5,
    backgroundColor: colors.greyGreen, // Grey-green background for header
  },
  tableHeaderText: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row', // Align cells horizontally
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  totalRow: {
    backgroundColor: colors.greyGreen, // Grey-green background for total rows
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  evenRow: {
    backgroundColor: colors.greyLight, // Light grey for even rows
  },
  oddRow: {
    backgroundColor: colors.white, // White for odd rows
  },
  tableRowText: {
    flex: 1,
    textAlign: 'center',
  },
});

export default PaymentHistoryModal;
