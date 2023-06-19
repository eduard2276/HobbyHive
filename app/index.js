import 'react-native-gesture-handler';
import { Stack, useRouter } from "expo-router";
import React from 'react'
import Background from "./components/auth/Background";
import Logo from './components/auth/Logo'
import Header from './components/auth/Header'
import Button from './components/auth/Button'
import Paragraph from './components/auth/Paragraph'
import { theme } from './constants/theme';
import { Text } from "react-native";

export default function StartScreen() {
    const router = useRouter();
  return (
    <Background>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: theme.colors.background },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: "",
        }}
      />
      <Logo />

      <Paragraph>
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => router.push("/Login")}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => router.push("/SignUp")}
      >
        <Text style={{color: theme.colors.outlineButtonColor}}>Sign Up</Text>
      </Button>
    </Background>
  )
}