import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import AppLogo from "../../components/common/AppLogo";
import { BELL, HAMBURGER } from "../../constants/icons";

const AppHeader = ({ addStyles }) => {
  return (
    <View
      className={
        "flex-row justify-between items-center bg-transparent p-5 pb-3 pt-10 " +
        addStyles
      }
    >
      <AppLogo width={50} height={50} />
      <View className="flex-row gap-x-3 mr-3">
        <Image source={BELL} style={styles.bellStyle} />
        <Image source={HAMBURGER} style={styles.hamburgerMenu} />
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
