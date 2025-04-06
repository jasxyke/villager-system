import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DatePicker from "react-native-date-picker"; // Import the date picker component
import DropDownPicker from "react-native-dropdown-picker";
import Modal from "react-native-modal";
import CustomButton from "../../components/common/CustomButton";
import TabsGradient from "../../components/gradients/TabsGradient";
import { usePermitFormLogic } from "../../components/Screens/Permits/PermitFormLogic";
import { CLEARANCE_TYPES } from "../../data/DataStructures";
import usePermitRequest from "../../hooks/permits/usePermitRequest"; // Import the custom hook
import { colors } from "../../styles/colors";
import { convertDateToLaravelFormat } from "../../utils/DataFormatter";

const PermitForm = () => {
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [selectedImageForModal, setSelectedImageForModal] = useState(null);
  const [expectedStartDate, setExpectedStartDate] = useState(new Date());
  const [expectedEndDate, setExpectedEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [clearanceType, setClearanceType] = useState(null); // State for selected permit type
  const [openClearanceType, setOpenClearanceType] = useState(false);
  const {
    // squareMeters,
    // handleSquareMetersChange,
    handleSubmit,
    images,
    setImages,
    purpose,
    setPurpose,
  } = usePermitFormLogic();

  const { loading, error, successMessage, submitPermitRequest } =
    usePermitRequest(); // Use the custom hook here

  const handleImageUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Error",
        "Permission to access the media library is required!"
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled) {
      const newImage = { uri: result.assets[0].uri, description: "" };
      setImages((prevImages) => [...prevImages, newImage]);
    }
  };

  const handleSubmitRequest = async () => {
    if (!handleSubmit()) {
      return;
    }

    if (!clearanceType) {
      Alert.alert("Error", "Please select a clearance type.");
      return;
    }

    if (!purpose.trim()) {
      Alert.alert("Error", "Purpose is required.");
      return;
    }

    if (images.length === 0) {
      Alert.alert("Error", "Please upload at least one supporting document.");
      return;
    }

    if (expectedStartDate >= expectedEndDate) {
      Alert.alert(
        "Error",
        "Expected end date must be later than the expected start date."
      );
      return;
    }

    console.log("start date:");
    console.log(expectedStartDate);

    // Convert to Laravel compatible format (Y-m-d H:i:s)
    const formattedStartDate = convertDateToLaravelFormat(expectedStartDate);
    const formattedEndDate = convertDateToLaravelFormat(expectedEndDate);
    console.log("formatted date:");
    console.log(formattedStartDate);

    const documents = images.map((img) => ({
      uri: img.uri,
      description: img.description,
    }));

    let msg = await submitPermitRequest({
      purpose,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      documents,
      clearanceType, // Make sure to include clearanceType in the submission data
    });

    if (msg) {
      setImages([]);
      setPurpose("");
      setExpectedStartDate(new Date());
      setExpectedEndDate(new Date());
      Alert.alert(msg);
      router.back();
    }
  };

  const handleImageClick = (imageUri) => {
    setSelectedImageForModal(imageUri);
    setIsImageModalVisible(true);
  };

  const handleImageDelete = (indexToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <View className="flex-1">
      <TabsGradient />
      <ScrollView style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Request Form</Text>

          {successMessage && (
            <Text style={styles.successMessage}>{successMessage}</Text>
          )}
          {error && <Text style={styles.errorMessage}>{error}</Text>}

          {/* Clearance Type Dropdown */}
          <View style={styles.clearanceRow}>
            <Text style={styles.dropdownLabel}>Clearance Type:</Text>
            <DropDownPicker
              open={openClearanceType}
              setOpen={setOpenClearanceType}
              value={clearanceType}
              items={CLEARANCE_TYPES}
              setValue={setClearanceType}
              placeholder="Select Permit Type"
              containerStyle={styles.dropdownContainer}
              style={styles.dropdownStyle}
              dropDownStyle={styles.dropdownList}
              listMode="SCROLLVIEW"
            />
          </View>
          {/* Purpose Input */}
          <View>
            <Text style={styles.dateLabel}>Purpose:</Text>
            <View style={styles.row}>
              {/* <View style={styles.logoContainer}>
              <Image source={TYPE} style={styles.logo} />
            </View> */}
              <TextInput
                placeholder="Purpose (ex. House Permit, Construction Supply Permit)"
                style={styles.input}
                value={purpose}
                onChangeText={setPurpose}
              />
            </View>
          </View>

          {/* Floor Size Input */}
          {/* <View style={styles.row}>
            <View style={styles.logoContainer}>
              <Image source={PROFILE} style={styles.logo} />
            </View>
            <TextInput
              placeholder="Floor Size in Sq. Meters (if applicable)"
              style={styles.input}
              value={squareMeters}
              onChangeText={handleSquareMetersChange}
              keyboardType="numeric"
            />
          </View> */}

          {/* Expected Start Date */}
          <View style={styles.datePickerContainer}>
            <Text style={styles.dateLabel}>Expected Start Date:</Text>
            <TouchableOpacity
              onPress={() => setShowStartDatePicker(true)}
              style={styles.datePickerButton}
            >
              <Text style={styles.dateValue}>
                {expectedStartDate.toDateString()}
              </Text>
            </TouchableOpacity>
            <DatePicker
              modal
              mode="date"
              open={showStartDatePicker}
              date={expectedStartDate}
              onConfirm={(date) => {
                setShowStartDatePicker(false);
                setExpectedStartDate(date);
              }}
              onCancel={() => setShowStartDatePicker(false)}
            />
          </View>

          {/* Expected End Date */}
          <View style={styles.datePickerContainer}>
            <Text style={styles.dateLabel}>Expected End Date:</Text>
            <TouchableOpacity
              onPress={() => setShowEndDatePicker(true)}
              style={styles.datePickerButton}
            >
              <Text style={styles.dateValue}>
                {expectedEndDate.toDateString()}
              </Text>
            </TouchableOpacity>
            <DatePicker
              modal
              mode="date"
              open={showEndDatePicker}
              date={expectedEndDate}
              onConfirm={(date) => {
                setShowEndDatePicker(false);
                setExpectedEndDate(date);
              }}
              onCancel={() => setShowEndDatePicker(false)}
            />
          </View>

          {/* Supporting Documents */}
          <View>
            <Text style={styles.dateLabel}>Supporting Documents:</Text>

            {images.map((image, index) => (
              <View key={index} style={styles.imageContainer}>
                <TouchableOpacity onPress={() => handleImageClick(image.uri)}>
                  <Image source={{ uri: image.uri }} style={styles.image} />
                </TouchableOpacity>
                <TextInput
                  placeholder="Add description"
                  style={styles.imageDescription}
                  value={image.description}
                  onChangeText={(text) =>
                    setImages((prevImages) => {
                      const updatedImages = [...prevImages];
                      updatedImages[index].description = text;
                      return updatedImages;
                    })
                  }
                />
                <TouchableOpacity
                  onPress={() => handleImageDelete(index)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              onPress={handleImageUpload}
              style={styles.datePickerButton}
            >
              <Text style={styles.datePickerButtonText}>Upload Document</Text>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <View style={styles.buttonContainer}>
            <CustomButton
              loading={loading}
              title={loading ? "Processing" : "Submit Request"}
              onPress={handleSubmitRequest}
              disabled={loading}
            />

            <CustomButton
              loading={loading}
              title="Cancel"
              onPress={() => {
                Alert.alert(
                  "Confirm",
                  "Are you sure you want to cancel?",
                  [
                    { text: "Yes", onPress: () => router.back() },
                    { text: "No", style: "cancel" },
                  ],
                  { cancelable: true }
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
      <Modal
        isVisible={isImageModalVisible}
        onBackdropPress={() => setIsImageModalVisible(false)}
        style={styles.imageModal}
      >
        <View style={styles.modalContent}>
          {selectedImageForModal && (
            <Image
              source={{ uri: selectedImageForModal }}
              style={styles.modalImage}
            />
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsImageModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
  },
  container: {
    marginTop: 10,
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 25,
    marginBottom: 40,
  },
  title: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  logoContainer: {
    width: 40,
    height: 53,
    marginRight: 10,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  logo: {
    width: 20,
    height: 20,
  },
  input: {
    flex: 1,
    height: 53,
    borderColor: "black",
    borderWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  imageDescription: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
  datePickerContainer: {
    marginBottom: 20,
  },
  datePickerButton: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    borderColor: colors.secondary,
    borderWidth: 1,
  },
  datePickerButtonText: {
    color: colors.primary,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  successMessage: {
    color: colors.secondary,
    textAlign: "center",
    marginVertical: 10,
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  dateLabel: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
  },
  dateValue: {
    color: colors.primary,
    fontSize: 16,
  },
  imageModal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: colors.secondary,
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: colors.white,
    fontWeight: "bold",
  },
  dropdownLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.white,
  },
  dropdownContainer: {
    height: 50,
    width: "100%",
  },
  dropdownStyle: {
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  dropdownList: {
    backgroundColor: colors.white,
    maxHeight: 200, // Limits the dropdown's height to prevent overflow
  },
  clearanceRow: {
    display: "flex",
    marginBottom: 15,
  },
});

export default PermitForm;
