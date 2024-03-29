import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Background from "../../components/auth/Background";
import Logo from "../../components/auth/Logo";
import Header from "../../components/auth/Header";
import Button from "../../components/auth/Button";
import TextInput from "../../components/auth/TextInput";
import { theme } from "../../constants/theme";
import { emailValidator } from "../../utils/emailValidator";
import { passwordValidator } from "../../utils/passwordValidator";
import { auth } from "../../hook/firebase";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const router = useRouter();

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    auth
      .signInWithEmailAndPassword(email.value, password.value)
      .then((userCredentials) => {
        router.push("/Search");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Background>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: theme.colors.background },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTitle: "Login",

        }}
      />
      <Logo />
      <Header>Welcome back.</Header>
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
        outlineColor="white"
        activeOutlineColor="yellow"
        selectionColor="white"
      />
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            router.push("/SignUp");
          }}
        >
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.secondary,
  },
});
