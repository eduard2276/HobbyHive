import { View, Text, StyleSheet, Image } from "react-native";
import { auth } from "../../hook/firebase";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getImage } from "../../utils/firestoreUtils";

const ProfileHeader = ({ data }) => {
  const {image} = getImage(auth.currentUser?.uid)
  return (
    <View style={styles.header}>
      <Image
        style={styles.avatar}
        source={{
          uri: image,
        }}
      />
      <View style={styles.informationContainer}>
        <Text style={styles.name}>{data?.fullName}</Text>
        <View style={styles.userInfoSection}>
          <View style={styles.basicInfo}>
            <Icon name="phone" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 1 }}>
              {data?.phoneNumber}
            </Text>
          </View>
          <View style={styles.basicInfo}>
            <Icon name="email" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 1 }}>
              {data?.email}
            </Text>
          </View>
          <View style={styles.basicInfo}>
            <Icon name="star" color="#8B8000" size={20} />
            <Text style={{ color: "#777777", marginLeft: 1 }}>
              - {data?.stars ? data?.stars : ""}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    backgroundColor: "#FFFFFF",
    height: 150,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  userInfoSection: {
    paddingHorizontal: 0,
    marginBottom: 25,
  },
  informationContainer: {
    width: 150,
    height: 120,
    marginLeft: 20,
    marginTop: 20,
  },
  basicInfo: {
    flexDirection: "row",
    marginBottom: 0,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
  },
});
