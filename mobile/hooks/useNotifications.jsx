import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { useRef, useState } from "react";
import { Platform } from "react-native";
import axiosClient from "../utils/axios";

// Notification handling settings
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Function to register for push notifications
async function registerForPushNotificationsAsync() {
  console.log("Push Notification Registered!");

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

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

    console.log("project id: ", projectId);

    try {
      token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
      console.log("Expo Push Token:", token);
    } catch (error) {
      alert(`Error in getting push token: ${error.message}`);
    }
  } else {
    alert("Must use a physical device for push notifications");
  }

  return token;
}

// Custom hook to manage push notifications and token
export const usePushNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();

  const setupNotifications = async (user_id) => {
    const expoToken = await getItemAsync("EXPO_TOKEN");
    if (expoToken) {
      setExpoPushToken(expoToken);
    } else {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        setExpoPushToken(token);
        sendTokenToBackend(token, user_id); // Send token to Laravel backend
        await setItemAsync("EXPO_TOKEN", token);
      }
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
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  };

  return { expoPushToken, setupNotifications };
};

// Function to send the Expo token to the Laravel backend
async function sendTokenToBackend(token, user_id) {
  try {
    const res = await axiosClient.post("/expo-token", {
      token: token,
      user_id: user_id,
    });

    console.log("Token sent to backend successfully");
    console.log(res.data.message);
  } catch (error) {
    console.log(error);
    console.error("Error sending token to backend:", error);
  }
}
