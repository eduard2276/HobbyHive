import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, StyleSheet, View, ScrollView } from "react-native";
import { sports } from "../../../constants";
import { SelectList } from "react-native-dropdown-select-list";
import Icon from "react-native-vector-icons/EvilIcons";
import Selector from "../../../components/publish/Selector";
import DatePicker from "../../../components/publish/DatePicker";
import TimePicker from "../../../components/publish/TimePicker";
import Button from "../../../components/auth/Button";
import TextInput from "../../../components/auth/TextInput";
import { updatePost, getUserPost } from "../../../utils/firebaseUtils";
import { useRouter, useSearchParams } from "expo-router";

const numOfPleopleSelection = [
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
const userLevelSelection = ["Begginer", "Itermediate", "Experienced"];
const otherUsersLevelSelection = [
  "Any",
  "Begginer",
  "Itermediate",
  "Experienced",
];


//TO DO: MAKE user view post

const Search = () => {
  const params = useSearchParams();

  const { data, isLoading, error, refetch } = getUserPost(params.id);
  const [selected, setSelected] = useState("");
  const [numOfPeople, setNumOfPeople] = useState(numOfPleopleSelection[0]);
  const [userLevel, setUserLevel] = useState(userLevelSelection[0]);
  const [otherUsersLevel, setOtherUserLevel] = useState(
    otherUsersLevelSelection[0]
  );
  const [location, setLocation] = useState("")
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [additionalInfo, setAdditionalInfo] = useState("");

  const [formattedDate, setFormattedDate] = useState("");
  const router = useRouter();

  const convertStringtoTime = (time) => {
    if (time) {
      const date = new Date();
      const timesplit = time.split(":");
      date.setHours(parseInt(timesplit[0]), parseInt(timesplit[1]));
      return date;
    }
    return "";
  };

  useEffect(() => {
    if (data.sport) {
      setSelected(1);
      setNumOfPeople(data.numOfPeople);
      setUserLevel(data.userLevel);
      setOtherUserLevel(data.otherUsersLevel);
      setStartDate(new Date(data.date));
      setLocation(data.location)
      setStartTime(convertStringtoTime(data.startTime));
      setEndTime(convertStringtoTime(data.endTime));
      setAdditionalInfo(data.additionalInfo);
    }
  }, [data]);

  const handlePost = () => {
    updatePost(params.id, {
      sport: selected,
      numOfPeople: numOfPeople,
      userLevel: userLevel,
      otherUsersLevel: otherUsersLevel,
      location: location,
      date: startDate.getTime(),
      startTime: `${startTime.getHours()}:${startTime.getMinutes()}`,
      endTime: `${endTime.getHours()}:${endTime.getMinutes()}`,
      additionalInfo: additionalInfo,
    });
    router.replace("/MyPublishes");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.selectSport}>
          <Text style={styles.sportTitle}>Select sport</Text>
          <SelectList
            placeholder="eg. Football"
            setSelected={(val) => setSelected(val)}
            data={sports}
            save="value"
            maxHeight={100}
            arrowicon={<Icon name="chevron-down" size={20} color={"black"} />}
            searchicon={<Icon name="search" size={20} color={"black"} />}
            boxStyles={{ borderRadius: 20 }}
            inputStyles={{ fontSize: 16 }}
          />
        </View>
        <Selector
          text={"How many people do you need?"}
          tabs={numOfPleopleSelection}
          activeTab={numOfPeople}
          setActiveTab={setNumOfPeople}
        />
        <Selector
          text={"What is your level at this sport?"}
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
          <Text style={styles.titleLabel}>Specify location</Text>
          <TextInput
            label=""
            returnKeyType="next"
            value={location}
            onChangeText={(text) => setLocation(text)}
            style={{ marginTop: 10 }}
          />
        </View>
        <View style={styles.categoryContainer}>
          <Text style={styles.titleLabel}>When do you want to go?</Text>
          <DatePicker
            text="Pick date"
            setDate={setStartDate}
            settedDate={startDate}
            setFormatedDate={setFormattedDate}
          />
          <Text style={styles.datePicked}>Date Picked: {formattedDate}</Text>
        </View>

        <View style={styles.categoryContainer}>
          <Text style={styles.titleLabel}>
            In what timeframe do you want to go?
          </Text>
          <View style={styles.timerContainer}>
            <View style={styles.timerButton}>
              <TimePicker text="Pick start time" setHour={setStartTime} />
              <Text>
                Time Picked:{" "}
                {`${startTime.getHours()}:${startTime.getMinutes()}`}
              </Text>
            </View>
            <View style={styles.timerButton}>
              <TimePicker text="Pick end time" setHour={setEndTime} />
              <Text>
                Time Picked: {`${endTime.getHours()}:${endTime.getMinutes()}`}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.categoryContainer}>
          <Text style={styles.titleLabel}>
            Is there anything else you want to add?
          </Text>
          <TextInput
            label=""
            returnKeyType="next"
            value={additionalInfo}
            onChangeText={(text) => setAdditionalInfo(text)}
            numberOfLines={4}
            multiline
            style={{ marginTop: 10 }}
          />
        </View>
        <View style={{ alignSelf: "center", width: "60%" }}>
          <Button
            mode="contained"
            style={{ marginTop: 24 }}
            onPress={handlePost}
          >
            Save
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  sportTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  selectSport: {
    height: 160,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
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
  },
  timerContainer: {
    flexDirection: "row",
    paddingTop: 20,
  },
  timerButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
  },
  datePicked: {
    paddingTop: 5,
    fontSize: 16,
  },
});
