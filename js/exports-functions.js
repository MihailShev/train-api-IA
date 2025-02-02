const getTime = () => {
  const now = new Date();
  return `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
};

export const requesr = (role, text) =>
  `
       <div class="message-${role}">
          <b>${role}</b>

          <p class="message-text">
          ${text}
          </p>

          <tt class="time-${role}">${getTime()}</tt>
        </div>
`;

export const answer = (text) =>
  `
       <div class="message-ai">
          <b>ai</b>

          <p class="message-text">
          ${text}
          </p>

          <tt class="time-ai">${getTime()}</tt>
        </div>
`;

export const talkMessage = (text) => {
  const textToTalk = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(textToTalk);
};

export const copyToText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.log(err);
  }
};
