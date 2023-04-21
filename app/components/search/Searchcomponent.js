import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const Searchcomponent = ({ searchTerm, setSearchTerm, handleClick }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => {
              setSearchTerm(text);
            }}
            placeholder="What are you looking for?"
          />
        </View>
        <View style={{paddingRight:10}}>
            <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
            <Icon
                name="search1"
                size={25}
                color={"black"}
                style={styles.searchBtnImage}
                resizeMode="contain"
            />
            </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Icon
            name="filter"
            size={25}
            color={"black"}
            style={styles.searchBtnImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Searchcomponent;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: "#F3F4F8",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    height: "100%",
  },
  searchInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: "#FF7754",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    //tintColor: "#F3F4F8",
  },
});
