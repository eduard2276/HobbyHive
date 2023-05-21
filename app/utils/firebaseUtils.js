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
  onValue,
  remove,
} from "firebase/database";
import { getImageBasedOnUid } from "./firestoreUtils";

const createUserAccount = (email, password) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      const database = getDatabase();
      console.log("CREATE CHAT")
      createChat(auth.currentUser?.uid, "GPT")
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
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    const imageUrl = await getImageBasedOnUid(userUid);
    console.log(imageUrl);
    const databaseRef = ref(getDatabase());
    get(child(databaseRef, `users/${userUid}/userInfo`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log("############")
          const ceva = { ...snapshot.val(), imageUrl: imageUrl }
          console.log(ceva)
          setData({ ...snapshot.val(), imageUrl: imageUrl });

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
        const userId = postSnapshot.val().uid;
        const imageUrl = await getImageBasedOnUid(userId);
        postsArray.push({
          ...postSnapshot.val(),
          postId: postId,
          imageUrl: imageUrl,
        });
      }
    }
    console.log(postsArray);
    setData(postsArray);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, refetch };
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

    const snapshot = await get(child(databaseRef, "/posts"));
    if (!snapshot.val()) {
      setIsLoading(false);
      return;
    }
    const result = Object.keys(snapshot.val()).map((key) => ({
      [key]: snapshot.val()[key],
    }));

    let updatedData = [];
    for (let i = 0; i < result.length; i++) {
      const post = result[i];
      const postId = Object.keys(post)[0];
      const userId = post[postId].uid;
      console.log(userId);
      const imageUrl = await getImageBasedOnUid(userId);
      console.log(imageUrl);
      updatedData.push({
        ...post,
        url: imageUrl,
      });
    }
    setData(updatedData);
    setIsLoading(false);
    // result.forEach((post) => {
    //   const postId = Object.keys(post)[0]
    //   const userId = post[postId].uid
    //   const imageUrl = await getImageBasedOnUid(userId)
    //   console.log(imageUrl)
    // });

    // get(child(databaseRef, "/posts"))
    //   .then((snapshot) => {
    //     if (snapshot.exists()) {
    //       const result = Object.keys(snapshot.val()).map((key) => ({
    //         [key]: snapshot.val()[key],
    //       }));
    //       let updatedData = []

    //       result.forEach((post) => {
    //         const postId = Object.keys(post)[0]
    //         const userId = post[postId].uid
    //         const imageUrl = await getImageBasedOnUid(userId)
    //         console.log(imageUrl)
    //       });
    //       setData(result);
    //       setIsLoading(false);
    //     } else {
    //       setData([]);
    //       setError("No data available");
    //     }
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
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

const getChatId = (userId1, userId2) => {
  let chatId = "";
  if (userId1 > userId2) {
    chatId = userId1 + "_" + userId2;
  } else {
    chatId = userId2 + "_" + userId1;
  }
  return chatId;
};

const createChat = (userId1, userId2) => {
  if (checkChatExists(userId1, userId2) === true) {
    return;
  }
  let chatId = getChatId(userId1, userId2);
  const database = getDatabase();
  console.log("#############CREATE_CHATS#############")
  console.log(createChat);
  set(ref(database, `/chats/${chatId}`), {
    participants: [userId1, userId2],
  });
};

const checkChatExists = async (userId1, userId2) => {
  let chatId = getChatId(userId1, userId2);
  console.log("SUNT AICI");
  const databaseRef = ref(getDatabase());
  const snapshot = await get(child(databaseRef, `chats/${chatId}`));
  if (snapshot.val()) {
    console.log("true");
    return true;
  } else {
    console.log("false");
    return false;
  }
};

const sendMessage = ({ _id, fullName, timestamp, message, from, to }) => {
  let chatId = getChatId(from, to);
  const database = getDatabase();

  set(ref(database, `/messages/${chatId}/${timestamp}`), {
    uid: from,
    _id: _id,
    timestamp: timestamp,
    message: message,
    fullName: fullName,
  });

  let postData = {
    participants: [from, to],
    lastMessage: message,
    timestamp: timestamp,
  };
  const updates = {};
  updates[`chats/${chatId}`] = postData;
  update(ref(database), updates);
};

const getUserChats = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = async () => {
    const databaseRef = ref(getDatabase());
    const snapshot = await get(child(databaseRef, `chats`));
    if (!snapshot.val()) {
      setIsLoading(false);
      return;
    }
    let otherUsersIds = [];
    let chats = [];
    for (const property in snapshot.val()) {
      const participants = snapshot.val()[property].participants;

      let participantId = "";
      if (participants[0] === auth.currentUser?.uid) {
        participantId = participants[1];
        otherUsersIds.push(participants[1]);
      } else if (participants[1] === auth.currentUser?.uid) {
        participantId = participants[0];
        otherUsersIds.push(participants[0]);
      }

      if (participantId !== "") {
        const nameSnapshot = await get(
          child(databaseRef, `users/${participantId}`)
        );
        const imageUrl = await getImageBasedOnUid(participantId);
        chats.push({
          userName: nameSnapshot.val().userInfo.fullName,
          userId: participantId,
          lastMessage: snapshot.val()[property].lastMessage,
          timestamp: snapshot.val()[property].timestamp,
          imageUrl: imageUrl,
        });
      }
    }
    setData(chats);
    setIsLoading(false);
  };

  const fetchData = async () => {
    setIsLoading(true);
    console.log("fetch")
    const databaseRef = ref(getDatabase());
    const snapshot = await get(child(databaseRef, `chats`));
    if (!snapshot.val()) {
      setIsLoading(false);
      return;
    }
    let otherUsersIds = [];
    let chats = [];
    for (const property in snapshot.val()) {
      const participants = snapshot.val()[property].participants;

      let participantId = "";
      if (participants[0] === auth.currentUser?.uid) {
        participantId = participants[1];
        otherUsersIds.push(participants[1]);
      } else if (participants[1] === auth.currentUser?.uid) {
        participantId = participants[0];
        otherUsersIds.push(participants[0]);
      }

      if (participantId !== "") {
        const nameSnapshot = await get(
          child(databaseRef, `users/${participantId}`)
        );
        const imageUrl = await getImageBasedOnUid(participantId);
        chats.push({
          userName: nameSnapshot.val().userInfo.fullName,
          userId: participantId,
          lastMessage: snapshot.val()[property].lastMessage,
          timestamp: snapshot.val()[property].timestamp,
          imageUrl: imageUrl,
        });
      }
    }
    console.log(chats);
    setData(chats);
    setIsLoading(false);
    for (const userId of otherUsersIds) {
      chatId = getChatId(auth.currentUser?.uid, userId);

      const dbRef = ref(getDatabase(), `chats/${chatId}`);

      const unsubscribe = onValue(dbRef, (snapshot) => {
        const updatedData = snapshot.val();
        console.log(`${auth.currentUser?.uid}: PLM: `);
        refetch();
      });

      return () => {
        unsubscribe();
      };
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading };
};

const cancelPost = async (postId, uid) => {
  const db = getDatabase();
  const nodeRef = ref(db, `users/${uid}/postsApplied/${postId}`);
  remove(nodeRef)
    .then(() => {
      console.log("Entry deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting entry:", error);
    });

  const databaseRef = ref(getDatabase());
  const snapshot = await get(child(databaseRef, `posts/${postId}`));
  console.log("hey");
  if (!snapshot.val()) {
    return;
  } else {
    let usersArray = snapshot.val().appliedUsers;
    let userPostId = snapshot.val().uid;
    const newUsersArray = usersArray.filter((userId) => userId !== uid);
    const updates = {};
    updates[`posts/${postId}/appliedUsers`] = newUsersArray;
    updates[`users/${userPostId}/posts/${postId}/appliedUsers`] = newUsersArray;
    update(ref(db), updates);
  }

  // const postRef = ref(db, `posts/${postId}/appliedUsers`);
  // postRef
  //   .get()
  //   .then((snapshot) => {
  //     const currentArray = snapshot.val();
  //     // const updatedArray = currentArray.filter((id) => id !== auth.currentUser?.uid);
  //     console.log("---------UPDATED ARRAY-----------")
  //     console.log(currentArray)
  //     //return update(postRef, updatedArray);
  //   })
  //   .then(() => {
  //     console.log('ID deleted successfully');
  //     setDeletedId(idToDelete);
  //   })
  //   .catch((error) => {
  //     console.error('Error deleting ID:', error);
  //   });
};

const getListOfMembersFromPostId = (postId) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    const databaseRef = ref(getDatabase());

    const snapshot = await get(child(databaseRef, `posts/${postId}`));
    if (!snapshot.val()) {
      setIsLoading(false);
      return;
    }
    const appliedUsers = snapshot.val().appliedUsers;
    console.log(appliedUsers);
    let usersDataArray = [];
    for (const user in appliedUsers) {
      const userId = appliedUsers[user];
      const imageUrl = await getImageBasedOnUid(userId)
      const userSnapshot = await get(
        child(databaseRef, `/users/${userId}/userInfo`)
      );
      console.log(userSnapshot.val());
      if (userSnapshot.val()) {
        usersDataArray.push({
          ...userSnapshot.val(),
          userId: userId,
          imageUrl: imageUrl
        });
      } else {
        continue;
      }
    }
    setData(usersDataArray);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading };
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
  getUserPostAndDetails,
  applyUser,
  getUserAppliedPosts,
  createChat,
  checkChatExists,
  getChatId,
  sendMessage,
  getUserChats,
  cancelPost,
  getListOfMembersFromPostId,
};
