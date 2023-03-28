import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button, View, StyleSheet } from "react-native";
import { format } from "date-fns";

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
      <Button title={text} onPress={showDatePicker} />
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
});
