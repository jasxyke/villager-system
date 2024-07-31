import { Image, StyleSheet } from "react-native";
import React from "react";
import { LOGO } from ".../../../constants/icons";

const AppLogo = ({ width = 150, height = 150 }) => {
  return <Image source={LOGO} style={{ width: width, height: height }} />;
};

export default AppLogo;
