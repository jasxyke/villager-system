import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import AppLogo from "../../components/common/AppLogo";
import { BELL, HAMBURGER } from "../../constants/icons";
import NavigationModal from "../modals/NavigationModal";
import { colors } from "../../styles/colors";

const AppHeader = ({ addStyles }) => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const handleCloseMenu = () => {
    setVisibleMenu(false);
  };
  const openMenu = () => {
    setVisibleMenu(true);
  };
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
        <View className="">
          <Image source={BELL} style={styles.bellStyle} />
          <Text style={styles.notificationCount}>1</Text>
        </View>
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
