const translations = {
  en: {
    title: "Welcome to my practice page!",
    link: "Communicat IA",
  },

  ua: {
    title: "Ласкаво прошу до мого сайту!",
    link: "Розмова з ШИ",
  },

  pr: {
    title: "Bem-vindo ao meu site!",
    link: "Conversa com IA",
  },
};

const languageSwitcher = document.querySelector(".js-language-switcher");

function changeLanguage(lang) {
  document.querySelectorAll("[data-translate]").forEach((el) => {
    const key = el.getAttribute("data-translate");
    el.textContent = translations[lang][key];
  });

  localStorage.setItem("selectedLanguage", lang);
}

const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
languageSwitcher.value = savedLanguage;
changeLanguage(savedLanguage);

languageSwitcher.addEventListener("change", (e) => {
  changeLanguage(e.target.value);
});
