import React, { useEffect, useState } from "react";
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
  TouchableWithoutFeedback,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker"; // Import the new date picker
import { colors } from "../../../styles/colors";
import TabsGradient from "../../../components/gradients/TabsGradient";
import { formatName, formatUserName } from "../../../utils/DataFormatter";
import { useLocalSearchParams } from "expo-router";
import useCrudPermits from "../../../hooks/permits/useCrudPermits";
import LoadingScreen from "../../../components/common/LoadingScreen";
import useDownloadPermitReceipt from "../../../hooks/permits/useDownloadPermitReceipt";

const ClearanceDetailedView = ({ onRequestExtension }) => {
  const [extensionReason, setExtensionReason] = useState("");
  const [extensionEndDate, setExtensionEndDate] = useState(new Date());
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // Import functions and states from the useCrudPermits hook
  const {
    data: permitDetails,
    fetchPermitRequest,
    loading,
    error,
  } = useCrudPermits();

  const {
    loading: downloading,
    error: downloadError,
    downloadReceipt,
  } = useDownloadPermitReceipt();

  const { permitId } = useLocalSearchParams();

  useEffect(() => {
    if (permitId) {
      fetchPermitRequest(permitId); // Fetch the permit details using the hook
    }
  }, [permitId]);

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

  // Handle loading and error states
  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!permitDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No permit details available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TabsGradient />
      {/* <Text style={styles.modalTitle}>Detailed Permit Information</Text> */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Applicant Details Section */}
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>Applicant Details</Text>
          {[
            {
              label: "Name",
              value: formatUserName(permitDetails?.resident.user, true),
            },
            {
              label: "Contact Number",
              value: permitDetails.resident.user.contact_number,
            },
            { label: "Email", value: permitDetails?.resident.user.email },
          ].map(({ label, value }) => (
            <View key={label} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{label}:</Text>
              <Text style={styles.detailValue}>{value || "N/A"}</Text>
            </View>
          ))}
        </View>

        {/* Requested Details Section */}
        <View style={styles.detailSection}>
          {[
            {
              label: "Permit Type",
              value: permitDetails?.permit_type,
            },
            {
              label: "Permit Description",
              value: permitDetails?.purpose,
            },
            {
              label: "Status",
              value: formatName(permitDetails?.permit_status),
            },
            { label: "Requested Date", value: permitDetails?.application_date },
            {
              label: "Expected Starting Date",
              value: permitDetails?.expect_start_date,
            },
            {
              label: "Expected Completion Date",
              value: permitDetails?.expect_end_date,
            },
            { label: "Approval Date", value: permitDetails?.approval_date },
          ].map(({ label, value }) => (
            <View key={label} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{label}:</Text>
              <Text style={styles.detailValue}>{value || "N/A"}</Text>
            </View>
          ))}
        </View>

        {/* Property Information Section */}
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>Property Information</Text>
          {[
            {
              label: "Block Number",
              value: permitDetails?.resident.house.block,
            },

            { label: "Lot Number", value: permitDetails?.resident.house.lot },
          ].map(({ label, value }) => (
            <View key={label} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{label}:</Text>
              <Text style={styles.detailValue}>{value || "N/A"}</Text>
            </View>
          ))}
        </View>

        {/* Fees and Payments Section */}
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>Fees and Payments</Text>
          {[
            { label: "Permit Fee", value: permitDetails?.permit_fee },
            { label: "Processing Fee", value: permitDetails?.processing_fee },
          ].map(({ label, value }) => (
            <View key={label} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{label}:</Text>
              <Text style={styles.detailValue}>PHP {value || "N/A"}</Text>
            </View>
          ))}
        </View>

        {/* Payments Section */}
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>Payment History</Text>
          {permitDetails?.permit_payments?.length > 0 ? (
            permitDetails.permit_payments.map((payment, index) => (
              <View key={index} style={styles.paymentRow}>
                <View style={styles.paymentColumn}>
                  <Text style={styles.paymentLabel}>
                    Amount:{" "}
                    <Text style={styles.paymentValue}>
                      PHP {payment.amount}
                    </Text>
                  </Text>
                </View>
                <View style={styles.paymentColumn}>
                  <Text style={styles.paymentLabel}>
                    Date:{" "}
                    <Text style={styles.paymentValue}>
                      {new Date(payment.payment_date).toLocaleDateString()}
                    </Text>
                  </Text>
                </View>
                <View style={styles.paymentColumn}>
                  <Text style={styles.paymentLabel}>
                    Status:{" "}
                    <Text style={styles.paymentValue}>
                      {formatName(payment.payment_status)}
                    </Text>
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noPaymentsText}>
              No payments have been made yet.
            </Text>
          )}
        </View>

        {/* Supporting Documents Section */}
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>Documents</Text>
          <View style={styles.documentContainer}>
            {permitDetails?.permit_documents?.map((doc, index) => (
              <View key={index} style={styles.documentBox}>
                <Image
                  source={{ uri: doc.document_url }}
                  style={styles.documentImage}
                />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Button
              title="Request for Extension"
              onPress={() => setIsModalVisible(true)}
              color={colors.primary}
            />
          </View>

          {/* {permitDetails?.permit_payments?.length > 0 && (
            <View style={styles.buttonWrapper}>
              <Button
                onPress={() =>
                  downloadReceipt(permitDetails?.permit_payments[0].id)
                }
                title="Download Receipt"
                disabled={downloading}
                color={colors.primary}
              />
            </View>
          )} */}
        </View>
      </ScrollView>

      {/* Extension Request Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
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
              {/* <View style={styles.paymentSection}>
                <Text style={styles.paymentLabel}>
                  Total Payment: PHP {paymentAmount}
                </Text>
                <Text style={styles.paymentAmount}>PHP {paymentAmount}</Text>
              </View> */}

              {/* Submit Button */}
              <TouchableOpacity >
                <View style={styles.submitButton}>
                  <Text style={styles.submitButtonText}>
                    Submit Extension Request
                  </Text>
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
    backgroundColor: colors.primary,
    padding: 20,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.white,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    color: colors.white,
  },
  detailValue: {
    fontSize: 14,
    color: colors.white,
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
    borderColor: "red", // Highlight invalid input
  },
  errorText: {
    color: "red",
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
  noPaymentsText: {
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
  buttonContainer: {
    marginTop: 20, // Optional, for overall spacing
  },
  buttonWrapper: {
    marginBottom: 10, // Adjust this value for desired spacing between buttons
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
    alignItems: "flex-start",
  },
  datePickerText: {
    marginVertical: "auto",
  },
});

export default ClearanceDetailedView;
