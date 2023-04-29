import { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { auth } from "../../../hook/firebase";
import {
  getDatabase,
  ref,
  child,
  onValue,
  push,
  update,
  orderByChild,
  equalTo,
} from "@firebase/database";
import {
  createChat,
  checkChatExists,
  getChatId,
  getUserInfo,
  sendMessage
} from "../../../utils/firebaseUtils";
import { GiftedChat } from "react-native-gifted-chat";
import { useRouter, useSearchParams } from "expo-router";

const Messages = () => {
  const params = useSearchParams();

  const { data, isLoading, error } = getUserInfo(auth.currentUser?.uid);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const userId1 = auth.currentUser?.uid;
  const userId2 = params.id;

  // Load messages for this chat from Firebase
  useEffect(() => {
    createChat(userId1, userId2);
    const chatId = getChatId(userId1, userId2);
    const dbRef = ref(getDatabase(), `messages/${chatId}`);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      let messages = []
      for (const property in snapshot.val()) {

        messages.push({
            _id: snapshot.val()[property]._id,
            text: snapshot.val()[property].message,
            createdAt: snapshot.val()[property].timestamp,
            user: {
                _id: snapshot.val()[property].uid
            }
        })
      }
      messages.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
      setMessages(messages)
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const { _id, createdAt, text, user } = messages[0];
    sendMessage({
        _id: _id,
        fullName: "data.fullName",
        timestamp: Date.now(),
        message: text,
        to: userId2
    })

  }, []);

  return (
    <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{_id: auth.currentUser?.uid}}
        />
  );
};

export default Messages;
