import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { formStyles } from '../../styles/profileStyles';

const EditProfile = ({ onSave }) => {
  return (
    <View style={styles.container}>
      <Text>Last Name</Text>
      <TextInput style={formStyles.textInput} />
      <Text>First Name</Text>
      <TextInput style={formStyles.textInput} />
      <Text>Middle Name</Text>
      <TextInput style={formStyles.textInput} />
      <Text>Address</Text>
      <TextInput style={formStyles.textInput} />
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text>Birthday</Text>
                <TextInput style={formStyles.textInput} editable={false} />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text>Gender</Text>
                <TextInput style={formStyles.textInput} editable={false} />
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1}}>
                <Text>Facebook Link</Text>
                <TextInput style={formStyles.textInput} editable={false} />
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1, marginRight: 10}}>
                <Text>Civil Status</Text>
                <TextInput style={formStyles.textInput} editable={false} />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text>Occupation</Text>
                <TextInput style={formStyles.textInput} editable={false} />
              </View>
            </View>
      <View style={styles.fixToText}>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={onSave}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#1A2902',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default EditProfile;
