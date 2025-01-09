import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import TabsGradient from "../../../components/gradients/TabsGradient";
import UserInfo from "../../../components/Screens/Profile/UserInfo";
import { router, useLocalSearchParams } from "expo-router";
import useResident from "../../../hooks/houses/useResident";
import { formStyles } from "../../../styles/profileStyles";
import moment from "moment/moment";
import { formatName, formatUserName } from "../../../utils/DataFormatter";
import { colors } from "../../../styles/colors";
import AlertModal from "../../../components/modals/AlertModal";
import EditProfile from "../../../components/forms/EditProfile";
import useUser from "../../../hooks/users/useUser";

const HouseMember = () => {
  const { userId } = useLocalSearchParams(); // Extract residentId from params
  const [isEditing, setIsEditing] = useState(false);
  const { updateUser, localUser: user, fetchUserDetails, loading } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMsg, setModalMsg] = useState("");
  const [error, setError] = useState("");

  const openModal = () => {
    setModalVisible(true);
  };

  const handleSucess = (msg) => {
    //
  };
  const handleError = (msg) => {
    setError(msg);
  };
  // Fetch resident details when the component mounts

  useEffect(() => {
    if (userId) {
      fetchUserDetails(userId, handleSucess, handleError);
    }
  }, [userId]);

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSavePress = (user) => {
    setIsEditing(false);
    updateUser(
      user,
      (msg) => {
        openModal();
        setModalTitle("Update success!");
        setModalMsg(msg);
      },
      (msg) => {
        openModal();
        setModalTitle("Update error!");
        setModalMsg(msg);
      }
    );
  };

  const handleCreateAccount = () => {
    router.push({
      pathname: "./create-account",
      params: { houseId: user.resident.house_id },
    });
  };

  const handleClosePress = () => {
    setIsEditing(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TabsGradient />
      <AlertModal
        title={modalTitle}
        message={modalMsg}
        visible={modalVisible}
        onClose={setModalVisible}
      />
      {isEditing ? (
        <EditProfile
          user={user}
          onSave={handleSavePress}
          onClose={handleClosePress}
        />
      ) : (
        <View style={styles.mainContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            user && (
              <View>
                {/* Reusing UserInfo Component */}
                <UserInfo
                  imageUrl={user.picture_url}
                  userName={formatUserName(user, false)}
                  userRole={formatName(user.role_type)}
                />

                {/* Name */}
                <View className="mb-2">
                  <Text className="text-white text-base mb-1 font-pRegular">
                    Name
                  </Text>
                  <TextInput
                    value={formatUserName(user, false)}
                    style={formStyles.textInput}
                    editable={false}
                  />
                </View>

                {/* Address */}
                <View className="mb-2">
                  <Text className="text-white text-base mb-1 font-pRegular">
                    Address
                  </Text>
                  <TextInput
                    multiline={true}
                    style={formStyles.textInput}
                    editable={false}
                    value={`BLK ${user.resident.house.block} LOT ${user.resident.house.lot} PAMAHAY VILLAGE SAN JOSE RODRIGUEZ, RIZAL`}
                  />
                </View>

                {/* Birthday and Sex */}
                <View
                  className="mb-2"
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "45%" }}>
                    <Text className="text-white text-base mb-1 font-pRegular">
                      Birthday
                    </Text>
                    <TextInput
                      value={moment(user.resident.birthdate).format("LL")}
                      style={formStyles.textInput}
                      editable={false}
                    />
                  </View>
                  <View style={{ width: "45%" }}>
                    <Text className="text-white text-base mb-1 font-pRegular">
                      Sex
                    </Text>
                    <TextInput
                      value={formatName(user.resident.sex)}
                      style={formStyles.textInput}
                      editable={false}
                    />
                  </View>
                </View>

                {/* Facebook Name */}
                <View className="mb-2">
                  <Text className="text-white text-base mb-1 font-pRegular">
                    Facebook Name/Link
                  </Text>
                  <TextInput
                    value={user.resident.fb_name}
                    style={formStyles.textInput}
                    editable={false}
                  />
                </View>

                {/* Civil and Occupation Status */}
                <View
                  className="mb-2"
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "45%" }}>
                    <Text className="text-white text-base mb-1 font-pRegular">
                      Civil Status
                    </Text>
                    <TextInput
                      value={formatName(user.resident.civil_status)}
                      style={formStyles.textInput}
                      editable={false}
                    />
                  </View>
                  <View style={{ width: "45%" }}>
                    <Text className="text-white text-base mb-1 font-pRegular">
                      Occupation status
                    </Text>
                    <TextInput
                      value={formatName(user.resident.occupation_status)}
                      style={formStyles.textInput}
                      editable={false}
                    />
                  </View>
                </View>
                {/* Edit Profile Button */}
                <View style={styles.buttonContainer}>
                  <Pressable
                    style={[styles.button, styles.editButton]}
                    onPress={handleEditPress}
                  >
                    <Text style={styles.buttonText}>Edit Profile</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.createAccountBtn]}
                    onPress={handleCreateAccount}
                  >
                    <Text style={styles.buttonText}>Create Account</Text>
                  </Pressable>
                </View>
              </View>
            )
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  mainContainer: {
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    columnGap: 20,
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.paleGreen,
    alignItems: "center",
    flexGrow: 1,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  editButton: {
    backgroundColor: colors.paleGreen,
  },
  createAccountBtn: {
    backgroundColor: colors.secondary,
  },
});

export default HouseMember;
