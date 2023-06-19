import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter, useSearchParams } from "expo-router";
import { getListOfMembersFromPostId, cancelPost } from "../../../utils/firebaseUtils";
import { default as Menu } from "../../../components/common/Footer";
import { Stack } from "expo-router";
import { theme } from "../../../constants/theme";

const Messages = () => {
  const params = useSearchParams();
  const { data, isLoading } = getListOfMembersFromPostId(params.id);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: theme.colors.background },
          headerShadowVisible: true,
          headerBackVisible: true,
          headerTitle: "",
        }}
      />
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.itemContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: item.imageUrl,
                }}
              />
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{item?.fullName}</Text>
                <Text style={styles.phoneText}>Hello</Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  router.push({ pathname: `/Message/${item.userId}` })
                }
              >
                <Text style={styles.buttonText}>Message</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress = { () => cancelPost(params.id, item.userId)}>
                <Text style={styles.buttonText}>Kick</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item?.userId}
        />
      )}
      <Menu />
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchContainer: {
    backgroundColor: "#eee",
    padding: 8,
    marginTop: 0,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondary,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  textContainer: {
    marginLeft: 16,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.primary
  },
  phoneText: {
    fontSize: 16,
    color: "#999",
  },
  button: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 5,
    padding: 10,
    marginRight: 0,
    marginLeft: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
