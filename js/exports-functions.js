const getTime = () => {
  const now = new Date();
  return `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
};

export const answer = (role, text) =>
  `
       <div class="message-${role}">
          <b>${role}</b>

          <p>
          ${text}
          </p>

         <div class="inner-message-svg-${role}">
            <button class="btn-copy" type="button">
              <svg class="" width="15" height="15">
                <use href="./icons.svg#icon-paste"></use>
              </svg>
            </button>

            <button class="btn-speech" type="button">
              <svg class="" width="15" height="15">
                <use href="./icons.svg#icon-volume"></use>
              </svg>
            </button>

          <tt class="time-${role}">${getTime()}</tt>
        </div>
`;

export const talkUserMessage = (text) => {
  const textToTalk = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(textToTalk);
};
