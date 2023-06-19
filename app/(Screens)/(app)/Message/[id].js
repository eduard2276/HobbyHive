import { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { auth } from "../../../hook/firebase";
import { getDatabase, ref, onValue } from "@firebase/database";
import {
  createChat,
  getChatId,
  getUserInfo,
  sendMessage,
} from "../../../utils/firebaseUtils";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { useRouter, useSearchParams, Stack } from "expo-router";
import query from "../../../utils/queryApi";
import { theme } from "../../../constants/theme";

const Messages = () => {
  const params = useSearchParams();
  const userId1 = auth.currentUser?.uid;
  const userId2 = params.id;

  const { data, isLoading, error } = getUserInfo(userId2);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Load messages for this chat from Firebase
  useEffect(() => {
    createChat(userId1, userId2);
    const chatId = getChatId(userId1, userId2);
    const dbRef = ref(getDatabase(), `messages/${chatId}`);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      let messages = [];
      for (const property in snapshot.val()) {
        messages.push({
          _id: snapshot.val()[property]._id,
          text: snapshot.val()[property].message,
          createdAt: snapshot.val()[property].timestamp,
          user: {
            _id: snapshot.val()[property].uid,
            avatar: data.imageUrl,
          },
        });
      }
      messages.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
      setMessages(messages);
    });

    return () => {
      unsubscribe();
    };
  }, [data]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    sendMessage({
      _id: _id,
      fullName: "data.fullName",
      timestamp: Date.now(),
      message: text,
      from: auth.currentUser?.uid,
      to: userId2,
    });

    if (userId2 === "GPT") {
      const response = query(_id, text);
    }
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: theme.colors.background },
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTitle: "Chat",
          headerTitleStyle: { color: theme.colors.primary },
        }}
      />
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: auth.currentUser?.uid,
          avatar: "https://www.bootdey.com/img/Content/avatar/avatar4.png",
        }}
        messagesContainerStyle={{ backgroundColor: theme.colors.background }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: theme.colors.text,
                },
                left: {
                  color: "#24204F",
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: theme.colors.primary,
                },
                right: {
                  backgroundColor: "#3A13C3",
                },
              }}
            />
          );
        }}
      />
    </>
  );
};

export default Messages;
