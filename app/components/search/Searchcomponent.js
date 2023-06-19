import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { theme } from "../../constants/theme";
import { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { sports } from "../../constants";
import Selector from "../publish/Selector";
import DatePicker from "../publish/DatePicker";
import TimePicker from "../publish/TimePicker";
import Button from "../auth/Button";

const numOfPleopleSelection = [
  "Any",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
];
const userLevelSelection = ["Any", "Begginer", "Itermediate", "Experienced"];
const otherUsersLevelSelection = [
  "Any",
  "Begginer",
  "Itermediate",
  "Experienced",
];

const FilterScreen = ({ visible, onClose, setFilters }) => {
  const [selected, setSelected] = useState("");
  const [numOfPeople, setNumOfPeople] = useState(numOfPleopleSelection[0]);
  const [userLevel, setUserLevel] = useState(userLevelSelection[0]);
  const [otherUsersLevel, setOtherUserLevel] = useState(
    otherUsersLevelSelection[0]
  );
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date(NaN));
  const [endTime, setEndTime] = useState(new Date(NaN));
  const [formattedDate, setFormattedDate] = useState("");

  const handleClearTime = (time) => {
    if (time === "date") {
      setStartDate(new Date(NaN));
    } else if (time === "startTime") {
      setStartTime(new Date(NaN));
    } else if (time === "endTime") {
      setEndTime(new Date(NaN));
    }
  };
  const handleSaveChanges = () => {
    setFilters({
      sport: selected,
      numOfPeople: numOfPeople,
      userLevel: userLevel,
      otherUsersLevel: otherUsersLevel,
      date: startDate.getTime(),
      startTime: `${startTime.getHours()}:${startTime.getMinutes()}`,
      endTime: `${endTime.getHours()}:${endTime.getMinutes()}`
    })
    console.log("HEY")
    onClose()
  }
  return (
    <SafeAreaView>
      <Modal visible={visible} animationType="slide">
        <TouchableOpacity
          onPress={onClose}
          style={{ backgroundColor: theme.colors.background }}
        >
          <Icon name="left" size={40} color={"black"} />
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.modalContainer}>
            <View style={styles.selectSport}>
              <Text style={styles.sportTitle}>Select sport</Text>
              <SelectList
                placeholder="eg. Football"
                setSelected={(val) => setSelected(val)}
                data={sports}
                save="value"
                maxHeight={100}
                arrowicon={<Icon name="down" size={20} color={"black"} />}
                searchicon={<Icon name="filter" size={20} color={"black"} />}
                boxStyles={{ borderRadius: 20 }}
                inputStyles={{ fontSize: 16, color: theme.colors.text }}
                dropdownTextStyles={{ color: theme.colors.text }}
              />
            </View>
            <Selector
              text={"How many people needed?"}
              tabs={numOfPleopleSelection}
              activeTab={numOfPeople}
              setActiveTab={setNumOfPeople}
            />
            <Selector
              text={"What level are you looking for"}
              tabs={userLevelSelection}
              activeTab={userLevel}
              setActiveTab={setUserLevel}
            />
            <Selector
              text={"What experience are you looking for?"}
              tabs={otherUsersLevelSelection}
              activeTab={otherUsersLevel}
              setActiveTab={setOtherUserLevel}
            />
            <View style={styles.categoryContainer}>
              <Text style={styles.titleLabel}>When do you want to go?</Text>
              <DatePicker
                text="Pick date"
                setDate={setStartDate}
                settedDate={startDate}
                setFormatedDate={setFormattedDate}
              />
              <View style={{ flexDirection: "row" }}>
                <Text style={{ width: "50%" }}>
                  Date Picked: {formattedDate}
                </Text>
                <TouchableOpacity
                  onPress={() => handleClearTime("date")}
                  style={{ width: "50%", alignItems: "center" }}
                >
                  <Text style={{ color: theme.colors.primary }}>Clear</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.categoryContainer}>
              <Text style={styles.titleLabel}>
                In what timeframe do you want to go?
              </Text>
              <View style={styles.timerContainer}>
                <View style={styles.timerButton}>
                  <TimePicker text="Pick start time" setHour={setStartTime} />
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: theme.colors.text, width: "50%" }}>
                      Time Picked:{" "}
                      {`${startTime.getHours()}:${startTime.getMinutes()}`}
                    </Text>
                    <TouchableOpacity
                      onPress={()=>{}}
                      style={{ width: "50%", alignItems: "center" }}
                    >
                      <Text style={{ color: theme.colors.primary }}>Clear</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.timerButton}>
                  <TimePicker text="Pick end time" setHour={setEndTime} />
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: theme.colors.text, width: "50%" }}>
                      Time Picked:{" "}
                      {`${endTime.getHours()}:${endTime.getMinutes()}`}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleClearTime("endTime")}
                      style={{ width: "50%", alignItems: "center" }}
                    >
                      <Text style={{ color: theme.colors.primary }}>Clear</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            {/* Add your filter options components here */}
            <View
              style={{
                alignSelf: "center",
                width: "60%",
                backgroundColor: theme.colors.background,
              }}
            >
              <Button
                mode="contained"
                style={{ marginTop: 24 }}
                onPress={handleSaveChanges}
              >
                Save
              </Button>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
};

const Searchcomponent = ({ searchTerm, setSearchTerm, handleClick, setFilters}) => {
  const [filterVisible, setFilterVisible] = useState(false);

  const handleFilterPress = () => {
    setFilterVisible(true);
  };

  const handleFilterClose = () => {
    setFilterVisible(false);
  };
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
        <View style={{ paddingRight: 10 }}>
          <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
            <Icon
              name="search1"
              size={25}
              color={"white"}
              style={styles.searchBtnImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleFilterPress}>
          <Icon
            name="filter"
            size={25}
            color={"white"}
            style={styles.searchBtnImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <FilterScreen visible={filterVisible} onClose={handleFilterClose} setFilters={setFilters}/>
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
    paddingBottom: 20,
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
    backgroundColor: theme.colors.secondary,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    //tintColor: "#F3F4F8",
  },
  modalContainer: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  selectSport: {
    height: 160,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
  },
  sportTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  categoryContainer: {
    paddingTop: 20,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
  },
  titleLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
