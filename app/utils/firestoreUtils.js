import { auth } from "../hook/firebase";
import { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const uploadImage = async (image) => {
  const storage = getStorage();

  const storageRef = ref(storage, `${auth.currentUser?.uid}.jpg`);

  const img = await fetch(image);
  const bytes = await img.blob();

  await uploadBytes(storageRef, bytes);
};

const getImage = (uid) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchImage = async () => {
    const image = null;
    const storage = getStorage();
    const reference = ref(storage, `/${uid}.jpg`);
    const snapshot = await getDownloadURL(reference);
    if (snapshot) {
      setImage(snapshot);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return { image, isLoading };
};

const getImageBasedOnUid = async (uid) => {
  const storage = getStorage();
  const reference = ref(storage, `/${uid}.jpg`);
  const snapshot = await getDownloadURL(reference);
  return snapshot;
};
export { uploadImage, getImage, getImageBasedOnUid };
