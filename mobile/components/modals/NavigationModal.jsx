import React, { useState } from "react";
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
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { useAuthContext } from "../../context/AuthContext";
import { LOGOUT } from "../../constants/icons";
import About from "./About"; // Import the About modal
import Contacts from "./Contacts"; // Import the Contacts modal

const NavigationModal = ({ visible, onClose }) => {
  const { logout } = useAuthContext();
  const [aboutVisible, setAboutVisible] = useState(false);
  const [contactsVisible, setContactsVisible] = useState(false);

  const handleSuccess = (msg) => {
    router.replace("../sign-in");
    onClose();
  };

  const handleError = (msg) => {
    Alert.alert("Error logging out!", msg);
  };

  const logoutUser = () => {
    logout(handleSuccess, handleError);
  };

  const openAbout = () => {
    setAboutVisible(true); // Show the About modal
  };

  const closeAbout = () => {
    setAboutVisible(false); // Hide the About modal
  };

  const openContacts = () => {
    setContactsVisible(true); // Show the Contacts modal
  };

  const closeContacts = () => {
    setContactsVisible(false); // Hide the Contacts modal
  };

  return (
    <>
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

              {/* Logout Button */}
              <TouchableOpacity
                onPress={logoutUser}
                className="rounded-xl p-1 h-auto bg-paleGreen mb-3"
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

              {/* Contacts Button */}
              <TouchableOpacity
                onPress={openContacts}
                className="rounded-xl p-1 h-auto bg-paleGreen mb-3"
              >
                <View className="flex-row items-center p-1 gap-x-1">
                  <AntDesign name="phone" size={24} color="white" />
                  <Text className="font-pRegular text-white">Contacts</Text>
                </View>
              </TouchableOpacity>

              {/* About Us Button */}
              <TouchableOpacity
                onPress={openAbout}
                className="rounded-xl p-1 h-auto bg-paleGreen"
              >
                <View className="flex-row items-center p-1 gap-x-1">
                  <AntDesign name="infocirlceo" size={24} color="white" />
                  <Text className="font-pRegular text-white">About Us</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Contacts Modal */}
      {contactsVisible && (
        <Contacts visible={contactsVisible} onClose={closeContacts} />
      )}

      {/* About Modal */}
      {aboutVisible && (
        <About visible={aboutVisible} onClose={closeAbout} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  logout: {
    width: 30,
    height: 30,
  },
});

export default NavigationModal;
