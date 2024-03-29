import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import Background from "../../components/auth/Background";
import Logo from "../../components/auth/Logo";
import Header from "../../components/auth/Header";
import Button from "../../components/auth/Button";
import TextInput from "../../components/auth/TextInput";
import { theme } from "../../constants/theme";
import { emailValidator } from "../../utils/emailValidator";
import { passwordValidator } from "../../utils/passwordValidator";
import { createUserAccount } from "../../utils/firebaseUtils";
import { auth } from "../../hook/firebase";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const router = useRouter();

  const onSignUpPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    auth
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((userCredentials) => {
      createUserAccount(email.value);
      router.push("/EditProfile");
    })
    .catch((error) => {
      alert(error.message)
    });
  };

  return (
    <Background>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: theme.colors.background },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTitle: "Sign Up",
        }}
      />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        selectionColor="white"
        outlineColor="white"
        activeOutlineColor="yellow"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        selectionColor="white"
        outlineColor="white"
        activeOutlineColor="yellow"
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/Login")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.secondary,
  },
});
