import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../styles/colors";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import FormScreen from "../../components/forms/FormScreen";
import PasswordInput from "../../components/forms/PasswordInput";
import { formStyles } from "../../styles/formStyles";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const signIn = () => {
    //NOTE: Kapag ready na yung mga login shit and authentication,
    //      uncomment mo tong mga to and then remove na yung router.navigate
    // router.dismissAll();
    // router.replace("../home")
    router.navigate("../home");
  };
  return (
    <FormScreen headerText={"Welcome back!"}>
      <TextInput
        className="mb-2"
        style={formStyles.textInput}
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        inputMode="email"
      />
      <PasswordInput password={password} onChangePass={setPassword} />

      <TouchableHighlight
        onPress={signIn}
        className="rounded-lg m-auto px-5 py-3 mt-5"
        style={styles.signInButton}
        activeOpacity={0.6}
        underlayColor={colors.greyGreen}
      >
        <Text className="text-white">Sign in</Text>
      </TouchableHighlight>
    </FormScreen>
  );
};

const styles = StyleSheet.create({
  signInButton: {
    width: "75%",
    backgroundColor: colors.paleGreen,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default SignIn;
