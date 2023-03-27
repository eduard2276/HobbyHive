import React from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import { default as Menu } from "../../components/common/Footer";
import { sports } from "../../constants/";
import { SelectList } from "react-native-dropdown-select-list";

const Publish = () => {
  const [selected, setSelected] = React.useState("");
  return (
    <SafeAreaView style={styles.container}>
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={sports}
        save="value"
        // arrowicon={
        //   <FontAwesome name="chevron-down" size={12} color={"black"} />
        // }
        //searchicon={<FontAwesome name="search" size={12} color={"black"} />}
        // boxStyles={{ borderRadius: 20 }} //override default styles
      />
    </SafeAreaView>
  );
};

export default Publish;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    alignItems: "center",
    width: "90%",
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
});
