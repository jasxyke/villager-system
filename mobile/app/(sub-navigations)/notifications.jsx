import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useNotificationsContext } from "../../context/NotificationContext";
import TabsGradient from "../../components/gradients/TabsGradient";
import LoadingScreen from "../../components/common/LoadingScreen";
import { router } from "expo-router";
import { colors } from "../../styles/colors";

const NotificationsScreen = () => {
  const { notifications, loading, markNotificationAsRead } =
    useNotificationsContext();

  const viewNotification = (id) => {
    markNotificationAsRead(id);
    router.push("./notifications/" + id);
  };

  const renderNotificationItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => viewNotification(item.id)}
        style={[
          styles.notificationItem,
          item.read_status === "unread"
            ? styles.unreadNotification
            : styles.readNotification,
        ]}
      >
        <Text style={styles.notificationTitle}>{item.caption}</Text>
        <Text style={styles.notificationText}>{item.content}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TabsGradient />

      {loading ? (
        <LoadingScreen />
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  notificationItem: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
  },
  unreadNotification: {
    backgroundColor: "#e8f5e9", // Light green for unread notifications
  },
  readNotification: {
    backgroundColor: "#f1f1f1", // Light gray for read notifications
  },
  notificationTitle: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "400",
    marginBottom: 5,
  },
  notificationText: {
    fontSize: 12,
    color: colors.gray,
  },
});

export default NotificationsScreen;
