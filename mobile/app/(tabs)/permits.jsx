import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import TabsGradient from "../../components/gradients/TabsGradient";
import AppHeader from "../../components/common/AppHeader";
import { colors } from "../../styles/colors";
import PermitForm from '../../components/forms/PermitFormPage';
import PaymentHistory from '../../components/forms/PaymentHistory'; // Adjust the path as necessary

const App = () => {
  const [showPermitForm, setShowPermitForm] = useState(false);
  const [transactions, setTransactions] = useState([
    {
      service: 'Building Permit',
      status: 'Pending', // Dummy status to make the button visible
    }
  ]);
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);

  // Dummy data for transaction details
  const dummyTransaction = {
    issuedLast: '2024-08-20',
    startDate: '2024-08-01',
    endDate: '2024-08-30',
    amountPaid: 'Php 500.00',
    paidLast: '2024-08-25',
    officialReceiptNo: 'OR123456',
    approvedBy: 'Admin User',
  };

  // Dummy payment history data
  const dummyPaymentHistory = [
    { date: '2024-08-25', orNo: '', service: '', amount: 'Php 1500.00', total: true },
    { date: '2024-08-25', orNo: 'OR123456', service: 'Building Permit', amount: 'Php 500.00' },
    { date: '2024-08-25', orNo: 'OR123457', service: 'Car Sticker', amount: 'Php 500.00' },
    { date: '2024-08-25', orNo: 'OR123458', service: 'Construction Supply Permit', amount: 'Php 500.00' },
    { date: '2024-08-24', orNo: '', service: '', amount: 'Php 1000.00', total: true },
    { date: '2024-08-24', orNo: 'OR123455', service: 'Building Permit', amount: 'Php 1000.00' },
  ];

  const hasPendingTransactions = transactions.some(transaction => transaction.status === 'Pending');

  const handleAddTransaction = (newTransaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TabsGradient />
      <AppHeader />
      <View style={styles.content}>
        {!showPermitForm ? (
          <>
            <TouchableOpacity
              style={[styles.button, styles.requestButton]}
              onPress={() => setShowPermitForm(true)}
            >
              <Text style={styles.buttonText}>Request a Permit</Text>
            </TouchableOpacity>
            {hasPendingTransactions && (
              <TouchableOpacity
                style={[styles.button, styles.pendingButton]}
                onPress={() => {} /* Add logic to view pending requests */}
              >
                <Text style={styles.buttonText}>View Pending Requests</Text>
              </TouchableOpacity>
            )}
            <View style={styles.transactionHeader}>
              <Text style={styles.historyTitle}>Transaction Details</Text>
              <TouchableOpacity style={styles.paymentHistoryLink} onPress={() => setShowPaymentHistory(true)}>
                <Text style={styles.paymentHistoryText}>View Payment History</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.transactionContainer}>
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <View key={index} style={styles.transactionItem}>
                    <Text>Service: {transaction.service}</Text>
                    <Text>Issued Last: {dummyTransaction.issuedLast}</Text>
                    <Text>Start Date: {dummyTransaction.startDate}</Text>
                    <Text>End Date: {dummyTransaction.endDate}</Text>
                    <Text>Amount Paid: {dummyTransaction.amountPaid}</Text>
                    <Text>Paid Last: {dummyTransaction.paidLast}</Text>
                    <Text>Official Receipt No: {dummyTransaction.officialReceiptNo}</Text>
                    <Text>Approved By: {dummyTransaction.approvedBy}</Text>
                  </View>
                ))
              ) : (
                <Text>No transactions to display.</Text>
              )}
            </ScrollView>
          </>
        ) : (
          <PermitForm
            addTransaction={handleAddTransaction}
            setShowPermitForm={setShowPermitForm}
          />
        )}
      </View>
      <PaymentHistory
        visible={showPaymentHistory}
        onClose={() => setShowPaymentHistory(false)}
        paymentHistory={dummyPaymentHistory}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  transactionContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: colors.paleGreen,
    padding: 10,
  },
  transactionItem: {
    marginBottom: 15,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary, // Adjust the color to match your design
  },
  paymentHistoryLink: {
    marginBottom: 10,
  },
  paymentHistoryText: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  requestButton: {
    backgroundColor: colors.primary,
    marginBottom: 10,
  },
  pendingButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default App;
