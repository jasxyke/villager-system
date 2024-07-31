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
import { Link, router } from "expo-router";
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
    <FormScreen>
      <Text className="ml-2 text-white text-base">Email</Text>
      <TextInput
        className="mb-2"
        style={formStyles.textInput}
        value={email}
        onChangeText={setEmail}
        inputMode="email"
      />
      <Text className="ml-2 text-white text-base">Password</Text>
      <PasswordInput password={password} onChangePass={setPassword} />

      <TouchableHighlight
        onPress={signIn}
        className="rounded-full m-auto px-5 py-3 mt-5"
        style={styles.signInButton}
        activeOpacity={0.6}
        underlayColor={colors.greyGreen}
      >
        <Text className="text-white">Sign in</Text>
      </TouchableHighlight>
      <View
        className="text-center justify-center 
      items-center mt-5"
      >
        <Text className=" text-white">Don't have an account yet?</Text>
        <Link href={"sign-up"} className="text-white underline">
          Register
        </Link>
      </View>
    </FormScreen>
  );
};

const styles = StyleSheet.create({
  signInButton: {
    width: "75%",
    backgroundColor: colors.greyGreen,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default SignIn;
