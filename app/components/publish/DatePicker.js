import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { View, StyleSheet, Text } from "react-native";
import Button from "../auth/Button";
import { format } from "date-fns";
import { theme } from "../../constants/theme";

const DatePicker = ({ text, setDate, settedDate, setFormatedDate }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    hideDatePicker();
    setDate(date);
    //var date = new Date("2016-01-04 10:34:23");
    var formattedDate = format(date, "dd/MM");
    setFormatedDate(formattedDate);
  };
  return (
    <View style={styles.container}>
      <Button style={styles.button} title={text} onPress={showDatePicker} mode="contained">
        <Text>{text}</Text>
      </Button>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={settedDate}
      />
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  button: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 50,
    // padding: 10,
    // marginRight: 30,
    // flexDirection: "row",
  }

});
