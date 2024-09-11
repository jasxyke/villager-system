import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Pressable, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import useUser from "../../../hooks/users/useUser";
import { useAuthContext } from "../../../context/AuthContext";

const UserInfo = ({ imageUrl, userName, userRole }) => {
  const [image, setImage] = useState(null);

  const { changePicture } = useUser();
  const { user, setUser } = useAuthContext();

  const handleChangePicSuccess = (url) => {
    setImage(url);
    setUser({ ...user, picture_url: url });
  };

  const handleChangePicError = (msg) => {
    Alert.alert("Error changing picture", msg);
    setImage(null);
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      //setImage(result.assets[0].uri);
      changePicture(
        result.assets[0],
        handleChangePicSuccess,
        handleChangePicError
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Pressable onPress={pickImage}>
          <View>
            <Image
              source={{ uri: image === null ? imageUrl : image }}
              style={styles.image}
              resizeMode="cover"
            />
            <Text className="text-white text-xs underline mt-1">
              Change Picture
            </Text>
          </View>
        </Pressable>
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
