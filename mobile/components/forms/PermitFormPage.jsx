import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { BOOKING, PROFILE, BILLS, TYPE, DOWNLOADS } from "../../constants/icons";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from "../../styles/colors";
import { usePermitFormLogic } from '../../components/common/PermitFormLogic';
import CustomButton from '../../components/common/CustomButton';
import FileSelector from 'react-native-file-selector'; // Import the new file selector

const PermitForm = ({ addTransaction, setShowPermitForm }) => {
  // Check if addTransaction is a function
  if (typeof addTransaction !== 'function') {
    console.error('addTransaction is not a function:', addTransaction);
    return null; // Exit if addTransaction is not a function
  }

  const {
    selectedService,
    showDatePicker,
    date,
    price,
    squareMeters,
    services,
    handleDateChange,
    handleServiceChange,
    handleSquareMetersChange,
    setShowDatePicker,
    handleSubmit,
    fileName,
    setFileName
  } = usePermitFormLogic(addTransaction, setShowPermitForm);

  // State to track submission status
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = () => {
    FileSelector.openFileSelector()
      .then((file) => {
        setFileName(file.name); // Update the fileName state in hook
      })
      .catch((error) => {
        Alert.alert('Error', 'An error occurred while selecting the file.');
      });
  };

  const handleSubmitRequest = () => {
    setIsProcessing(true); // Set to processing state
    handleSubmit(); // Call the original handleSubmit function
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request Form</Text>
      {/* Other input fields for the form */}
      <View style={styles.row}>
        <View style={styles.logoContainer}>
          <Image source={TYPE} style={styles.logo} />
        </View>
        <Picker
          selectedValue={selectedService}
          style={styles.picker}
          onValueChange={handleServiceChange}
        >
          {services.map((service, index) => (
            <Picker.Item key={index} label={service} value={service} />
          ))}
        </Picker>
      </View>

      {selectedService === 'Building Permit' && (
        <View style={styles.row}>
          <View style={styles.logoContainer}>
            <Image source={PROFILE} style={styles.logo} />
          </View>
          <TextInput
            placeholder="Enter Square Meters"
            style={styles.input}
            value={squareMeters}
            onChangeText={handleSquareMetersChange}
            keyboardType="numeric"
          />
        </View>
      )}

      <View style={styles.row}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <View style={styles.logoContainer}>
            <Image source={BOOKING} style={styles.logo} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerTouchable}>
          <TextInput
            style={styles.input}
            value={date.toDateString()}
            editable={false}
          />
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Conditional rendering for approval time message */}
      {isProcessing && (
        <Text style={styles.smallText}>Approval time is 7 days</Text>
      )}

      <View style={styles.row}>
        <View style={styles.logoContainer}>
          <Image source={BILLS} style={styles.logo} />
        </View>
        <TextInput
          placeholder="Price"
          style={styles.input}
          value={price}
          editable={false}
        />
      </View>

      {/* Conditional rendering for payment instruction message */}
      {isProcessing && (
        <Text style={styles.smallText}>Please pay the amount above to receive your request</Text>
      )}

      <View style={styles.additionalContainer}>
        <Text style={styles.header1}>Supporting Documents</Text>
      </View>
      
      {/* File upload input */}
      <View style={styles.fileUploadContainer}>
      <View style={styles.logoContainer}>
            <Image source={DOWNLOADS} style={styles.logo} />
          </View>
        <TouchableOpacity style={styles.fileUploadButton} onPress={handleFileUpload}>
          <Text style={styles.fileUploadButtonText}>
            {fileName ? `File: ${fileName}` : 'Upload File'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <CustomButton title={isProcessing ? "Processing" : "Submit Request"} onPress={handleSubmitRequest} />
        <CustomButton title={isProcessing ? "Go Back" : "Cancel"} onPress={() => setShowPermitForm(false)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 25,
  },
  title: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoContainer: {
    width: 40,
    height: 53,
    marginRight: 10,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  logo: {
    width: 20,
    height: 20,
  },
  additionalContainer: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header1: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.white,
  },
  smallText: {
    fontSize: 12,
    color: colors.white,
    textAlign: 'center',
    marginVertical: 5,
  },
  input: {
    flex: 1,
    height: 53,
    borderColor: 'black',
    borderWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
  picker: {
    flex: 1,
    borderColor: 'black',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: colors.white,
  },
  datePickerTouchable: {
    flex: 1,
    height: 53,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  fileUploadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  fileUploadButton: {
    flex: 1,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: colors.white,
  },
  fileUploadButtonText: {
    color: colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default PermitForm;
