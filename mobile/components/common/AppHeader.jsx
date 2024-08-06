import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import AppLogo from "../../components/common/AppLogo";
import { BELL, HAMBURGER } from "../../constants/icons";
import NavigationModal from "../modals/NavigationModal";

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
        <Image source={BELL} style={styles.bellStyle} />
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
});

export default AppHeader;
