import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
  Pressable,
  ScrollView,
} from "react-native";
import axios from "axios";
import { PERMISSION_TYPES } from "../../../data/contants";
import { formStyles } from "../../../styles/formStyles";
import TabsGradient from "../../../components/gradients/TabsGradient";
import { colors } from "../../../styles/colors";
import { formatName } from "../../../utils/DataFormatter";
import useUser from "../../../hooks/users/useUser";
import { useLocalSearchParams } from "expo-router";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [grantedPermissions, setGrantedPermissions] = useState([]);
  const { localUser: user, fetchUserDetails, loading } = useUser();
  const { houseId, userId } = useLocalSearchParams();

  const availablePermissions = PERMISSION_TYPES;

  const handleCreateAccount = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter an email address.");
      return;
    }

    if (permissions.length === 0) {
      Alert.alert("Error", "Please select at least one permission.");
      return;
    }
  };

  const togglePermission = (permissionType) => {
    setPermissions((prevPermissions) =>
      prevPermissions.includes(permissionType)
        ? prevPermissions.filter((p) => p !== permissionType)
        : [...prevPermissions, permissionType]
    );
  };

  const renderPermissionItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.permissionItem,
        permissions.includes(item) && styles.permissionItemSelected,
      ]}
      onPress={() => togglePermission(item)}
    >
      <Text style={styles.permissionText}>{formatName(item)}</Text>
    </TouchableOpacity>
  );

  const handleSucess = (msg) => {
    //
  };
  const handleError = (msg) => {
    setError(msg);
  };

  useEffect(() => {
    if (userId) {
      fetchUserDetails(userId, handleSucess, handleError);
    }
  }, [userId]);

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
    }
  }, [user]);

  return (
    <View className="h-full">
      <TabsGradient />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <TextInput
          style={formStyles.textInputLight}
          placeholder="Enter user's email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Text style={styles.subtitle}>Select Permissions:</Text>
        <FlatList
          data={availablePermissions}
          renderItem={renderPermissionItem}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.permissionsList}
        />
        <Pressable
          onPress={handleCreateAccount}
          style={formStyles.centerButton}
        >
          <Text style={formStyles.buttonText}>Create Account</Text>
        </Pressable>
        {/* <Text style={styles.subtitle}>Granted Permissions:</Text>
        <FlatList
          data={grantedPermissions}
          renderItem={({ item }) => (
            <Text style={styles.grantedPermissionText}>
              {item.permission_type} (Expires: {item.expires_at || "N/A"})
            </Text>
          )}
          keyExtractor={(item) => item.id.toString()}
        /> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  permissionsList: {
    marginBottom: 20,
  },
  permissionItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: colors.greyGreen,
    borderRadius: 5,
    marginBottom: 5,
  },
  permissionItemSelected: {
    borderColor: colors.gray,
    backgroundColor: colors.green,
  },
  permissionText: {
    fontSize: 16,
    color: colors.white,
  },
  grantedPermissionText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CreateAccount;
