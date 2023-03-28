import { View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { Image } from "react-native";

const Footer = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          router.push("/Search");
        }}
        style={styles.likeBtn}
      >
        <Image resizeMode="contain" style={styles.likeBtnImage} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("/Publish");
        }}
        style={styles.likeBtn}
      >
        <Image resizeMode="contain" style={styles.likeBtnImage} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("/MyPublishes");
        }}
        style={styles.likeBtn}
      >
        <Image resizeMode="contain" style={styles.likeBtnImage} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("/Messages");
        }}
        style={styles.likeBtn}
      >
        <Image resizeMode="contain" style={styles.likeBtnImage} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("/Profile");
        }}
        style={styles.likeBtn}
      >
        <Image resizeMode="contain" style={styles.likeBtnImage} />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: "#FFF",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  likeBtn: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: "#F37453",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  likeBtnImage: {
    width: "40%",
    height: "40%",
    tintColor: "#F37453",
  },
  applyBtn: {
    flex: 1,
    backgroundColor: "#FE7654",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
    borderRadius: 16,
  },
  applyBtnText: {
    fontSize: 16,
    color: "#F3F4F8",
  },
});
