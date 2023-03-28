import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from "react-native";
import { default as Menu } from "../../components/common/Footer";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { auth } from "../../hook/firebase";

const Search = () => {
  const router = useRouter();
  return (
    <>
      <Text>{auth.currentUser?.email}</Text>
      <Menu />
    </>
  );
};

export default Search;
