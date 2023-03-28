import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import TextInput from "../../components/auth/TextInput";
import Button from "../../components/auth/Button";
import { default as Tabs } from "../../components/profile/ProfileTabs";
import { updateUserInformation } from "../../utils/firebaseUtils";
import { useRouter } from "expo-router";
import { nameValidator as textValidator } from "../../utils/nameValidator";

const GenderTabs = ["Male", "Female", "Other"];
let AgeTabs = [];
for (let index = 0; index < 120; index++) {
  AgeTabs[index] = index + 1;
}

const EditProfile = () => {
  const [fullName, setFullName] = useState({ value: "", error: "" });
  const [location, setLocation] = useState({ value: "", error: "" });
  const [nationality, setNationality] = useState({ value: "", error: "" });
  const [phoneNumber, setPhoneNumber] = useState({ value: "", error: "" });
  const [gender, setGender] = useState(GenderTabs[0]);
  const [age, setAge] = useState(AgeTabs[0]);
  const [about, setAbout] = useState({ value: "", error: "" });
  const [hobbies, setHobbies] = useState({ value: "", error: "" });

  const router = useRouter();

  const handleSubmit = () => {
    const nameError = textValidator(fullName.value);
    const locationError = textValidator(location.value);
    const nationalityError = textValidator(nationality.value);
    const phoneError = textValidator(phoneNumber.value);
    const aboutError = textValidator(about.value);
    const hobbiesError = textValidator(hobbies.value);
    if (
      nameError ||
      locationError ||
      nationalityError ||
      phoneError ||
      aboutError ||
      hobbiesError
    ) {
      setFullName({ ...fullName, error: nameError });
      setLocation({ ...location, error: locationError });
      setNationality({ ...nationality, error: nationalityError });
      setPhoneNumber({ ...phoneNumber, error: phoneError });
      setAbout({ ...about, error: aboutError });
      setHobbies({ ...hobbies, error: hobbiesError });
      return;
    }

    updateUserInformation({
      fullName: fullName.value,
      location: location.value,
      nationality: nationality.value,
      phoneNumber: phoneNumber.value,
      gender: gender,
      age: age,
      about: about.value,
      hobbies: hobbies.value,
      isProfileReady: true,
    }).then(() => {
      console.log("Done");
      router.push("/Search");
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://scontent.ftsr1-2.fna.fbcdn.net/v/t1.6435-9/212345919_4107898495955116_8238256389218474921_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=WXna0Hs24UAAX_xlnty&_nc_ht=scontent.ftsr1-2.fna&oh=00_AfCJqnXxAbUK6AH65_NYdLGhmWzOMQAc7VO2V8hC91i2kw&oe=6443C6F7",
            }}
          />
        </View>
        <View style={styles.form}>
          <TextInput
            label="Full Name"
            returnKeyType="next"
            value={fullName.value}
            onChangeText={(text) => setFullName({ value: text, error: "" })}
            error={!!fullName.error}
            errorText={fullName.error}
          />
          <TextInput
            label="Location"
            returnKeyType="next"
            value={location.value}
            onChangeText={(text) => setLocation({ value: text, error: "" })}
            error={!!location.error}
            errorText={location.error}
          />

          <TextInput
            label="Nationality"
            returnKeyType="next"
            value={nationality.value}
            onChangeText={(text) => setNationality({ value: text, error: "" })}
            error={!!nationality.error}
            errorText={nationality.error}
          />

          <TextInput
            label="Phone Number"
            returnKeyType="next"
            value={phoneNumber.value}
            onChangeText={(text) => setPhoneNumber({ value: text, error: "" })}
            error={!!phoneNumber.error}
            errorText={phoneNumber.error}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Gender </Text>
          <Tabs tabs={GenderTabs} activeTab={gender} setActiveTab={setGender} />
          <Text style={styles.label}>Age </Text>
          <Tabs tabs={AgeTabs} activeTab={age} setActiveTab={setAge} />

          <TextInput
            label="About"
            returnKeyType="next"
            value={about.value}
            onChangeText={(text) => setAbout({ value: text, error: "" })}
            error={!!about.error}
            errorText={about.error}
            numberOfLines={4}
            multiline
            style={{ marginTop: 10 }}
          />

          <TextInput
            label="Hobbies"
            returnKeyType="next"
            value={hobbies.value}
            onChangeText={(text) => setHobbies({ value: text, error: "" })}
            error={!!hobbies.error}
            errorText={hobbies.error}
            style={{ marginTop: 10 }}
          />
        </View>
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={{ marginTop: 24, width: "60%" }}
        >
          Save
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  keyboardAvoidingView: {
    flex: 0,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "90%",
  },
  label: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#1E90FF",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  avatarContainer: {
    marginTop: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    height: 150,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default EditProfile;
