import { auth } from "../hook/firebase";
import { useState, useEffect } from "react";
import { child, getDatabase, push, ref, set, update, get } from "firebase/database";


const createUserAccount = (email, password) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Registered with:', user);
      const database = getDatabase();
      set(ref(database, `users/${auth.currentUser?.uid}`), {
        userInfo: {
          email: email,
          isProfileReady: false
        }
      });
    })
    .catch(error => alert(error.message))
}

const createNewPost = (data) => {
  const database = getDatabase();
  const postData = {
    uid: auth.currentUser?.uid,
    ...data
  }
  const newPostKey = push(child(ref(database), 'posts')).key;

  const updates = {}
  updates[`/users/${auth.currentUser?.uid}/posts/${newPostKey}`] = postData
  updates[`/posts/${newPostKey}`] = postData
  return update(ref(database), updates);
}

const updateUserInformation = async (userInfo) => {
  const database = getDatabase();
  const postData = {
    email: auth.currentUser?.email,
    ...userInfo
  }
  const updates = {};
  updates[`/users/${auth.currentUser?.uid}/userInfo`] = postData
  return update(ref(database), updates)
}

const getUserInfo = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setIsLoading(true)

    const databaseRef = ref(getDatabase());
    get(child(databaseRef, `users/${auth.currentUser?.uid}/userInfo`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val())
          setIsLoading(false)
          console.log(snapshot.val())
        } else {
          setError("No data available")
        }
      }).finally(() => { setIsLoading(false) })
  }
  useEffect(() => {
    fetchData();
  }, []);

  return{ data, isLoading, error }
}

export { createUserAccount, updateUserInformation, getUserInfo, createNewPost}