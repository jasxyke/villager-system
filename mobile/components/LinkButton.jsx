import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../styles/colors";
import { Link } from "expo-router";

const LinkButton = ({ url, text }) => {
  return (
    <Link
      push
      href={url}
      className="p-5 border text-center bg-greyGreen"
      style={styles.navContainer}
    >
      <Text style={styles.link}>{text}</Text>
    </Link>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    width: "75%",
    borderRadius: 20,
    color: colors.greyGreen,
  },

  link: {
    color: colors.white,
  },
});

export default LinkButton;
