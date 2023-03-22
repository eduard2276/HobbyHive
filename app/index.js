import 'react-native-gesture-handler';
import { Stack, useRouter } from "expo-router";
import React from 'react'
import Background from "./components/auth/Background";
import Logo from './components/auth/Logo'
import Header from './components/auth/Header'
import Button from './components/auth/Button'
import Paragraph from './components/auth/Paragraph'

export default function StartScreen() {
    const router = useRouter();
  return (
    <Background>
      <Logo />
      <Header>Login Template</Header>
      <Paragraph>
        The easiest way to start with your amazing application.
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
        Sign Up
      </Button>
    </Background>
  )
}