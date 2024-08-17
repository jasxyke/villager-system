import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import { colors } from "../../../styles/colors";

const LoadingEmptyAnnouncements = ({ loading, announcements }) => {
  return (
    <View style={styles.scrollContainer}>
      {loading ? (
        <ActivityIndicator size={"large"} color={"white"} />
      ) : announcements === null ? (
        <ActivityIndicator size={"large"} color={"white"} />
      ) : (
        announcements.length === 0 && <Text>No recent announcements</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    width: "90%",
    height: 275,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: colors.primary,
  },
});

export default LoadingEmptyAnnouncements;
