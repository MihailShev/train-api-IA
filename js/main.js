import {
  requesr,
  answer,
  talkMessage,
  copyToText,
} from "./exports-functions.js";

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

// Inp Value And "btn:disabled"
const buttonState = () => (sendBtn.disabled = inp.value.trim() === "");
inp.addEventListener("input", () => {
  userMessageInput = inp.value.trim();
  buttonState();
  return userMessageInput;
});

// Btn Send And Talk
const handlerBtnSendTalk = (e) => {
  e.preventDefault();

  const btn = e.target.closest("button");
  if (!btn) return;

  // Btn Send
  if (btn.classList.contains("js-user-send-btn")) {
    if (userMessageInput !== "") {
      chat.insertAdjacentHTML("beforeend", requesr("user", userMessageInput));
      inp.value = "";
      userMessageInput = "";
      buttonState();
    }
  }

  // Btn Talk
  if (btn.classList.contains("js-user-talt-btn")) {
    startSpeechRecognition();
  }
};
divElBtnForm.addEventListener("click", handlerBtnSendTalk);

// Btn Chat "Cpoy" And "Speech"
const talkCopyEvent = (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const messageElement = btn
    .closest(".message-ai")
    ?.querySelector(".message-text");
  if (!messageElement) return;

  const messageText = messageElement.textContent.trim();

  // Btn Speech
  if (btn.classList.contains("btn-speech")) {
    talkMessage(messageText);
  }

  // Btn Copy
  if (btn.classList.contains("btn-copy")) {
    copyToText(messageText);
  }
};
divElBtnChat.addEventListener("click", talkCopyEvent);

// Setting Spech Lang
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const speechRecognizer = new SpeechRecognition();

// Lang
speechRecognizer.lang = "ru";
speechRecognizer.interimResults = false;

const startSpeechRecognition = () => {
  speechRecognizer.start();
};

speechRecognizer.onresult = (e) => {
  const recognizedText = e.results[0][0].transcript;
  console.log(recognizedText);
  chat.insertAdjacentHTML("beforeend", requesr("user", recognizedText));
};

// const apiUrl = "https://api.openai.com/v1/chat/completions";
// const apiKey =
//   "";

// // Функция для отправки запроса
// const sendMessageToChatGPT = async (userMessage) => {
//   try {
//     const response = await axios.post(
//       apiUrl,
//       {
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: userMessage }],
//         temperature: 0.7,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${apiKey}`,
//         },
//       }
//     );

//     console.log(response);
//     const botMessage = response.data.choices[0].message.content;
//     console.log("ChatGPT:", botMessage);
//     return botMessage;
//   } catch (error) {
//     console.error("Ошибка при запросе к OpenAI:", error.message);
//   }
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
//         answer(data.choices[0].message.content)
//       );
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// talkBtn.addEventListener("click", speechUserMessage);
