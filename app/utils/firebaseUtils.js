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

const getUserInfo = (userUid) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    const databaseRef = ref(getDatabase());
    get(child(databaseRef, `users/${userUid}/userInfo`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
          setIsLoading(false);
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

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
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

const getUserAppliedPosts = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    const databaseRef = ref(getDatabase());
    const snapshot = await get(
      child(databaseRef, `users/${auth.currentUser?.uid}/postsApplied`)
    );
    if (!snapshot.val()) {
      setIsLoading(false);
      return;
    }
    const result = Object.keys(snapshot.val()).map((key) => ({
      [key]: snapshot.val()[key],
    }));
    console.log(result);
    let postsArray = [];
    for (const key in result) {
      const postId = Object.keys(result[key])[0];
      const postSnapshot = await get(child(databaseRef, `/posts/${postId}`));
      if (postSnapshot.val()) {
        postsArray.push(postSnapshot.val());
      }
    }
    console.log(postsArray);
    setData(postsArray);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading };
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
    get(child(databaseRef, `/posts/${key}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
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

const getUserPostAndDetails = (key) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postId = key.split("\\")[0];
  const userId = key.split("\\")[1];

  const fetchData = async () => {
    setIsLoading(true);

    const databaseRef = ref(getDatabase());
    get(child(databaseRef, `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData({
            userDetails: snapshot.val()["userInfo"],
            postDetails: snapshot.val()["posts"][postId],
          });
          console.log(snapshot.val()["userInfo"]);
          console.log(snapshot.val()["posts"][postId]);
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

const applyUser = (data, key) => {
  const database = getDatabase();
  const appliedUser = data.postDetails.uid;
  const postDetails = data.postDetails;

  console.log(data.postDetails.appliedUsers);

  //TO DO: Check to verify daca mai useru mai e
  let postData = {};
  if (postDetails?.appliedUsers) {
    if (postDetails.appliedUsers.includes(auth.currentUser?.uid)) {
      alert("You already applied for this event");
      return;
    }
    postDetails.appliedUsers.push(auth.currentUser?.uid);
    postData = {
      appliedUsers: postDetails,
      ...postDetails,
    };
  } else {
    postData = {
      appliedUsers: [auth.currentUser?.uid],
      ...postDetails,
    };
  }

  const updates = {};
  updates[`/users/${auth.currentUser?.uid}/postsApplied/${key}`] = "1";
  updates[`/users/${appliedUser}/posts/${key}`] = postData;
  updates[`/posts/${key}`] = postData;
  return update(ref(database), updates);
};

const getChatId = (userId1, userId2) =>
{
  let chatId = "";
  if (userId1 > userId2) {
    chatId = userId1 + "_" + userId2;
  } else {
    chatId = userId2 + "_" + userId1;
  }
  return chatId
}

const createChat = (userId1, userId2) => {
  let chatId = getChatId(userId1, userId2);
  const database = getDatabase();
  console.log(createChat)
  set(ref(database, `/chats/${chatId}`), {
    participants: [userId1, userId2]
  });
};

const checkChatExists = async (userId1, userId2) => {
  let chatId = getChatId(userId1, userId2);
  console.log("SUNT AICI")
  const databaseRef = ref(getDatabase());
  const snapshot = await get(child(databaseRef, `chats/${chatId}`));
  if (snapshot.val()) {
    console.log("true")
    return true;
  } else {
    console.log("false")
    return false;
  }
};

const sendMessage = ({_id, fullName, timestamp, message, to}) => {
  let chatId = getChatId(auth.currentUser?.uid, to);
  const database = getDatabase();

  set(ref(database, `/messages/${chatId}/${timestamp}`), {
    "uid": auth.currentUser?.uid,
    "_id": _id,
    "timestamp": timestamp,
    "message": message,
    "fullName": fullName
  });

  let postData = {
    participants: [auth.currentUser?.uid, to],
    lastMessage: message,
    timestamp: timestamp
  };
  const updates = {};
  updates[`chats/${chatId}`] = postData;
  update(ref(database), updates)
}

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
  getUserPostAndDetails,
  applyUser,
  getUserAppliedPosts,
  createChat,
  checkChatExists,
  getChatId,
  sendMessage
};
