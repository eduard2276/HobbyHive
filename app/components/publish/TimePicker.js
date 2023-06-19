import React, {useState} from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { View, StyleSheet, Text} from "react-native";
import Button from '../auth/Button';
import { theme } from '../../constants/theme';

const TimePicker = ({text, setHour}) => {
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);


    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirm = (time) => {
        console.log("A time has been picked: ", time);
        hideTimePicker();
        setHour(time)
    };
    return (
        <View>
            <Button style={styles.button} onPress={showTimePicker} mode="contained">
                <Text style={styles.text}>{text}</Text>
            </Button>
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

const styles = StyleSheet.create({
    button: {
      backgroundColor: theme.colors.secondary,
      borderRadius: 50,
    },
    text: {
        fontSize: 12
    }

  });
