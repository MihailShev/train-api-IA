// Now Time
const getTime = () => {
  const now = new Date();
  return `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
};

// Requesr user
export const requesr = (text) =>
  `
       <div class="message-user">
          <b>User</b>

          <p class="message-text">
          ${text}
          </p>

          <tt class="time-user">${getTime()}</tt>
        </div>
`;

// Answer AI
export const answer = (text) =>
  `
       <div class="message-ai">
          <b>AI</b>

          <p class="message-text">
          ${text}
          </p>

          <div class="inner-message-svg">
            <button class="btn-copy" type="button">
              <svg class="" width="15" height="15">
                <use href="./icons.svg#icon-copy"></use>
              </svg>
            </button>

            <button class="btn-speech" type="button">
              <svg class="" width="15" height="15">
                <use href="./icons.svg#icon-volume"></use>
              </svg>
            </button>

          <tt class="time-ai">${getTime()}</tt>
        </div>
`;
// Talk Messages
export const talkMessage = (text) => {
  const textToTalk = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(textToTalk);
};

// Copy Text Messages
export const copyToText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.log(err);
  }
};
