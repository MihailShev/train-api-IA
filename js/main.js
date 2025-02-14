import {
  requesr,
  answer,
  talkMessage,
  copyToText,
} from "./exports-functions.js";

const scriptTag = document.getElementById("config");
const API_KEY = scriptTag.dataset.apiKey;
const API_URL = scriptTag.dataset.apiUrl;
const chat = document.querySelector(".message-container");
const inp = document.querySelector(".js-user-message-inp");
const divElBtnForm = document.querySelector(".inner-form-svg");
const sendBtn = document.querySelector(".js-user-send-btn");

// Value Prompt
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
      chat.insertAdjacentHTML("beforeend", requesr(userMessageInput));
      chat.scrollTop = chat.scrollHeight;
      sendMessageToChatGPT(userMessageInput);
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
chat.addEventListener("click", talkCopyEvent);

// Setting Spech Lang
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const speechRecognizer = new SpeechRecognition();
speechRecognizer.interimResults = false;
// Lang Set It Up For Yourself
speechRecognizer.lang = "ru";

// Start Talk
const startSpeechRecognition = () => speechRecognizer.start();

// Add Chat Message Talk
speechRecognizer.onresult = (e) => {
  const recognizedText = e.results[0][0].transcript;
  chat.insertAdjacentHTML("beforeend", requesr(recognizedText));
  chat.scrollTop = chat.scrollHeight;
  sendMessageToChatGPT(recognizedText);
};

// Request API
const sendMessageToChatGPT = async (userMessage) => {
  try {
    const res = await axios.post(
      `${API_URL}`,
      {
        model: "mistralai/Mistral-7B-Instruct-v0.1",
        messages: [{ role: "user", content: userMessage }],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    chat.insertAdjacentHTML(
      "beforeend",
      answer(res.data.choices[0].message.content)
    );
    chat.scrollTop = chat.scrollHeight;

    return;
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
};
