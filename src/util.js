import { getUserInfo, sendLike } from "./api.js";
import { profileAvatar, profileDescription, profileName, setUserID, cardsList, popupConfirmDeletion, elementConfirmationForm, setCardForDeletion } from "./constants.js";
import { initializeCards } from "./card.js";
import { openPopup, handleConfirmCardDeletion } from "./modal.js";


// Надпись "Сохранить..." во время ожидания ответа сервера

export function renderLoading(isLoading, button, origText){
  if (isLoading){
    button.textContent = "Сохранение...";
  } else {
    button.textContent = origText;
  }
};

// Обработчик лайков
export function like(cardID, likeButton, likesCounter) {
  sendLike(cardsList[`${cardID}`], cardID)
    .then(data => {
      likesCounter.textContent = data.likes.length;
      likeButton.classList.toggle("cards__like-button_active");
      cardsList[`${cardID}`] = !cardsList[`${cardID}`];
    });
};

// Удаление карточки
export function deleteCard(cardID) {
  // requestCardDeletion(cardID).then(() => initializeCards());
  setCardForDeletion(cardID);
  elementConfirmationForm.addEventListener("submit", handleConfirmCardDeletion)
  openPopup(popupConfirmDeletion);
  // DeletePromise
  // .then(() => console.log("Удалил через промис"))
  // .catch(() => console.log("Отменил удаление"));
};


// Отрисовка информации пользователя

export function renderUserInfo(data) {
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
  profileAvatar.style.backgroundImage = `url(${data.avatar})`;
};


// Первичная отрисовка информации пользователя

export function initializePageContent() {
  getUserInfo()
    .then((data) => {
      renderUserInfo(data);
      setUserID(data["_id"]);
      initializeCards();
    })
    .catch((err) => {
      console.log(err);
    });
};


