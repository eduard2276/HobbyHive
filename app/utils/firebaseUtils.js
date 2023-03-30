import { auth } from "../hook/firebase";
import { useState, useEffect } from "react";
import {
  child,
  getDatabase,
  push,
  ref,
  set,
  update,
  get,
} from "firebase/database";

const createUserAccount = (email, password) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      console.log("Registered with:", user);
      const database = getDatabase();
      set(ref(database, `users/${auth.currentUser?.uid}`), {
        userInfo: {
          email: email,
          isProfileReady: false,
        },
      });
    })
    .catch((error) => alert(error.message));
};

const createNewPost = (data) => {
  const database = getDatabase();
  const postData = {
    uid: auth.currentUser?.uid,
    ...data,
  };
  const newPostKey = push(child(ref(database), "posts")).key;

  const updates = {};
  updates[`/users/${auth.currentUser?.uid}/posts/${newPostKey}`] = postData;
  updates[`/posts/${newPostKey}`] = postData;
  return update(ref(database), updates);
};

const updatePost = (key, data) => {
  const database = getDatabase();
  const postData = {
    uid: auth.currentUser?.uid,
    ...data,
  };

  const updates = {};
  updates[`/users/${auth.currentUser?.uid}/posts/${key}`] = postData;
  updates[`/posts/${key}`] = postData;
  return update(ref(database), updates);
};

const updateUserInformation = async (userInfo) => {
  const database = getDatabase();
  const postData = {
    email: auth.currentUser?.email,
    ...userInfo,
  };
  const updates = {};
  updates[`/users/${auth.currentUser?.uid}/userInfo`] = postData;
  return update(ref(database), updates);
};

const getUserInfo = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    const databaseRef = ref(getDatabase());
    get(child(databaseRef, `users/${auth.currentUser?.uid}/userInfo`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
          setIsLoading(false);
          console.log(snapshot.val());
        } else {
          setError("No data available");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error };
};

const getUserPosts = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    const databaseRef = ref(getDatabase());
    get(child(databaseRef, `users/${auth.currentUser?.uid}/posts`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const result = Object.keys(snapshot.val()).map((key) => ({
            [key]: snapshot.val()[key],
          }));
          console.log("Aici");
          setData(result);
          setIsLoading(false);
        } else {
          setData([]);
          setError("No data available");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

const deleteUserPost = async (key) => {
  const database = getDatabase();
  const updates = {};
  updates[`/users/${auth.currentUser?.uid}/posts/${key}`] = null;
  updates[`/posts/${key}`] = null;
  return update(ref(database), updates);
};

const getUserPost = (key) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    const databaseRef = ref(getDatabase());
    get(child(databaseRef, `users/${auth.currentUser?.uid}/posts/${key}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
          console.log("hey");
          console.log(snapshot.val());
          setIsLoading(false);
        } else {
          setData([]);
          setError("No data available");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
};


const getAllPosts = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    const databaseRef = ref(getDatabase());
    get(child(databaseRef, "/posts"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const result = Object.keys(snapshot.val()).map((key) => ({
            [key]: snapshot.val()[key],
          }));
          console.log("Aici");
          setData(result);
          setIsLoading(false);
        } else {
          setData([]);
          setError("No data available");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
};


export {
  createUserAccount,
  updateUserInformation,
  getUserInfo,
  createNewPost,
  getUserPosts,
  deleteUserPost,
  getUserPost,
  updatePost,
  getAllPosts,
};
