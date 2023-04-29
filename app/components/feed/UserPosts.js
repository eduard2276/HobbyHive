import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { default as Tabs }  from "../profile/ProfileTabs";
import { getUserPosts, deleteUserPost } from "../../utils/firebaseUtils";
import { format } from "date-fns";
import { useRouter } from "expo-router";

const UserPosts = () => {
  const { data, isLoading, error, refetch } = getUserPosts();

  const router = useRouter();

  const getKey = (item) => {
    return Object.keys(item)[0];
  };

  const getDateFormatted = (date) => {
    const userDate = new Date(date);
    var formattedDate = format(userDate, "dd/MM");
    return formattedDate;
  };

  const handleDelete = (key) => {
    console.log("Hello ", key);
    deleteUserPost(key).then(() => {
      refetch();
    });
  };

  const handleUpdate = (key, data) => {
    console.log(data);
    router.push({ pathname: `/EditPost/${key}` });
  };

  const handleViewMembers = (key) => {

  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => {
            const key = getKey(item);
            const data = item[key];
            return (
              <View style={styles.card}>
                <View style={styles.item}>
                  <Image style={styles.itemImage} />
                  <View style={styles.itemContent}>
                    <Text style={styles.itemName}>
                      {data.sport} - {data.numOfPeople} people needed
                    </Text>
                    <Text style={styles.itemPrice}>
                      Time: {getDateFormatted(data.date)}, {data.startTime} -{" "}
                      {data.endTime}
                    </Text>
                  </View>
                </View>
                <View style={styles.buttons}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleUpdate(key, data)}
                  >
                    <Text style={styles.buttonText}>Edit post</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleDelete(key)}
                  >
                    <Text style={styles.buttonText}>Delete post</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleViewMembers(key)}
                  >
                    <Text style={styles.buttonText}>Members ({data.appliedUsers? data.appliedUsers.length : 0})</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => getKey(item)}
        />
      )}
    </View>
  );
};

export default UserPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
    color: "#fff",
    marginHorizontal: 20,
  },
  card: {
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    paddingTop: 5,
    fontSize: 16,
    color: "#999",
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#FFC107",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
