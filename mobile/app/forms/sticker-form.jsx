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
import { colors } from "../../styles/colors";
import Modal from "react-native-modal";
import TabsGradient from "../../components/gradients/TabsGradient";

const CarStickerForm = ({ setShowCarStickerForm }) => {
  const [carModel, setCarModel] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled) {
      const newImage = { uri: result.assets[0].uri, description: "" };
      setImages((prevImages) => [...prevImages, newImage]);
    }
  };

  // Function to handle image description change
  const handleDescriptionChange = (index, text) => {
    const newImages = [...images];
    newImages[index].description = text;
    setImages(newImages);
  };

  // Function to clear selected images
  const handleClearImages = () => {
    setImages([]);
  };

  // Function to open the modal with the selected image
  const handleImagePress = (uri) => {
    setSelectedImage(uri);
    setIsModalVisible(true);
  };

  // Function to handle image modal close
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  const handleSubmitRequest = () => {
    if (!carModel || !plateNumber) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    if (images.length === 0) {
      Alert.alert("Error", "Please upload at least one supporting document.");
      return;
    }

    const requestData = {
      carModel,
      plateNumber,
      images,
    };

    // Submit logic goes here

    setShowCarStickerForm(false); // Close the form after submission
  };

  return (
    <View className="flex-1">
      <TabsGradient />
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Car Sticker Request Form</Text>

          {/* Car Model Input */}
          <View style={styles.row}>
            <TextInput
              placeholder="Car Model (e.g., Toyota Corolla)"
              style={styles.input}
              value={carModel}
              onChangeText={setCarModel}
            />
          </View>

          {/* Plate Number Input */}
          <View style={styles.row}>
            <TextInput
              placeholder="Plate Number (e.g., ABC-1234)"
              style={styles.input}
              value={plateNumber}
              onChangeText={setPlateNumber}
            />
          </View>

          {/* Supporting Documents Section */}
          <View style={styles.additionalContainer}>
            <Text style={styles.header1}>Supporting Documents</Text>
          </View>

          {/* Display selected images with descriptions */}
          {images.length > 0 ? (
            <ScrollView horizontal style={styles.imagePreviewContainer}>
              {images.map((item, index) => (
                <View key={index} style={styles.imageContainer}>
                  <TouchableOpacity onPress={() => handleImagePress(item.uri)}>
                    <Image
                      source={{ uri: item.uri }}
                      style={styles.imagePreview}
                    />
                  </TouchableOpacity>
                  <TextInput
                    placeholder="Add description"
                    style={styles.descriptionInput}
                    value={item.description}
                    onChangeText={(text) =>
                      handleDescriptionChange(index, text)
                    }
                  />
                </View>
              ))}
            </ScrollView>
          ) : (
            <View style={{ height: 100 }}></View>
          )}

          {/* Image upload input */}
          <View style={styles.fileUploadContainer}>
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

          {/* Clear Images Button */}
          {images.length > 0 && (
            <View style={styles.clearButtonContainer}>
              <TouchableOpacity onPress={handleClearImages}>
                <Text style={styles.clearButtonText}>Clear Images</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Submit and Cancel Buttons */}
          <View style={styles.buttonContainer}>
            <CustomButton
              title={"Submit Request"}
              onPress={handleSubmitRequest}
            />
            <CustomButton
              title="Cancel"
              onPress={() => setShowCarStickerForm(false)}
            />
          </View>

          {/* Image Modal */}
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={handleModalClose}
            style={styles.modal}
          >
            <View style={styles.modalContent}>
              <Image
                source={{ uri: selectedImage }}
                style={styles.modalImage}
              />
              <TouchableOpacity
                onPress={handleModalClose}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
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
  input: {
    flex: 1,
    height: 53,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
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
    borderRadius: 5,
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

export default CarStickerForm;
