import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Image,
  ActivityIndicator
} from "react-native";
import ProfileHeader from "../../../components/profile/ProfileHeader";
import PostDetails from "../../../components/profile/viewPost/PostDetails";
import { applyUser, getUserPostAndDetails } from "../../../utils/firebaseUtils";
import { useRouter, useSearchParams } from "expo-router";
import Button from "../../../components/auth/Button";

const ScrollViewComp = ({ postDetails }) => {
  console.log('\n')
  console.log(postDetails)
  return (
    <ScrollView>
      <ProfileHeader data={postDetails["userDetails"]} />
      <PostDetails data={postDetails.postDetails} />
    </ScrollView>
  );
};


const Search = () => {
  const params = useSearchParams();
  const { data, isLoading, error, refetch } = getUserPostAndDetails(params.id);
  const router = useRouter();

  const onApplyPressed = () => {
    console.log("Apply pressed");
    applyUser(data, params.id.split('\\')[0])

  }

  const onMessagePressed = () => {
    console.log("MEssage pressed");
    router.push({ pathname: `/Message/${data.postDetails.uid}` });
  }

  return (

    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
      <ScrollViewComp postDetails={data}/>
      )}
      <View style={{ flexDirection: "row" }}>
        <Button onPress={onMessagePressed} mode="contained" style={{ width: "50%" }}>
          Message
        </Button>
        <Button onPress={onApplyPressed} mode="contained" style={{ width: "50%" }}>
          Apply
        </Button>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    backgroundColor: "#FFFFFF",
    height: 150,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  userInfoSection: {
    paddingHorizontal: 0,
    marginBottom: 25,
  },
  informationContainer: {
    width: 150,
    height: 120,
    marginLeft: 20,
    marginTop: 20,
  },
  basicInfo: {
    flexDirection: "row",
    marginBottom: 0,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
  },
});
