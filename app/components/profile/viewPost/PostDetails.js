import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons";
import { dateFormatter } from '../../../utils/dateFormatter';
import { theme } from '../../../constants/theme';

const DetailSection = ({icon, title, content}) => {
    return (
        <View style={styles.postDetailsSection}>
            <View style={styles.postDetailsSectionTitle}>
                <View style={{flexDirection:'row'}}>
                    <Icon name={icon} size={20} color={theme.colors.secondary}/>
                    <Text style={styles.postDetailsLabel}> {title}</Text>
                </View>

            </View>
            <Text style={styles.postDetailsLabel}>{content}</Text>
        </View>
    )
}


const PostDetails = ({data}) => {
  return (
    <View style={styles.container}>
        <View style={styles.detailsWrapper}>
            <Text style={styles.postDetailsTitle}>Post Details</Text>

            <DetailSection icon="sports-baseball" title="Sport" content={data?.sport}/>
            <DetailSection icon="person-add" title="People Needed" content={data?.numOfPeople}/>
            <DetailSection icon="grade" title="User Level" content={data?.userLevel}/>
            <DetailSection icon="emoji-people" title="Looking for" content={data?.otherUsersLevel}/>
            <DetailSection icon="location-on" title="Location" content={data?.location}/>
            <DetailSection icon="calendar-today" title="Date" content={dateFormatter(data?.date)}/>
            <DetailSection icon="watch-later" title="Timeframe" content={`${data?.startTime} - ${data?.endTime}`}/>
            <DetailSection icon="add-box" title="Additional Info" content={data?.additionalInfo}/>


        </View>
    </View>
  )
}

export default PostDetails

const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
      width:"100%",
      alignItems: 'center',
    },
    detailsWrapper:{
        width:"90%",
    },
    postDetailsTitle:{
        color: theme.colors.primary,
        paddingTop:10,
        fontSize:26,
        fontWeight: "bold",
        borderBottomColor: theme.colors.secondary,
        borderBottomWidth: 1,
    },
    postDetailsSection:{
        paddingTop:20,
        flexDirection: "row"
    },
    postDetailsSectionTitle:{
        width:"50%"
    },
    postDetailsLabel:{
        color: theme.colors.primary,
        fontSize:16
    }
  });
