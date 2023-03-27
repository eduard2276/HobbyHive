import React, {useState} from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import {Button, View, StyleSheet} from "react-native";

const DatePicker = ({text, setDate}) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        setDate(date)
        hideDatePicker();
    };
    return (
        <View style={styles.container}>
            <Button title={text} onPress={showDatePicker} />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    )
}

export default DatePicker

const styles = StyleSheet.create({
    container:{
        paddingTop: 20
    }
  });