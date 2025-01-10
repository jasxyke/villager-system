import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import useResident from "../../../hooks/houses/useResident";
import {
  CIVIL_STATUSES,
  OCCUPATION_STATUSES,
  ROLE_TYPES_HOUSE,
  SEX_TYPES,
} from "../../../data/contants";
import { router, useLocalSearchParams } from "expo-router";
import { formStyles } from "../../../styles/formStyles";
import DatePicker from "react-native-date-picker";
import TabsGradient from "../../../components/gradients/TabsGradient";
import { colors } from "../../../styles/colors";
import { convertDateToLaravelFormat } from "../../../utils/DataFormatter";
const AddMember = ({ navigation }) => {
  const { addResident } = useResident();
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [email, setEmail] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [roleType, setRoleType] = useState(ROLE_TYPES_HOUSE[0].value);
  const [birthdate, setBirthdate] = useState(new Date());
  const [sex, setSex] = useState(SEX_TYPES[0].value);
  const [civilStatus, setCivilStatus] = useState(CIVIL_STATUSES[0].value);
  const [facebook, setFacebook] = useState("");
  const [occupation, setOccupation] = useState(OCCUPATION_STATUSES[0].value);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { houseId } = useLocalSearchParams();

  const handleAddMember = () => {
    const residentData = {
      lastname,
      firstname,
      middlename,
      birthdate: convertDateToLaravelFormat(birthdate),
      sex,
      civilStatus,
      facebook,
      occupation,
      email,
      contactNum,
      roleType,
      houseId,
    };

    addResident(
      residentData,
      () => {
        alert("Member added successfully!");
        router.back();
      },
      (error) => {
        alert(`Failed to add member: ${error}`);
      }
    );
  };

  return (
    <View>
      <TabsGradient />
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={[formStyles.textInput, formStyles.verticalMargin]}
          placeholder="Last Name"
          value={lastname}
          onChangeText={setLastname}
          placeholderTextColor={colors.white}
        />
        <TextInput
          style={[formStyles.textInput, formStyles.verticalMargin]}
          placeholder="First Name"
          value={firstname}
          onChangeText={setFirstname}
          placeholderTextColor={colors.white}
        />
        <TextInput
          style={[formStyles.textInput, formStyles.verticalMargin]}
          placeholder="Middle Name"
          value={middlename}
          onChangeText={setMiddlename}
          placeholderTextColor={colors.white}
        />
        <TextInput
          style={[formStyles.textInput, formStyles.verticalMargin]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor={colors.white}
        />
        <TextInput
          style={[formStyles.textInput, formStyles.verticalMargin]}
          placeholder="Contact Number"
          value={contactNum}
          onChangeText={setContactNum}
          keyboardType="phone-pad"
          placeholderTextColor={colors.white}
        />

        <Text style={styles.label}>Birthdate</Text>
        <TouchableOpacity
          style={[formStyles.textInput, styles.datePickerInput]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText} className="text-white">
            {birthdate.toDateString()}
            {/* Format date as a readable string */}
          </Text>
        </TouchableOpacity>
        <DatePicker
          modal
          mode="date"
          open={showDatePicker}
          date={birthdate}
          onConfirm={(date) => {
            setShowDatePicker(false);
            setBirthdate(date);
          }}
          onCancel={() => setShowDatePicker(false)}
        />
        <Text style={styles.label}>Sex</Text>
        <Picker
          selectedValue={sex}
          onValueChange={(itemValue) => setSex(itemValue)}
          style={styles.picker}
          dropdownIconColor={colors.white}
        >
          {SEX_TYPES.map((type) => (
            <Picker.Item
              key={type.value}
              label={type.text}
              value={type.value}
            />
          ))}
        </Picker>
        <Text style={styles.label}>Civil Status</Text>
        <Picker
          selectedValue={civilStatus}
          onValueChange={(itemValue) => setCivilStatus(itemValue)}
          style={styles.picker}
          dropdownIconColor={colors.white}
        >
          {CIVIL_STATUSES.map((status) => (
            <Picker.Item
              key={status.value}
              label={status.text}
              value={status.value}
            />
          ))}
        </Picker>
        <Text style={styles.label}>Occupation Status</Text>
        <Picker
          selectedValue={occupation}
          onValueChange={(itemValue) => setOccupation(itemValue)}
          style={styles.picker}
          dropdownIconColor={colors.white}
        >
          {OCCUPATION_STATUSES.map((occupation) => (
            <Picker.Item
              key={occupation.value}
              label={occupation.text}
              value={occupation.value}
            />
          ))}
        </Picker>
        <Text style={styles.label}>Resident Type</Text>
        <Picker
          selectedValue={roleType}
          onValueChange={(itemValue) => setRoleType(itemValue)}
          style={styles.picker}
          dropdownIconColor={colors.white}
        >
          {ROLE_TYPES_HOUSE.map((role) => (
            <Picker.Item
              key={role.value}
              label={role.text}
              value={role.value}
            />
          ))}
        </Picker>
        <TextInput
          style={[formStyles.textInput, formStyles.verticalMargin]}
          placeholder="Facebook"
          value={facebook}
          onChangeText={setFacebook}
          placeholderTextColor={colors.white}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={formStyles.buttonLight}
            onPress={handleAddMember}
          >
            <Text style={formStyles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[formStyles.buttonGrey]}
            onPress={() => navigation.goBack()}
          >
            <Text style={formStyles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.white,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: colors.white,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: colors.primary,
    color: colors.white,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#FF4136",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddMember;
