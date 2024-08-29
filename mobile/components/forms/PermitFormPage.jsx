import * as ImagePicker from "expo-image-picker";
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
import CustomButton from "../../components/common/CustomButton";
import { usePermitFormLogic } from "../../components/common/PermitFormLogic";
import { DOWNLOADS, PROFILE, TYPE } from "../../constants/icons";
import { colors } from "../../styles/colors";

const PermitForm = ({ setShowPermitForm }) => {
  const {
    squareMeters,
    handleSquareMetersChange,
    handleSubmit,
    images,
    setImages,
    purpose,
    setPurpose,
  } = usePermitFormLogic(setShowPermitForm);

  const [isProcessing, setIsProcessing] = useState(false);

  // Function to handle image selection and upload
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
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages(result.assets.map((image) => image.uri));
    }
  };

  // Function to clear selected images
  const handleClearImages = () => {
    setImages([]); // Clear the images by setting it to an empty array
  };

  const handleSubmitRequest = () => {
    setIsProcessing(true);
    handleSubmit();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request Form</Text>
      {/* Other input fields for the form */}
      <View style={styles.row}>
        <View style={styles.logoContainer}>
          <Image source={TYPE} style={styles.logo} />
        </View>
        <TextInput
          placeholder="Purpose (ex. House Permit, Construction Supply Permit)"
          style={styles.input}
          value={purpose}
          onChangeText={setPurpose}
        />
      </View>

      <View style={styles.row}>
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
      </View>
      <View style={styles.additionalContainer}>
        <Text style={styles.header1}>Supporting Documents</Text>
      </View>

      {/* Display selected images */}
      {images.length > 0 ? (
        <ScrollView horizontal style={styles.imagePreviewContainer}>
          {images.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.imagePreview} />
          ))}
        </ScrollView>
      ) : (
        <View className="h-[100px]"></View>
      )}

      {/* Image upload input */}
      <View style={styles.fileUploadContainer}>
        <View style={styles.logoContainer}>
          <Image source={DOWNLOADS} style={styles.logo} />
        </View>
        <TouchableOpacity
          style={styles.fileUploadButton}
          onPress={handleImageUpload}
        >
          <Text style={styles.fileUploadButtonText}>
            {images.length > 0
              ? `Images Selected: ${images.length}`
              : "Upload Images"}
          </Text>
        </TouchableOpacity>
      </View>
      {/* Clear Images Button */}
      {images.length > 0 && (
        <TouchableOpacity
          onPress={handleClearImages}
          className="rounded-lg p-3 bg-greyGreen"
        >
          <Text className="text-center text-white">Clear Images</Text>
        </TouchableOpacity>
      )}
      {/* Submit and Cancel Buttons */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title={isProcessing ? "Processing" : "Submit Request"}
          onPress={handleSubmitRequest}
        />
        <CustomButton title="Cancel" onPress={() => setShowPermitForm(false)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 25,
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
  additionalContainer: {
    marginBottom: 20,
    backgroundColor: colors.primary,
  },
  header1: {
    marginBottom: 0,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: colors.white,
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
  fileUploadContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  fileUploadButton: {
    flex: 1,
    height: 53,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: colors.white,
  },
  fileUploadButtonText: {
    color: colors.primary,
  },
  imagePreviewContainer: {
    flexDirection: "row",
    marginBottom: 40,
  },
  imagePreview: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  clearButtonContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default PermitForm;
