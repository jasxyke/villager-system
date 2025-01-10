import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  Pressable,
  ScrollView,
} from "react-native";
import { formStyles } from "../../../styles/formStyles";
import TabsGradient from "../../../components/gradients/TabsGradient";
import { colors } from "../../../styles/colors";
import { formatName } from "../../../utils/DataFormatter";
import useUser from "../../../hooks/users/useUser";
import { useLocalSearchParams } from "expo-router";
import useCreateAccount from "../../../hooks/houses/useCreateAccount";
import { PERMISSION_TYPES } from "../../../data/contants";

const ManageAccount = () => {
  const [email, setEmail] = useState("");
  const [permissions, setPermissions] = useState([]);
  const { localUser: user, fetchUserDetails } = useUser();
  const { houseId, userId } = useLocalSearchParams();
  const { createAccount, loading, error, successMessage } = useCreateAccount();

  const availablePermissions = PERMISSION_TYPES;

  const handleCreateAccount = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter an email address.");
      return;
    }

    if (permissions.length === 0) {
      Alert.alert("Error", "Please select at least one permission.");
      return;
    }

    try {
      const data = await createAccount({
        email,
        houseId,
        userId,
        permissions,
      });
      Alert.alert("Success", data.message);
    } catch (err) {
      Alert.alert("Error", err.message || "An error occurred.");
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

  useEffect(() => {
    if (userId) {
      fetchUserDetails(
        userId,
        () => {}, // Success handler
        () => {} // Error handler
      );
    }
  }, [userId]);

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      const userPermissions = user.household_permissions.map(
        (perm) => perm.permission_type
      );
      setPermissions(userPermissions);
    }
  }, [user]);

  return (
    <View style={{ flex: 1 }}>
      <TabsGradient />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create or Update Account</Text>
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
          disabled={loading}
        >
          <Text style={formStyles.buttonText}>
            {loading ? "Processing..." : "Submit"}
          </Text>
        </Pressable>
        {error && <Text style={styles.errorText}>{error}</Text>}
        {successMessage && (
          <Text style={styles.successText}>{successMessage}</Text>
        )}
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
  errorText: {
    color: "red",
    marginTop: 10,
  },
  successText: {
    color: colors.secondary,
    marginTop: 10,
    marginHorizontal: "auto",
  },
});

export default ManageAccount;
