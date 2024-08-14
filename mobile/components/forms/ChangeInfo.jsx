import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { formStyles } from "../../styles/profileStyles";
import { colors } from "../../styles/colors";
import moment from "moment";
import { formatName } from "../../utils/DataFormatter";
import {
  DROPDOWN_CIVIL_STATUSES,
  DROPDOWN_OCCUPATION_STATUSES,
} from "../../data/DataStructures";

import DropDownPicker from "react-native-dropdown-picker";

const EditProfile = ({ onSave, user, onClose }) => {
  const [editedUser, setEditUser] = useState(user);
  const [selectedCivlStatus, setSelectedCivilStatus] = useState(
    editedUser?.resident?.civil_status
  );
  const [selectedOccupation, setSelectedOccupation] = useState(
    editedUser?.resident?.occupation_status
  );
  const [openCivil, setOpenCivil] = useState(false);
  const [openOccupation, setOpenOccupation] = useState(false);
  const [civilStatuses, setCivilStatuses] = useState(DROPDOWN_CIVIL_STATUSES);
  const [occupations, setOccupations] = useState(DROPDOWN_OCCUPATION_STATUSES);

  return (
    <View className="justify-center items-center pb-5">
      <View className="w-[90%] bg-paleGreen p-5 shadow-2xl rounded-lg">
        <Text className="text-2xl font-bold text-white mb-2">Edit Profile</Text>
        <View className="mb-2">
          <Text className="text-white text-base mb-1 font-pRegular">
            Last Name
          </Text>
          <TextInput
            onChangeText={(text) => {
              setEditUser({ ...editedUser, lastname: text });
            }}
            value={editedUser.lastname}
            style={formStyles.textInput}
          />
        </View>
        <View className="mb-2">
          <Text className="text-white text-base mb-1 font-pRegular">
            First Name
          </Text>
          <TextInput
            onChangeText={(text) => {
              setEditUser({ ...editedUser, firstname: text });
            }}
            value={editedUser.firstname}
            style={formStyles.textInput}
          />
        </View>
        <View className="mb-2">
          <Text className="text-white text-base mb-1 font-pRegular">
            Middle Name
          </Text>
          <TextInput
            onChangeText={(text) => {
              setEditUser({ ...editedUser, middlename: text });
            }}
            value={editedUser.middlename}
            style={formStyles.textInput}
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
                  value={`BLK ${editedUser.resident.house.block} LOT ${editedUser.resident.house.lot} PAMAHAY VILLAGE SAN JOSE RODRIGUEZ, RIZAL`}
                  style={formStyles.textInput}
                  editable={false}
                  multiline={true}
                />
              </View>
            </View>
            <View
              className="mb-2"
              style={{ flexDirection: "row", justifyContent: "space-between" }}
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
                  value={moment(editedUser.resident.birthdate).format("LL")}
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
                  value={formatName(editedUser.resident.sex)}
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
                onChangeText={(text) => {
                  setEditUser({
                    ...editedUser,
                    resident: { ...editedUser.resident, fb_name: text },
                  });
                }}
                value={editedUser.resident.fb_name}
                style={formStyles.textInput}
                editable={true}
              />
            </View>
            <View
              className="mb-2"
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  width: "45%",
                }}
              >
                <Text className="text-white text-base mb-1 font-pRegular">
                  Civil Status
                </Text>
                <DropDownPicker
                  open={openCivil}
                  value={selectedCivlStatus}
                  items={civilStatuses}
                  setOpen={setOpenCivil}
                  setValue={setSelectedCivilStatus}
                  setItems={setCivilStatuses}
                  listMode="SCROLLVIEW"
                  theme="DARK"
                  style={{ backgroundColor: colors.primary }}
                />
              </View>
              <View
                style={{
                  width: "45%",
                }}
              >
                <Text className="text-white text-base mb-1 font-pRegular">
                  Occupation
                </Text>
                <DropDownPicker
                  open={openOccupation}
                  value={selectedOccupation}
                  items={occupations}
                  setOpen={setOpenOccupation}
                  setValue={setSelectedOccupation}
                  setItems={setOccupations}
                  listMode="SCROLLVIEW"
                  theme="DARK"
                  style={{ backgroundColor: colors.primary }}
                />
              </View>
            </View>
          </View>
        )}
      </View>

      <View style={styles.fixToText}>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={() => {
            let toSaveUser = null;
            if (user.role_type === "guest") {
              toSaveUser = editedUser;
            } else {
              toSaveUser = {
                ...editedUser,
                resident: {
                  ...editedUser.resident,
                  civil_status: selectedCivlStatus,
                  occupation_status: selectedOccupation,
                },
              };
            }

            onSave(toSaveUser);
          }}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.closeButton]}
          onPress={onClose}
        >
          <Text className="text-black">Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "80%",
  },
  button: {
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    width: "40%",
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  closeButton: {
    backgroundColor: colors.greyGreen,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
});

export default EditProfile;
