import React, { useState, useEffect } from 'react'
import {StyleSheet, ScrollView, SafeAreaView, ActivityIndicator, Text } from 'react-native'
import setting from '../../assets/photos/setting.png'
import { default as Menu } from '../../components/common/Footer'
import ScreenHeaderButton from '../../components/common/ScreenHeaderButton'
import ProfileHeader from '../../components/profile/ProfileHeader'
import ProfileTabs from '../../components/profile/ProfileTabs'
import AboutSectionTab from '../../components/profile/tabs/AboutSectionTab'
import ReviewsSectionTab from '../../components/profile/tabs/ReviewsSectionTab'
import { getUserInfo } from '../../utils/firebaseUtils'
import { useRouter, Stack } from 'expo-router'



const tabs = ["About", "Reviews"]

const Profile = () => {
  const [activeTab, setActiveTab] = useState(tabs[0])
  const { data, isLoading, error } = getUserInfo()
  const router = useRouter()

  const displayTabContent = () => {
    switch (activeTab) {
      case "About":
        return <AboutSectionTab data={data} />
      case "Reviews":
        return <ReviewsSectionTab />
      default:
        break;
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#FFF" },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerRight: () => (

            <ScreenHeaderButton
              iconUrl={setting}
              dimension="60%"
              handlePress={() => router.push('/EditProfile')}
            />
          ),
          headerTitle: "Profile"
        }}
      />
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView>
          <ProfileHeader
            data={data}
          />
          <ProfileTabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          {displayTabContent()}
        </ScrollView>
      )}

      < Menu />

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