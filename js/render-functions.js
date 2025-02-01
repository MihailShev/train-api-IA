const getTime = () => {
  const now = new Date();
  return `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
};

export const answerIA = (talk) =>
  `
       <div class="message-ia">
          <b>IA</b>

          <p>
          ${talk}
          </p>

          <div class="inner-message-svg">
            <svg class="" width="15" height="15">
              <use href="/src/img/icons.svg#icon-paste"></use>
            </svg>

            <svg class="" width="15" height="15">
              <use href="/src/img/icons.svg#icon-volume"></use>
            </svg>
          </div>

          <tt class="time-ia">${getTime()}</tt>
        </div>
`;

export const requestUser = (talk) =>
  `
       <div class="message-user">
          <b>User</b>

          <p>
          ${talk}
          </p>

          <div class="inner-message-svg">
            <svg class="" width="15" height="15">
              <use href="/src/img/icons.svg#icon-paste"></use>
            </svg>

            <svg class="" width="15" height="15">
              <use href="/src/img/icons.svg#icon-volume"></use>
            </svg>
          </div>

          <tt class="time-ia">${getTime()}</tt>
        </div>
`;
