import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { formStyles } from "../../styles/profileStyles";
import TabsGradient from "../../components/gradients/TabsGradient";
import UserInfo from "../../components/common/UserInfo";
import EditProfile from "../../components/forms/ChangeInfo";
import AppHeader from "../../components/common/AppHeader";
import { useAuthContext } from "../../context/AuthContext";
import { VILLAGER_ICON } from "../../constants/icons";
import { formatFullName, formatName } from "../../utils/DataFormatter";
import { colors } from "../../styles/colors";
import moment from "moment/moment";
import useUser from "../../hooks/users/useUser";
import AlertModal from "../../components/modals/AlertModal";
import ChangePassword from "../../components/forms/ChangePassword";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPass, setIsChangPass] = useState(false);

  const { user } = useAuthContext();
  const { updateUser } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMsg, setModalMsg] = useState("");

  const openModal = () => {
    setModalVisible(true);
  };
  //get user full name for easy ano
  const userFullname = formatFullName(
    user.firstname,
    user.middlename,
    user.lastname,
    false
  );
  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleChangePassword = () => {
    setIsChangPass(true);
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

  const handleClosePress = () => {
    setIsEditing(false);
  };
  return (
    <ScrollView
      className="flex-1 bg-red-100"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <TabsGradient />
      <AppHeader />
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
      ) : isChangingPass ? (
        <ChangePassword
          onClose={() => {
            setIsChangPass(false);
          }}
        />
      ) : (
        <View className="justify-center items-center">
          <View className="w-[90%]">
            <UserInfo
              imageUrl={user.picture_url}
              userName={userFullname}
              userRole="Owner"
            />
            <View className="mb-2">
              <Text className="text-white text-base mb-1 font-pRegular">
                Name
              </Text>
              <TextInput
                value={userFullname}
                style={formStyles.textInput}
                editable={false}
              />
            </View>
            {user.resident === undefined ? null : (
              <View>
                <View className="mb-2">
                  <View>
                    <Text className="text-white text-base mb-1 font-pRegular">
                      Address
                    </Text>
                    <TextInput
                      multiline={true}
                      style={formStyles.textInput}
                      editable={false}
                      value={`BLK ${user.resident.address.block} LOT ${user.resident.address.lot} PAMAHAY VILLAGE SAN JOSE RODRIGUEZ, RIZAL`}
                    />
                  </View>
                </View>
                <View
                  className="mb-2"
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      width: "45%",
                    }}
                  >
                    <Text className="text-white text-base mb-1 font-pRegular">
                      Birthday
                    </Text>
                    <TextInput
                      value={moment(user.resident.birthdate).format("LL")}
                      style={formStyles.textInput}
                      editable={false}
                    />
                  </View>
                  <View
                    style={{
                      width: "45%",
                    }}
                  >
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
                <View
                  className="mb-2"
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      width: "45%",
                    }}
                  >
                    <Text className="text-white text-base mb-1 font-pRegular">
                      Civil Status
                    </Text>
                    <TextInput
                      value={formatName(user.resident.civil_status)}
                      style={formStyles.textInput}
                      editable={false}
                    />
                  </View>
                  <View
                    style={{
                      width: "45%",
                    }}
                  >
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
              </View>
            )}
            <View>
              <View style={styles.fixToText}>
                <TouchableOpacity
                  style={[styles.button, styles.editButton]}
                  onPress={handleEditPress}
                >
                  <Text className="font-pRegular" style={styles.buttonText}>
                    Edit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.editButton]}
                  onPress={handleChangePassword}
                >
                  <Text className="font-pRegular" style={styles.buttonText}>
                    Change password
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space",
    width: "100%", // Adjusted for proper spacing
    padding: 5,
  },
  button: {
    flex: 1,
    margin: 5,
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: colors.paleGreen,
  },
  editButton: {
    backgroundColor: colors.paleGreen,
  },
  saveButton: {},
  buttonText: {
    color: "#FFFFFF",
  },
});

export default Profile;
