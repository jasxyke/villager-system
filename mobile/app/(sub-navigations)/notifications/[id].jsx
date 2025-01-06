import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import TabsGradient from "../../../components/gradients/TabsGradient";
import { useLocalSearchParams } from "expo-router";
import { useNotificationsContext } from "../../../context/NotificationContext";

const Notification = () => {
  const { id } = useLocalSearchParams(); // Assuming the ID is passed as a route parameter
  const { notifications, loading, markNotificationAsRead } =
    useNotificationsContext();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (id && notifications.length) {
      const foundNotification = notifications.find(
        (notif) => notif.id === parseInt(id, 10)
      );
      setNotification(foundNotification || null);
    }
  }, [id, notifications]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!notification) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Notification not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <TabsGradient />
      <View style={styles.container}>
        <Text style={styles.title}>{notification.caption}</Text>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.content}>{notification.content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: "100%",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    marginTop: 16,
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

export default Notification;
