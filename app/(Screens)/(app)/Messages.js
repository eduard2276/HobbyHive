import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { getUserChats } from "../../utils/firebaseUtils";
import { default as Menu } from "../../components/common/Footer";
import { format } from "date-fns";
import { theme } from "../../constants/theme";
import { Stack } from "expo-router";

const Messages = () => {
  const { data, isLoading } = getUserChats();
  const router = useRouter();

  const getLastMessage = (item) => {
    if (item.timestamp) {
      return format(item?.timestamp, "h:mm a");
    } else {
      return "";
    }
  };

  const shortenMessage = (message) => {
    if (message){
    if (message.length <= 20) {
      return message.replace(/\t/g, '').replace(/\n/g, '');
    }
    else {
      return message.replace(/\t/g, '').replace(/\n/g, '').substring(0,20) + '...';
    }
  }
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: theme.colors.background },
          headerShadowVisible: true,
          headerBackVisible: true,
          headerTitle: "Messages",
          headerTitleStyle: { color: theme.colors.primary },
        }}
      />
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() =>
                router.push({ pathname: `/Message/${item.userId}` })
              }
            >
              <Image style={styles.image} source={{ uri: item.imageUrl }} />
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{item?.userName}</Text>
                <Text style={styles.phoneText}>
                  {shortenMessage(item?.lastMessage)} - {getLastMessage(item)}
                </Text>
              </View>
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
    color: theme.colors.primary,
  },
  phoneText: {
    fontSize: 16,
    color: theme.colors.text,
  },
});
