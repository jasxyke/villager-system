import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import AppLogo from "../../components/common/AppLogo";
import { BELL, HAMBURGER } from "../../constants/icons";
import NavigationModal from "../modals/NavigationModal";
import { colors } from "../../styles/colors";
import { useAuthContext } from "../../context/AuthContext";
import { useNotificationsContext } from "../../context/NotificationContext"; // Import the context
import { router } from "expo-router";

const AppHeader = ({ addStyles }) => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const handleCloseMenu = () => {
    setVisibleMenu(false);
  };
  const openMenu = () => {
    setVisibleMenu(true);
  };

  const { user } = useAuthContext();
  const { notifications, loading } = useNotificationsContext(); // Consume the context

  const goToNotifications = () => {
    router.push("../notifications");
  };

  // Calculate the unread notification count
  const unreadNotificationCount = notifications.filter(
    (notification) => notification.read_status === "unread"
  ).length;

  useEffect(() => {
    if (user?.id) {
      // Fetch notifications when the user is available
    }
  }, [user]);

  return (
    <View
      className={
        "flex-row justify-between items-center bg-transparent p-5 pb-3 pt-10 " +
        addStyles
      }
    >
      <NavigationModal visible={visibleMenu} onClose={handleCloseMenu} />
      <AppLogo width={50} height={50} />
      <View className="flex-row gap-x-3 mr-3">
        <Pressable onPress={goToNotifications} className="">
          <Image source={BELL} style={styles.bellStyle} />
          {unreadNotificationCount > 0 && (
            <Text style={styles.notificationCount}>
              {unreadNotificationCount}
            </Text>
          )}
        </Pressable>
        <Pressable onPress={openMenu}>
          <Image source={HAMBURGER} style={styles.hamburgerMenu} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bellStyle: {
    width: 30,
    height: 30,
  },
  hamburgerMenu: {
    width: 30,
    height: 30,
  },
  notificationCount: {
    position: "absolute",
    backgroundColor: "red",
    color: "white",
    borderRadius: 50,
    paddingHorizontal: 4,
    fontSize: 9,
    right: 0,
  },
});

export default AppHeader;
