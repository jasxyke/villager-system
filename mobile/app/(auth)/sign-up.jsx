import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import FormScreen from "../../components/forms/FormScreen";
import { formStyles } from "../../styles/formStyles";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  return (
    <FormScreen headerText={"Let's get started!"}>
      <TextInput
        className="mb-2"
        style={formStyles.textInput}
        placeholder="Last name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        className="mb-2"
        style={formStyles.textInput}
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        inputMode="email"
      />
    </FormScreen>
  );
};

export default SignUp;
