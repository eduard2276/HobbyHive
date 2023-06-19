import { View, Text, StyleSheet, Image } from "react-native";
import { auth } from "../../hook/firebase";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getImage } from "../../utils/firestoreUtils";
import { theme } from "../../constants/theme";

const ProfileHeader = ({ data, details }) => {
  const {image} = details ? getImage(details?.uid) : getImage(auth.currentUser?.uid)
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
            <Icon name="phone" color={theme.colors.text} size={20} />
            <Text style={{ color: theme.colors.text, marginLeft: 1 }}>
              {data?.phoneNumber}
            </Text>
          </View>
          <View style={styles.basicInfo}>
            <Icon name="email" color={theme.colors.text} size={20} />
            <Text style={{ color: theme.colors.text, marginLeft: 1 }}>
              {data?.email}
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
  },
  header: {
    backgroundColor: theme.colors.background,
    height: 150,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 0,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  userInfoSection: {
    paddingTop: 5,
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
    paddingTop: 2,
    flexDirection: "row",
    marginBottom: 0,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
