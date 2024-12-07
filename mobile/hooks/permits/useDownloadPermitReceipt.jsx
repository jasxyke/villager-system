import { useState, useCallback } from "react";
import { Alert, Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import axiosClient from "../../utils/axios";

// Helper to convert ArrayBuffer to Base64
const arrayBufferToBase64 = (buffer) => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

const useDownloadPermitReceipt = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const downloadReceipt = useCallback(async (paymentId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.get(
        `/permit-payments/download-receipt/${paymentId}`,
        {
          responseType: "arraybuffer", // Get binary data
        }
      );

      // Convert ArrayBuffer to Base64
      const base64Data = arrayBufferToBase64(response.data);

      // Generate a temporary file path
      const fileUri = `${FileSystem.cacheDirectory}permit_payment_receipt_${paymentId}.pdf`;

      // Write the Base64 data to the temporary file
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      if (Platform.OS === "android") {
        // Request permission to save the file to the public Downloads folder
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
          throw new Error("Permission to access media library is required.");
        }

        // Save the file to the Downloads folder
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        await MediaLibrary.createAlbumAsync("Download", asset, false);

        Alert.alert(
          "Receipt Saved",
          "The receipt has been saved to the Downloads folder."
        );
      } else if (Platform.OS === "ios") {
        // Use the Sharing API to allow the user to save or share the file
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(fileUri);
        } else {
          throw new Error("Sharing is not available on this device.");
        }
      }
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      setError(
        err.response?.data?.message ||
          "An error occurred while downloading the receipt."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    downloadReceipt,
  };
};

export default useDownloadPermitReceipt;
