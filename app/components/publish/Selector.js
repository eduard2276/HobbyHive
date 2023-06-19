import React from "react";
import {default as Tabs} from "../profile/ProfileTabs";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../constants/theme";

const Selector = ({text, tabs, activeTab, setActiveTab}) => {
    return (
        <View style={styles.selector}>
            <Text style={styles.title}>{text}</Text>
            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
        </View>
    );
};

export default Selector;

const styles = StyleSheet.create({
    title:{
      fontSize:20,
      fontWeight: 'bold',
      color: theme.colors.primary
    },
    selector:{
      paddingTop:20,
      width: "80%",
      alignSelf: 'center',
      justifyContent: 'center',
    }
  });
