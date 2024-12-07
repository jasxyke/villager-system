import { useState, useCallback } from "react";
import axiosClient from "../../utils/axios";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";

const useDownloadPermitReceipt = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileUri, setFileUri] = useState(null);

  /**
   * Fetch the receipt URL and download the receipt.
   */
  const downloadReceipt = useCallback(async (paymentId) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch the URL from the backend
      const response = await axiosClient.get(
        `/permit-payments/download-receipt/${paymentId}`
      );
      const receiptUrl = response.data.url;

      if (receiptUrl) {
        // Define the local path where the receipt will be saved
        const localUri =
          FileSystem.documentDirectory +
          `permit_payment_receipt_${paymentId}.pdf`;

        // Download the file to local storage
        const downloadResumable = FileSystem.createDownloadResumable(
          receiptUrl,
          localUri
        );
        const result = await downloadResumable.downloadAsync();

        // Store the file URI to use later (e.g., opening or sharing the file)
        setFileUri(result.uri);

        // Show success alert with the file URI
        // Alert.alert(
        //   "Download Successful",
        //   `Receipt downloaded to: ${result.uri}`,
        //   [{ text: "OK" }]
        // );

        // Now copy the file to the cache directory for sharing
        const publicUri =
          FileSystem.cacheDirectory + `permit_payment_receipt_${paymentId}.pdf`;
        await FileSystem.copyAsync({ from: result.uri, to: publicUri });

        // Ensure that the file is accessible and then share it
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(publicUri, {
            mimeType: "application/pdf", // Explicitly set the MIME type for PDF
          });
        } else {
          Alert.alert(
            "Sharing Not Available",
            "Your device does not support sharing.",
            [{ text: "OK" }]
          );
        }
      } else {
        setError("Receipt URL not found.");
        Alert.alert("Error", "Receipt URL not found.", [{ text: "OK" }]);
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "An error occurred while downloading the receipt."
      );
      Alert.alert(
        "Download Failed",
        err.response?.data?.error || "Something went wrong.",
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    fileUri,
    downloadReceipt,
  };
};

export default useDownloadPermitReceipt;
