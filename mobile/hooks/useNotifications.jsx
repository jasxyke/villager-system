import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import axiosClient from "../utils/axios";

// Notification handling settings
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Function to register for push notifications
async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;

    try {
      token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
      console.log("Expo Push Token:", token);
    } catch (error) {
      alert(`Error in getting push token: ${error.message}`);
    }
  } else {
    alert("Must use a physical device for push notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

// Custom hook to manage push notifications and token
export const usePushNotifications = (user_id) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const setupNotifications = async () => {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        setExpoPushToken(token);
        sendTokenToBackend(token); // Send token to Laravel backend
      }

      // Listener for notifications received in foreground
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          console.log("Notification received in foreground:", notification);
        });

      // Listener for when a notification is clicked
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log("User clicked on notification:", response);
          // Handle navigation or other actions here
        });

      return () => {
        if (notificationListener.current) {
          Notifications.removeNotificationSubscription(
            notificationListener.current
          );
        }
        if (responseListener.current) {
          Notifications.removeNotificationSubscription(
            responseListener.current
          );
        }
      };
    };

    setupNotifications();
  }, []);

  return { expoPushToken };
};

// Function to send the Expo token to the Laravel backend
async function sendTokenToBackend(token) {
  try {
    const res = axiosClient.post("/expo-token", {
      token: token,
      user_id: user_id,
    });

    console.log("Token sent to backend successfully");
  } catch (error) {
    console.error("Error sending token to backend:", error);
  }
}
