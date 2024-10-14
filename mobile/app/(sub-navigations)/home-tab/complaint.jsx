import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import TabsGradient from "../../../components/gradients/TabsGradient";
import AppText from "../../../components/common/AppText";
import DropDownPicker from "react-native-dropdown-picker";
import { COMPLAINT_TYPES } from "../../../data/DataStructures";
import { colors } from "../../../styles/colors";
import { formStyles } from "../../../styles/formStyles";
import { useAuthContext } from "../../../context/AuthContext";
import useComplaints from "../../../hooks/complaints/useComplaints";

const Complaint = () => {
  const [complaintType, setComplaintType] = useState(COMPLAINT_TYPES[0].value);
  const [openComplaint, setOpenComplaint] = useState(false);
  const [complaintTypes, setComplaintTypes] = useState(COMPLAINT_TYPES);
  const [message, setMessage] = useState("");
  const { user } = useAuthContext();
  const { submitComplaint, loading, error, success } = useComplaints(); // Destructure the hook
  const residentId = user.resident.id;

  // Function to handle the form submission
  const handleSubmit = async () => {
    if (!message) {
      Alert.alert("Error", "Please enter your complaint message");
      return;
    }

    const complaintDetails = {
      resident_id: residentId, // Set resident ID
      type: complaintType, // Set complaint type
      message: message,
      // No need to pass status or date_sent, they are handled by the backend
    };

    const response = await submitComplaint(complaintDetails);

    if (response) {
      // Optionally reset the form fields after successful submission
      setMessage("");
      setComplaintType(COMPLAINT_TYPES[0].value);
    }
  };

  return (
    <View className="flex-1 h-full">
      <TabsGradient />
      <View className="justify-center items-center pb-5 mt-10">
        <View className="w-[90%] bg-primary p-5 shadow-2xl rounded-lg">
          <AppText text={"Complaint Type"} />
          <DropDownPicker
            className="mb-3"
            open={openComplaint}
            value={complaintType}
            items={complaintTypes}
            setOpen={setOpenComplaint}
            setValue={setComplaintType}
            setItems={setComplaintTypes}
            listMode="SCROLLVIEW"
            theme="LIGHT"
            style={{ backgroundColor: colors.white }}
          />
          <AppText text={"Complaint Message"} />
          <TextInput
            value={message}
            onChangeText={setMessage}
            style={formStyles.textInputLight}
            multiline={true}
            numberOfLines={5}
            textAlignVertical="top"
          />

          {/* Show success or error message */}
          {success && (
            <Text
              style={{
                color: "green",
                marginTop: 10,
                marginHorizontal: "auto",
              }}
            >
              {success}
            </Text>
          )}
          {error && (
            <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>
          )}

          <Pressable
            className="mt-3 ml-auto"
            style={formStyles.buttonLight}
            onPress={handleSubmit} // Call handleSubmit on press
            disabled={loading} // Disable button when loading
          >
            <Text style={formStyles.buttonTextLight}>
              {loading ? "Sending..." : "Send"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Complaint;
