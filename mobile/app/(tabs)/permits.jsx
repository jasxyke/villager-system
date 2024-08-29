import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import TabsGradient from "../../components/gradients/TabsGradient";
import AppHeader from "../../components/common/AppHeader";
import { colors } from "../../styles/colors";
import PermitForm from "../../components/forms/PermitFormPage";
import PaymentHistory from "../../components/forms/PaymentHistory"; // Ensure the path is correct
import PermitRequests from "../../components/Screens/Permits/PermitRequests";

const Permits = () => {
  const [showPermitForm, setShowPermitForm] = useState(false);
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);
  const [showRequests, setShowRequests] = useState(true);

  const handleShowRequests = () => {
    setShowPermitForm(false);
    setShowPaymentHistory(false);
    setShowRequests(true);
  };

  const handleShowPermitForm = () => {
    setShowRequests(false);
    setShowPaymentHistory(false);
    setShowPermitForm(true);
  };

  const handleShowPayment = () => {
    setShowRequests(false);
    setShowPermitForm(false);
    setShowPaymentHistory(true);
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
              onPress={handleShowPermitForm}
            >
              <Text style={styles.buttonText}>Request a Permit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.pendingButton]}
              onPress={handleShowRequests}
            >
              <Text style={styles.buttonText}>View Pending Requests</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.paymentHistoryButton]}
              onPress={handleShowPayment}
            >
              <Text style={styles.buttonText}>View Payment History</Text>
            </TouchableOpacity>
          </>
        ) : (
          <ScrollView>
            <PermitForm setShowPermitForm={setShowPermitForm} />
          </ScrollView>
        )}

        <PermitRequests
          visible={showRequests}
          onClose={() => setShowRequests(false)}
        />

        {/* Payment History Component */}
        <PaymentHistory
          visible={showPaymentHistory}
          onClose={() => setShowPaymentHistory(false)}
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
