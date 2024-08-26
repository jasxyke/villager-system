import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import TabsGradient from "../../components/gradients/TabsGradient";
import AppHeader from "../../components/common/AppHeader";
import { colors } from "../../styles/colors";
import PermitForm from "../../components/forms/PermitFormPage";
import PaymentHistory from "../../components/forms/PaymentHistory"; // Ensure the path is correct

const Permits = () => {
  const [showPermitForm, setShowPermitForm] = useState(false);
  const [transactions, setTransactions] = useState([
    {
      service: "Building Permit",
      status: "Pending", // Dummy status to make the button visible
    },
  ]);
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);

  // Dummy data for transaction details
  const dummyTransaction = {
    issuedLast: "2024-08-20",
    startDate: "2024-08-01",
    endDate: "2024-08-30",
    amountPaid: "Php 500.00",
    paidLast: "2024-08-25",
    officialReceiptNo: "OR123456",
    approvedBy: "Admin User",
  };

  // Dummy payment history data
  const dummyPaymentHistory = [
    {
      date: "2024-08-25",
      orNo: "",
      service: "",
      amount: "Php 1500.00",
      total: true,
    },
    {
      date: "2024-08-25",
      orNo: "OR123456",
      service: "Building Permit",
      amount: "Php 500.00",
    },
  ];

  const handleAddTransaction = (newTransaction) => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);
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

            <TouchableOpacity
              style={[styles.button, styles.pendingButton]}
              onPress={() => {} /* Add logic to view pending requests */}
            >
              <Text style={styles.buttonText}>View Pending Requests</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.paymentHistoryButton]}
              onPress={() => setShowPaymentHistory(true)}
            >
              <Text style={styles.buttonText}>View Payment History</Text>
            </TouchableOpacity>
          </>
        ) : (
          <PermitForm
            addTransaction={handleAddTransaction}
            setShowPermitForm={setShowPermitForm}
          />
        )}

        {/* Payment History Component */}
        <PaymentHistory
          visible={showPaymentHistory}
          onClose={() => setShowPaymentHistory(false)}
          paymentHistory={dummyPaymentHistory}
        />
      </View>
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
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  requestButton: {
    backgroundColor: colors.primary,
  },
  pendingButton: {
    backgroundColor: colors.primary, // Adjust if needed
  },
  paymentHistoryButton: {
    backgroundColor: colors.primary, // Adjust if needed
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
  },
});

export default Permits;
