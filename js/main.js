import { answerIA, requestUser } from "./render-functions.js";

const chat = document.querySelector(".chat-container");
const form = document.querySelector(".user-form");
const talkBtn = document.querySelector(".js-user-talt-btn");
const sendBtn = document.querySelector(".js-user-send-btn");

chat.insertAdjacentHTML("beforeend", requestUser("Hello"));
chat.insertAdjacentHTML("beforeend", answerIA("Hello"));

chat.insertAdjacentHTML("beforeend", requestUser("Hello"));
chat.insertAdjacentHTML("beforeend", answerIA("Hello"));

chat.insertAdjacentHTML("beforeend", requestUser("Hello"));
chat.insertAdjacentHTML("beforeend", answerIA("Hello"));
// talk
const talkUserMessage = () => {};

talkBtn.addEventListener("click", talkUserMessage);
