import { View, Text, StyleSheet, Image } from "react-native";
import { star } from '../../assets/photos/star.png'

const ProfileHeader = ({ name, stars, image }) => {
    return (
        <View style={styles.header}>
            <Image
                style={styles.avatar}
                source={{ uri: image }}

            />
            <View style={styles.informationContainer}>
                <Text style={styles.name}>{name}</Text>
                <View style={styles.starsContainer}>
                    <Image
                        source={require('../../assets/photos/star.png')}
                        style={styles.starImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.label}> - {stars}</Text>
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
    informationContainer: {
        width: 150,
        height: 120,
        marginLeft: 20,
        marginTop: 40,
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#000000",
    },
    starsContainer: {
        flexDirection: "row",
        paddingTop:25,
    },
    starImage: {
        width: 28,
        height: 28,
    },
    label: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000000",
    }
});
