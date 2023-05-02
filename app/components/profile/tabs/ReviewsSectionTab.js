import React from "react";
import { useState } from "react";
import { Text, View, Button, Image, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { auth } from "../../../hook/firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { uploadImage } from "../../../utils/firestoreUtils";

const ReviewsSectionTab = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // const uploadImage = async () => {

  //   const storage = getStorage();

  //   const storageRef = ref(storage, `${auth.currentUser?.uid}.jpg`);

  //   const img = await fetch(image)
  //   const bytes = await img.blob()

  //   await uploadBytes(storageRef, bytes)

  // }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Save" onPress={uploadImage(image)} />
    </View>
  );
};

export default ReviewsSectionTab;
