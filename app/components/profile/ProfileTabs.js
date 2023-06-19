import React, { useState } from "react";
import {
  TouchableOpacity,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { theme } from "../../constants/theme";

function TabButton({ name, activeTab, onHandleSearchType }) {
  return (
    <TouchableOpacity
      style={styles.btn(name, activeTab)}
      onPress={onHandleSearchType}
    >
      <Text style={styles.btnText(name, activeTab)}>{name}</Text>
    </TouchableOpacity>
  );
}

const ProfileTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item)}
          />
        )}
        contentContainerStyle={{ columnGap: 6 }}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default ProfileTabs;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 12 / 2,
    backgroundColor: theme.colors.background
  },
  btn: (name, activeTab) => ({
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: name === activeTab ? theme.colors.primary : theme.colors.menuColor,
    borderRadius: 16,
    marginLeft: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
    shadowColor: "#F3F4F8",
  }),
  btnText: (name, activeTab) => ({
    fontSize: 12,
    fontWeight:'bold',
    color: name === activeTab ? theme.colors.background : "#AAA9B8",
  }),
});
