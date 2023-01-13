import { profileAvatar, profileDescription, profileName } from "./constants.js";


// Надпись "Сохранить..." во время ожидания ответа сервера

export function renderLoading(isLoading, button, origText="Сохранить"){
  if (isLoading){
    button.textContent = "Сохранение...";
  } else {
    button.textContent = origText;
  }
};

// Отрисовка информации пользователя

export function renderUserInfo(data) {
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
  profileAvatar.style.backgroundImage = `url(${data.avatar})`;
};


