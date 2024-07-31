import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import FormScreen from "../../components/forms/FormScreen";
import { formStyles } from "../../styles/formStyles";
import { colors } from "../../styles/colors";
import { Link } from "expo-router";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");

  const signUpUser = () => {};
  return (
    <FormScreen headerText={"Let's get started!"}>
      <Text className="ml-2 text-white text-base">Last name</Text>
      <TextInput
        className="mb-2"
        style={formStyles.textInput}
        value={lastName}
        onChangeText={setLastName}
      />
      <Text className="ml-2 text-white text-base">Email</Text>
      <TextInput
        className="mb-2"
        style={formStyles.textInput}
        value={email}
        onChangeText={setEmail}
        inputMode="email"
      />
      <TouchableHighlight
        onPress={signUpUser}
        className="rounded-full m-auto px-5 py-3 mt-5"
        style={styles.signInButton}
        activeOpacity={0.6}
        underlayColor={colors.greyGreen}
      >
        <Text className="text-white text-base">Sign up</Text>
      </TouchableHighlight>
      <Link href={"sign-in"} className="text-white underline text-center mt-3">
        Have an account? Login
      </Link>
    </FormScreen>
  );
};

const styles = StyleSheet.create({
  signInButton: {
    width: "65%",
    backgroundColor: colors.greyGreen,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
export default SignUp;
