import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {default as Menu} from "../../components/common/Footer";
import { getAllPosts } from "../../utils/firebaseUtils";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import Searchcomponent from "../../components/search/Searchcomponent";


const Search = () => {
  const { data, isLoading, error, refetch } = getAllPosts(); 
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter();

  const getKey = (item) => {
    return Object.keys(item)[0];
  };

  const getDateFormatted = (date) => {
    const userDate = new Date(date);
    var formattedDate = format(userDate, "dd/MM");
    return formattedDate;
  };


  return (
    <View style={styles.container}>
      <Searchcomponent 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleClick = {() => {}}
      />
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => {
            const key = getKey(item);
            const data = item[key];
            return (
              <TouchableOpacity style={styles.card} onPress={() => {router.push({ pathname: `/ViewPost/${getKey(item)}` });}}>
                <View style={styles.item}>
                  <Image
                    style={styles.itemImage}
                    source={{
                      uri: "https://scontent.ftsr1-2.fna.fbcdn.net/v/t1.6435-9/212345919_4107898495955116_8238256389218474921_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=WXna0Hs24UAAX_xlnty&_nc_ht=scontent.ftsr1-2.fna&oh=00_AfCJqnXxAbUK6AH65_NYdLGhmWzOMQAc7VO2V8hC91i2kw&oe=6443C6F7",
                    }}
                  />
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
              </TouchableOpacity>
            );
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
    backgroundColor: "#FFFFFF"
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
