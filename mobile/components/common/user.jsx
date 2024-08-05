import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const UserInfo = ({ imageUrl, userName, userRole }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imageUrl} style={styles.image} resizeMode="contain" />
        <Text className="text-white text-xs underline mt-1">
          Change Picture
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text className="text-white text-2xl font-pRegular">{userName}</Text>
        <Text className="text-black text-base mb-1 font-pRegular font-bold">
          {userRole}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
  infoContainer: {
    flex: 3,
    display: "flex",
    justifyContent: "center",
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  text: {
    fontSize: 20,
  },
});

export default UserInfo;
