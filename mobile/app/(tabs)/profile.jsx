import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  VirtualizedList,
} from "react-native";
import { formStyles } from "../../styles/profileStyles";
import TabsGradient from "../../components/gradients/TabsGradient";
import UserInfo from "../../components/common/UserInfo";
import EditProfile from "../../components/forms/ChangeInfo";
import AppHeader from "../../components/common/AppHeader";
import { useAuthContext } from "../../context/AuthContext";
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

  // VirtualizedList requires itemCount and getItem functions
  const getItem = (data, index) => data[index];
  const getItemCount = (data) => data.length;

  return (
    <VirtualizedList
      data={isEditing ? [1] : [0]}
      initialNumToRender={1}
      renderItem={() => (
        <>
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
                        value={`BLK ${user.resident.house.block} LOT ${user.resident.house.lot} PAMAHAY VILLAGE SAN JOSE RODRIGUEZ, RIZAL`}
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
                  <View className="mb-2">
                    <Text className="text-white text-base mb-1 font-pRegular">
                      Family Members
                    </Text>
                    {/* Display family members here */}
                    {user.familyMembers && user.familyMembers.length > 0 ? (
                      user.familyMembers.map((member, index) => (
                        <View key={index} className="mb-2">
                          <TextInput
                            value={`${member.name} - ${member.relation}`}
                            style={formStyles.textInput}
                            editable={false}
                          />
                        </View>
                      ))
                    ) : (
                      <TextInput
                        value="No family members added."
                        style={formStyles.textInput}
                        editable={false}
                      />
                    )}
                  </View>
                </View>
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
        </>
      )}
      keyExtractor={(item, index) => index.toString()}
      getItem={getItem}
      getItemCount={getItemCount}
    />
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
    justifyContent: "space-between",
    width: "100%",
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
  buttonText: {
    color: "#FFFFFF",
  },
});

export default Profile;
