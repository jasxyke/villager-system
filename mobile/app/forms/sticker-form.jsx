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
  ActivityIndicator,
} from "react-native";
import CustomButton from "../../components/common/CustomButton";
import { colors } from "../../styles/colors";
import Modal from "react-native-modal";
import TabsGradient from "../../components/gradients/TabsGradient";
import useCarStickers from "../../hooks/stickers/useCarStickers"; // Updated import path
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

const CarStickerForm = ({ setShowCarStickerForm }) => {
  const [carModel, setCarModel] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { createCarStickerRequest, loading, error, success } = useCarStickers();

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

  const handleSubmitRequest = async () => {
    if (!carModel || !plateNumber) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    if (images.length === 0) {
      Alert.alert("Error", "Please upload at least one supporting document.");
      return;
    }

    try {
      const msg = await createCarStickerRequest(carModel, plateNumber, images);
      if (msg) {
        Alert.alert("Success", msg);
        router.back();
      }
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TabsGradient />
      <ScrollView style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Car Sticker Request Form</Text>

          {error && (
            <Text style={styles.errorMessage}>
              {error || "An error occurred"}
            </Text>
          )}

          <View style={styles.row}>
            <TextInput
              placeholder="Car Model (e.g., Toyota Corolla)"
              style={styles.input}
              value={carModel}
              onChangeText={setCarModel}
            />
          </View>

          <View style={styles.row}>
            <TextInput
              placeholder="Plate Number (e.g., ABC-1234)"
              style={styles.input}
              value={plateNumber}
              onChangeText={setPlateNumber}
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

          {images.length > 0 && (
            <View style={styles.clearButtonContainer}>
              <TouchableOpacity onPress={handleClearImages}>
                <Text style={styles.clearButtonText}>Clear Images</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <CustomButton
              title={"Submit Request"}
              onPress={handleSubmitRequest}
            />
            <CustomButton title="Cancel" onPress={() => router.back()} />
          </View>

          {loading && (
            <ActivityIndicator
              size="large"
              color={colors.primary}
              style={styles.loadingIndicator}
            />
          )}

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
      </ScrollView>
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
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default CarStickerForm;
