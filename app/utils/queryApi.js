import openai from "../hook/chatgpt";
import { sendMessage } from "./firebaseUtils";
import { auth } from "../hook/firebase";

const query = async (_id, prompt) => {

  const response = await openai
    .createCompletion({
      model: "text-davinci-003",
      prompt: `You are a bot named Heisenber for an app named HobbyHive where people can create posts to find other people with similar interests and meetup. The app has the following Screens: Search Screen where people can search for posts, The post screen were people can create a new post. A MyPosts screen were people can see, edit, delete theyr posts and also see the post they are subscribed for, a Messenger screen where the user can message other users and Profile Screen where each user can see theyr profile and edit it. Your job is too answear just app related questions or give advice in sports direction. If someone ask for your name make a Breaking bad reference or joke. This is you question: ${prompt}.`,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
    })
    .then((response) => response.data.choices[0].text)
    .catch((err) => `ChatGpt was unable to find an answer for that! (Error: ${err.message})`);

    console.log(response)
    sendMessage({
        _id: `${_id}1`,
        fullName: "data.fullName",
        timestamp: Date.now(),
        message: response,
        from: "GPT",
        to: auth.currentUser?.uid,
      });
    return response
};

export default query;