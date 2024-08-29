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
import Modal from "react-native-modal";

const PermitForm = ({ setShowPermitForm }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    squareMeters,
    handleSquareMetersChange,
    handleSubmit,
    images,
    setImages,
    purpose,
    setPurpose,
  } = usePermitFormLogic(setIsProcessing);

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

  const handleDescriptionChange = (index, text) => {
    const newImages = [...images];
    newImages[index].description = text;
    setImages(newImages);
  };

  const handleClearImages = () => {
    setImages([]);
  };

  const handleImagePress = (uri) => {
    setSelectedImage(uri);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  const handleSubmitRequest = () => {
    setIsProcessing(true);
    handleSubmit();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request Form</Text>
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

      {images.length > 0 ? (
        <ScrollView horizontal style={styles.imagePreviewContainer}>
          {images.map((item, index) => (
            <View key={index} style={styles.imageContainer}>
              <TouchableOpacity onPress={() => handleImagePress(item.uri)}>
                <Image source={{ uri: item.uri }} style={styles.imagePreview} />
              </TouchableOpacity>
              <TextInput
                placeholder="Add description"
                style={styles.descriptionInput}
                value={item.description}
                onChangeText={(text) => handleDescriptionChange(index, text)}
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={{ height: 100 }}></View>
      )}

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
              : "Upload Image"}
          </Text>
        </TouchableOpacity>
      </View>

      {images.length > 0 && (
        <View style={styles.clearButtonContainer}>
          <TouchableOpacity onPress={handleClearImages}>
            <Text style={styles.clearButtonText}>Clear Images</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <CustomButton
          title={isProcessing ? "Processing" : "Submit Request"}
          onPress={handleSubmitRequest}
        />
        <CustomButton title="Cancel" onPress={() => setShowPermitForm(false)} />
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={handleModalClose}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Image source={{ uri: selectedImage }} style={styles.modalImage} />
          <TouchableOpacity
            onPress={handleModalClose}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  imageContainer: {
    marginRight: 10,
    width: 170,
  },
  imagePreview: {
    width: 170,
    height: 190,
    borderRadius: 10,
  },
  descriptionInput: {
    width: 170,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    backgroundColor: colors.white,
  },
  clearButtonContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  clearButtonText: {
    color: "white",
    backgroundColor: colors.greyGreen,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalImage: {
    width: 300,
    height: 600,
    resizeMode: "contain",
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  closeButtonText: {
    color: colors.white,
  },
});

export default PermitForm;
