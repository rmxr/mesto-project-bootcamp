import { getUserInfo } from "./api.js";
import { profileAvatar, profileDescription, profileName } from "./constants.js";

// Обработчик лайков
export function like(e) {
  e.currentTarget.classList.toggle("cards__like-button_active");
};

// Удаление карточки
export function deleteCard(e) {
  e.currentTarget.closest(".cards__item").remove();
};

// Отрисовка информации пользователя

export function renderUserInfo(data) {
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
  profileAvatar.style.backgroundImage = `url(${data.avatar})`;
};


// Первичная отрисовка информации пользователя

export function initializeUserInfo() {
  getUserInfo()
    .then((data) => renderUserInfo(data))
    .catch((err) => {
      console.log(err);
    });
};


