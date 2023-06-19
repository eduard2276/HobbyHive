import { View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { Image } from "react-native";
import { theme } from "../../constants/theme";

const MenuButton = ({route, image}) => {
  const router = useRouter();
  return (
    <TouchableOpacity
        onPress={() => {
          if ( route === "/Publish")
          {
            router.push(route)
          }
          router.replace(route);
        }}
        style={styles.likeBtn}
      >
        <Image resizeMode="contain" style={styles.likeBtnImage} source={image}/>
      </TouchableOpacity>
  )
}


const Footer = () => {
  return (
    <View style={styles.container}>
      <MenuButton route="/Search" image={require('../../assets/photos/search.png')}/>
      <MenuButton route="/MyPublishes" image={require('../../assets/photos/file.png')}/>
      <MenuButton route="/Publish" image={require('../../assets/photos/add.png')}/>
      <MenuButton route="/Messages" image={require('../../assets/photos/messenger.png')}/>
      <MenuButton route="/Profile" image={require('../../assets/photos/user.png')}/>
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
    backgroundColor: theme.colors.menuColor
  },
  likeBtn: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  likeBtnImage: {
    width: "40%",
    height: "40%",
    tintColor: theme.colors.primary,
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
