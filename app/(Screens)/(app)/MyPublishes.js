import {useState} from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { default as Tabs } from "../../components/profile/ProfileTabs";
import { default as Menu } from "../../components/common/Footer";
import UserPosts from "../../components/feed/UserPosts";
import AppliedPosts from "../../components/feed/AppliedPosts";
import { theme } from "../../constants/theme";
import { Stack } from "expo-router";

const tabs = ["My Posts", "Applied Posts"];
const MyPublishes = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const displayTabContent = () => {
    switch (activeTab) {
      case "My Posts":
        return <UserPosts/>;
      case "Applied Posts":
        return <AppliedPosts/>;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: theme.colors.background },
          headerShadowVisible: true,
          headerBackVisible: true,
          headerTitle: "My posts",

        }}
      />
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {displayTabContent()}

      <Menu />
    </View>
  );
};

export default MyPublishes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
});
