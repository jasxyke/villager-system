import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import AppLogo from "../../components/common/AppLogo";
import { BELL } from "../../constants/icons";

const AppHeader = ({ addStyles }) => {
  return (
    <View
      className={
        "flex-row justify-between items-center bg-transparent p-5 pb-3 pt-10 " +
        addStyles
      }
    >
      <AppLogo width={50} height={50} />
      <Image source={BELL} style={styles.bellStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  bellStyle: {
    width: 30,
    height: 30,
  },
});

export default AppHeader;
