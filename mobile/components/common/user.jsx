import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const UserInfo = ({ imageUrl, userName, userRole }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text>Change Picture</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text>{userName}</Text>
        <Text>{userRole}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  imageContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
  },
  image: {
    width: 75,
    height: 75, 
    borderRadius: 50, 
  },
  text: {
    fontSize: 20,
  }
});

export default UserInfo;
