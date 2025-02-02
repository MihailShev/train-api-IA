import {
  requesr,
  answer,
  talkUserMessage,
  copyToText,
} from "./exports-functions.js";

const apiKey = "";
const chat = document.querySelector(".chat-container");
const inp = document.querySelector(".js-user-message-inp");
const divElBtnForm = document.querySelector(".inner-form-svg");
const divElBtnChat = document.querySelector(".inner-message-svg");
const talkBtn = document.querySelector(".js-user-talt-btn");
const sendBtn = document.querySelector(".js-user-send-btn");
const spechBtn = document.querySelector(".btn-speech");
const copyBtn = document.querySelector(".btn-copy");
const messageText = document.querySelector(".message-text");

let userMessageInput = "";

const buttonState = (e) => {
  sendBtn.disabled = inp.value.trim() === "";
  userMessageInput = inp.value.trim();
  return userMessageInput;
};
inp.addEventListener("input", buttonState);

const consoless = (e) => {
  e.preventDefault();

  const btn = e.target.closest("button");

  if (btn) {
    if (btn.classList.contains("js-user-send-btn")) {
      inp.value = "";
      chat.insertAdjacentHTML("beforeend", requesr("user", userMessageInput));

      userMessageInput = "";
      sendBtn.disabled = inp.value.trim() === "";
    }

    if (btn.classList.contains("js-user-talt-btn")) {
      console.log("Talk button clicked");
    }
  }
};
divElBtnForm.addEventListener("click", consoless);

const talkCopyEvent = (e) => {
  const btn = e.target.closest("button");
  if (btn) {
    if (btn.classList.contains("btn-speech")) {
      const spechengText = messageText.textContent;
      talkUserMessage(spechengText);
    }

    if (btn.classList.contains("btn-copy")) {
      const copysText = messageText.textContent;
      copyToText(copysText);
    }
  }
};
divElBtnChat.addEventListener("click", talkCopyEvent);

// const copyToClipboard = async (text) => {
//   try {
//     await navigator.clipboard.writeText(text);
//     console.log("Text copy!");
//   } catch (err) {
//     console.error(err);
//   }
// };

// logic btn voice
// const speechRecognizer = new webkitSpeechRecognition();
// const speechSynthesis = window.speechSynthesis;

// const speechUserMessage = () => {
//   speechRecognizer.start();
// };

// speechRecognizer.onresult = (e) => {
//   requestUser(e.results[0][0].transcript);
//   postRequest();
// };

// let request = axios.create({
//   headers: {
//     Authorization: `Bearer ${apiKey}`,
//   },
// });

// const postRequest = () => {
//   const messages = { role: "user", content: "Hello!" };

//   const params = {
//     model: "gpt-3.5-turbo",
//     messages: messages,
//   };
//   request
//     .post("https://api.openai.com/v1/chat/completions", params)
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error(res.status);
//       }
//       return res;
//     })
//     .then((data) => {
//       console.log(data.choices[0].message.content);
//       chat.insertAdjacentHTML(
//         "beforeend",
//         answerIA(data.choices[0].message.content)
//       );
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// talkBtn.addEventListener("click", speechUserMessage);
