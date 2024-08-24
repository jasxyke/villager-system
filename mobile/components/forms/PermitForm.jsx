import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { BOOKING, PROFILE, BILLS, TYPE } from "../../constants/icons";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from "../../styles/colors";
import { usePermitFormLogic } from '../../components/common/PermitFormLogic'; // Import the hook
import CustomButton from '../../components/common/CustomButton'; // Import the custom button component

const PermitForm = () => {
  const {
    modalVisible,
    selectedService,
    showDatePicker,
    date,
    price,
    squareMeters,
    services,
    handleDateChange,
    handleServiceChange,
    handleSquareMetersChange,
    handleSubmit,
    handleCancel,
    setShowDatePicker,
  } = usePermitFormLogic(); // Use the hook

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Request Form</Text>

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

            <View style={styles.buttonContainer}>
              <CustomButton title="Submit Request" onPress={handleSubmit} />
              <CustomButton title="Cancel" onPress={handleCancel} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.primary, // Dark green form background color
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white, // White text color
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
    backgroundColor: colors.white, // White background for logo container
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  logo: {
    width: 30,
    height: 30,
    tintColor: '#000000', // Black color for the logo
  },
  picker: {
    flex: 1,
    borderColor: 'black',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: colors.white, // White background for the picker
  },
  input: {
    flex: 1,
    height: 53,
    borderColor: 'black',
    borderWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.white, // White background for input fields
  },
  datePickerTouchable: {
    flex: 1,
    height: 53,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: colors.white, // White background for the date picker
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
});

export default PermitForm;
