import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { color } from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { theme } from '../../../constants/theme'

const AboutSectionTab = ({data}) => {
  return (
    <View  style={styles.container}>
      <View style={styles.basicInfoContainer}>
        <View style={styles.ageContainer}>
          <Text style={styles.basicInfoTitle}>Age</Text>
          <Text style={styles.basicInfoValue}>{data.age}</Text>
        </View>
        <View style={styles.nationalityContainer}>
          <Text style={styles.basicInfoTitle}>Nationality</Text>
          <Text style={styles.basicInfoValue}>{data.nationality}</Text>
        </View>
        <View style={styles.genderContainer}>
          <Text style={styles.basicInfoTitle}>Gender</Text>
          <Text style={styles.basicInfoValue}>{data.gender}</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoSectionTitleWrapper}>
          <Icon name="map-marker" color={theme.colors.primary} size={30}/>
          <Text style={styles.infoSectionTitle}>Location</Text>
        </View>
        <Text style={styles.infoSectionContent}>{data.location}</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoSectionTitleWrapper}>
          <Icon name="exclamation-thick" color={theme.colors.primary} size={30}/>
          <Text style={styles.infoSectionTitle}>About</Text>
        </View>
        <Text style={styles.infoSectionContent}>{data.about}</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoSectionTitleWrapper}>
          <Icon name="heart" size={30} color={theme.colors.primary}/>
          <Text style={styles.infoSectionTitle}>Hobbyes</Text>
        </View>
        <Text style={styles.infoSectionContent}>{data.hobbies}</Text>
      </View>
    </View>
  )
}

export default AboutSectionTab

const styles = StyleSheet.create({
  container:{

  },
  basicInfoContainer:{
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 80,
    flexWrap: 'wrap',
  },
  ageContainer:{
    width:'30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nationalityContainer:{
    width:'40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderContainer:{
    width:'30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  basicInfoTitle:{
    fontWeight: "bold",
    fontSize: 16,
    color: theme.colors.primary
  },
  basicInfoValue:{
    paddingTop: 5,
    fontWeight: 'bold',
    color: theme.colors.text
  },
  infoSection:{
    height: 80,
    paddingTop: 10,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  infoSectionTitleWrapper:{
    flexDirection: 'row',
  },
  infoSectionTitle:{
    fontSize:18,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: "bold",
    color: theme.colors.primary
  },
  infoSectionContent:{
    fontSize:16,
    paddingLeft: 30,
    color: theme.colors.text
  }
})