import React, {useState} from 'react'
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import { default as Menu } from '../../components/common/Footer'
import ProfileHeader from '../../components/profile/ProfileHeader'
import ProfileTabs from '../../components/profile/ProfileTabs'
import AboutSectionTab from '../../components/profile/tabs/AboutSectionTab'
import ReviewsSectionTab from '../../components/profile/tabs/ReviewsSectionTab'

const tabs = [ "About", "Reviews"]

const Profile = () => {
  const [activeTab, setActiveTab] = useState(tabs[0])

  const displayTabContent = () =>{
    switch (activeTab) {
        case "About":
            return <AboutSectionTab/>
        case "Reviews":
            return <ReviewsSectionTab/>
        default:
            break;
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ProfileHeader 
          name={'Eduard Coras'}
          image={"https://scontent.ftsr1-2.fna.fbcdn.net/v/t1.6435-9/212345919_4107898495955116_8238256389218474921_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=WXna0Hs24UAAX_xlnty&_nc_ht=scontent.ftsr1-2.fna&oh=00_AfCJqnXxAbUK6AH65_NYdLGhmWzOMQAc7VO2V8hC91i2kw&oe=6443C6F7"}
          stars={5}
        />
        <ProfileTabs 
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {displayTabContent()}
      </ScrollView>
      <Menu/>
      
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1
  }
});