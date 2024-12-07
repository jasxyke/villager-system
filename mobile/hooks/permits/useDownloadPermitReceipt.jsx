import { useState, useCallback } from "react";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import axiosClient from "../../utils/axios";

const useDownloadPermitReceipt = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const downloadReceipt = useCallback(async (paymentId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.get(
        `/permit-payments/${paymentId}/download-receipt`,
        {
          responseType: "blob", // To handle the file response
        }
      );

      // Generate a file path for the downloaded receipt
      const fileUri = `${FileSystem.cacheDirectory}permit_payment_receipt_${paymentId}.pdf`;

      // Write the blob data to the file system
      await FileSystem.writeAsStringAsync(fileUri, response.data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Use the Sharing API to allow the user to open or save the file
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        throw new Error("Sharing is not available on this device.");
      }
    } catch (err) {
      console.error(err);
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
