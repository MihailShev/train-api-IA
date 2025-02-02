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
  console.log(e);
  const recognizedText = e.results[0][0].transcript;
  console.log(recognizedText);
  chat.insertAdjacentHTML("beforeend", requesr("user", recognizedText));
};

const apiKey = "";

//

const sendMessageToChatGPT = async (userMessage) => {
  try {
    const res = await axios.post(
      "https://api.deepinfra.com/v1/openai/chat/completions",
      {
        model: "mistralai/Mistral-7B-Instruct-v0.1",
        messages: [{ role: "user", content: userMessage }],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res.data.choices[0].message.content);
  } catch (error) {
    console.error(
      "Ошибка запроса:",
      error.response ? error.response.data : error.message
    );
  }
};

sendMessageToChatGPT("Расскажи про себя одним предложением.");
