import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal
} from "react-native";
import {default as Menu} from "../../components/common/Footer";
import { getAllPosts } from "../../utils/firebaseUtils";
import { format } from "date-fns";
import { useRouter, Stack } from "expo-router";
import Searchcomponent from "../../components/search/Searchcomponent";
import { auth } from "../../hook/firebase";
import { theme } from "../../constants/theme";

const Search = () => {
  const { data, isLoading, error, refetch } = getAllPosts();
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({})
  const router = useRouter();

  const getKey = (item) => {
    return Object.keys(item)[0];
  };

  const getDateFormatted = (date) => {
    const userDate = new Date(date);
    var formattedDate = format(userDate, "dd/MM");
    return formattedDate;
  };

  const getAvailableSpots = (data) => {
    if (data?.appliedUsers)
    {
      console.log(data.appliedUsers.length);
      return parseInt(data?.numOfPeople) - data.appliedUsers.length;
    }
    return data?.numOfPeople
  }

  const showPost = (data) => {
    if (data?.uid == auth.currentUser?.uid)
    {
      return false
    }
    if (getAvailableSpots(data) === 0)
    {
      return false
    }
    console.log(filters.numOfPeople)
    console.log("----------")
    console.log(data)
    // if (filters.numOfPeople != "Any" && parseInt(data.numOfPeople) != parseInt(filters.numOfPeople))
    // {
    //   console.log("Aci")
    //   return false
    // }
    // if (filters.otherUsersLevel != "" && filters.otherUsersLevel != data.otherUsersLevel)
    // {
    //   //return false
    // }

    return true
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: theme.colors.background },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTitle: "Search",
        }}
      />
      <Searchcomponent
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleClick = {() => {}}
        setFilters={setFilters}
      />
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => {
            const key = getKey(item);
            const data = item[key];
            if (showPost(data))
            {
              return (
                <TouchableOpacity style={styles.card} onPress={() => {router.push({ pathname: `/ViewPost/${getKey(item)}\\${data.uid}` });}}>
                  <View style={styles.item}>
                    <Image
                      style={styles.itemImage}
                      source={{
                        uri: item.url,
                      }}
                    />
                    <View style={styles.itemContent}>
                      <Text style={styles.itemName}>
                        {data.sport} - {data.numOfPeople} people needed
                      </Text>
                      <Text style={styles.spotsLeft}>
                        {getAvailableSpots(data)} spots available
                      </Text>
                      <Text style={styles.itemPrice}>
                        Time: {getDateFormatted(data.date)}, {data.startTime} -{" "}
                        {data.endTime}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }
          }}
          keyExtractor={(item) => getKey(item)}
        />
      )}
      <Menu />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
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
    backgroundColor: theme.colors.primary,
    borderRadius: 15,
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
  spotsLeft: {
    paddingTop: 5,
    fontSize: 16,
    color: "#ff0000",
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
