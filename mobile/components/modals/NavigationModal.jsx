import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  StatusBar,
  Image,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../styles/colors";
import { router } from "expo-router";
import { useAuthContext } from "../../context/AuthContext";
import { LOGOUT } from "../../constants/icons";

const NavigationModal = ({ visible, onClose }) => {
  const { logout } = useAuthContext();

  const handleSuccess = (msg) => {
    //delete login credenials ewan sa local device
    //navigate back to starting page
    router.replace("../sign-in");
    onClose();
  };

  const handleError = (msg) => {
    Alert.alert("Error logging out!", msg);
  };

  const logoutUser = () => {
    logout(handleSuccess, handleError);
  };

  return (
    <Modal animationType="fade" visible={visible} transparent={true}>
      <StatusBar backgroundColor={"rgba(0,0,0,0.3)"} translucent={true} />

      <TouchableWithoutFeedback onPress={onClose}>
        <View
          className="flex-1 h-full justify-center items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        >
          <View className="rounded-lg p-5 h-auto w-[70%] bg-green shadow-lg">
            <View className="flex-row justify-between">
              <Text className="text-white font-pRegular text-lg">
                Other options
              </Text>
              <TouchableOpacity onPress={onClose} className="ml-auto mb-3">
                <AntDesign name="close" color="white" size={26} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={logoutUser}
              className="rounded-xl p-1 h-auto bg-paleGreen"
            >
              <View className="flex-row items-center p-1 gap-x-1">
                <Image
                  tintColor={"white"}
                  source={LOGOUT}
                  style={styles.logout}
                />
                <Text className="font-pRegular text-white">Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  navigationButton: {},
  logout: {
    width: 30,
    height: 30,
  },
});
export default NavigationModal;
