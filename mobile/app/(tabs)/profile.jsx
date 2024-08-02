import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { formStyles } from '../../styles/profileStyles';
import TabsGradient from '../../components/gradients/TabsGradient';
import UserInfo from '../../components/common/user';
import EditProfile from "../../components/forms/ChangeInfo";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSavePress = () => {
    setIsEditing(false);
    Alert.alert('Save button pressed');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View className="flex-1 h-full">
        <TabsGradient />
        <UserInfo
          imageUrl="c:/Users/RYDEL FABELLON/Programming Project/villager-system/mobile/assets/icon/profile.png"
          userName="Juan Dela Cruz"
          userRole="Owner"
        />
        {isEditing ? (
          <EditProfile onSave={handleSavePress} />
        ) : (
          <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1, marginLeft: 10, marginRight: 10, marginBottom: 20 }}>
                <Text>Name</Text>
                <TextInput style={formStyles.textInput} editable={false} />
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1, marginLeft: 10, marginRight: 10, marginBottom: 20 }}>
                <Text>Address</Text>
                <TextInput style={formStyles.textInput} editable={false} />
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1, marginLeft: 10, marginRight: 10, marginBottom: 20 }}>
                <Text>Birthday</Text>
                <TextInput style={formStyles.textInput} editable={false} />
              </View>
              <View style={{ flex: 1, marginLeft: 10, marginRight: 10, marginBottom: 20 }}>
                <Text>Gender</Text>
                <TextInput style={formStyles.textInput} editable={false} />
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1, marginLeft: 10, marginRight: 10, marginBottom: 20 }}>
                <Text>Facebook Link</Text>
                <TextInput style={formStyles.textInput} editable={false} />
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1, marginLeft: 10, marginRight: 10, marginBottom: 20 }}>
                <Text>Civil Status</Text>
                <TextInput style={formStyles.textInput} editable={false} />
              </View>
              <View style={{ flex: 1, marginLeft: 10, marginRight: 10, marginBottom: 20 }}>
                <Text>Occupation</Text>
                <TextInput style={formStyles.textInput} editable={false} />
              </View>
            </View>
            <View style={styles.container}>
              <View style={styles.fixToText}>
                <TouchableOpacity
                  style={[styles.button, styles.editButton]}
                  onPress={handleEditPress}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.saveButton]}
                  onPress={handleSavePress}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 320, // Adjusted for proper spacing
    padding: 5,
  },
  button: {
    flex: 1,
    margin: 5,
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#1A2902',
  },
  saveButton: {
    backgroundColor: '#1A2902',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default Profile;
