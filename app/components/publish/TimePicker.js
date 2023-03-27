import React, {useState} from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import {Button, View} from "react-native";

const TimePicker = ({text, setHour}) => {
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);


    const showTimePicker = () => {
        console.log(isTimePickerVisible)
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirm = (time) => {
        console.warn("A time has been picked: ", time);
        setHour(time)
        hideTimePicker();
    };
    return (
        <View>
            <Button title={text} onPress={showTimePicker} />
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideTimePicker}
            />
        </View>
    )
}

export default TimePicker