import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Button, 
  ScrollView, 
  TextInput, 
  Modal, 
  TouchableOpacity, 
  TouchableWithoutFeedback 
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker"; // Import the new date picker
import { colors } from "../../styles/colors";
import TabsGradient from "../../components/gradients/TabsGradient";

const ClearanceDetailedView = ({ permitDetails, onRequestExtension }) => {
  const [extensionReason, setExtensionReason] = useState("");
  const [extensionEndDate, setExtensionEndDate] = useState(new Date());
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // Function to calculate the extension payment
  const calculatePayment = (endDate) => {
    const currentDate = new Date();
    const diffTime = endDate - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      const extensionFee = 2500; // 25% of PHP 10,000
      const penaltyFee = 500 * diffDays; // PHP 500 per day of delay
      setPaymentAmount(extensionFee + penaltyFee);
    } else {
      setPaymentAmount(0); // No payment if the extension is for the current or past date
    }
  };

  // Handle date selection from the Date Picker
  const handleConfirmDate = (selectedDate) => {
    setExtensionEndDate(selectedDate);
    calculatePayment(selectedDate); // Calculate payment based on the selected date
    setDatePickerVisibility(false); // Hide the picker
  };

  // Handle request extension modal submit
  const handleExtensionSubmit = () => {
    onRequestExtension(extensionReason, extensionEndDate, paymentAmount);
    setIsModalVisible(false); // Hide the modal after submitting
  };

  return (
    <View style={styles.container}>
      <TabsGradient />
      <Text style={styles.modalTitle}>Previous Requested Permit</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>Requested Details</Text>
          {[
            { label: "Description of Request", value: permitDetails?.descriptionOfRequest },
            { label: "Reason for Request", value: permitDetails?.reasonForRequest },
            { label: "Requested Permit", value: permitDetails?.requestedPermit },
            { label: "Permit Purpose", value: permitDetails?.phoneNumber },
            { label: "Requested Date", value: permitDetails?.startDate },
            { label: "Expected Starting Date", value: permitDetails?.startDate },
            { label: "Expected Completion Date", value: permitDetails?.endDate },
          ].map(({ label, value }) => (
            <View key={label} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{label}:</Text>
              <Text style={styles.detailValue}>{value || "N/A"}</Text>
            </View>
          ))}
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>Fees and Payments</Text>
          {[
            { label: "Permit Fee", value: permitDetails?.permitFee },
            { label: "Processing Fee", value: permitDetails?.processingFee },
          ].map(({ label, value }) => (
            <View key={label} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{label}:</Text>
              <Text style={styles.detailValue}>PHP {value || "N/A"}</Text>
            </View>
          ))}
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>Documents</Text>
          <View style={styles.documentContainer}>
            {permitDetails?.uploadedDocuments?.map((doc, index) => (
              <View key={index} style={styles.documentBox}>
                <Image source={{ uri: doc }} style={styles.documentImage} />
              </View>
            ))}
          </View>
        </View>

        <Button title="Request for Extension" onPress={() => setIsModalVisible(true)} color={colors.primary} />
      </ScrollView>

      <Modal visible={isModalVisible} animationType="slide" transparent={true} onRequestClose={() => setIsModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle2}>Extension Request</Text>

              {/* Reason for Extension */}
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Reason for Extension</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Enter reason for extension"
                  value={extensionReason}
                  onChangeText={setExtensionReason}
                />
              </View>

              {/* Extension End Date */}
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Extension End Date</Text>
                <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                  <View style={styles.datePickerButton}>
                    <Text style={styles.datePickerText}>
                      {extensionEndDate.toLocaleDateString()}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Payment Calculation */}
              <View style={styles.paymentSection}>
                <Text style={styles.paymentLabel}>Total Payment:</Text>
                <Text style={styles.paymentAmount}>PHP {paymentAmount}</Text>
              </View>

              {/* Submit Button */}
              <TouchableOpacity>
                <View style={styles.submitButton}>
                  <Text style={styles.submitButtonText}>Submit Extension Request</Text>
                </View>
              </TouchableOpacity>

              {/* Close Button */}
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <View style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisibility(false)}
        minimumDate={new Date()}
      />
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
  modalTitle2: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
    color: colors.white,
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
  inputSection: {
    marginBottom: 20,
    color: colors.white,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.white,
  },
  inputField: {
    height: 40,
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  invalidInput: {
    borderColor: 'red',  // Highlight invalid input
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  paymentSection: {
    marginTop: 20,
  },
  paymentLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: colors.white,
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxWidth: 400,
  },
  submitButton: {
    backgroundColor: colors.greyGreen,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  submitButtonText: {
    color: colors.black,
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: colors.greyGreen,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: colors.black,
    fontSize: 16,
  },
  datePickerButton: {
    height: 40,
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    alignItems: 'flex-start',
  },
  datePickerText: {
    
  },
});

export default ClearanceDetailedView;
