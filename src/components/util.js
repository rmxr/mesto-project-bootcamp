import { getInitialCards, getUserInfo, sendLike } from "./api.js";
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
    })
    .catch(err => console.log(err));
};

// Удаление карточки
export function deleteCard(cardID, card) {
  setCardForDeletion(cardID);
  elementConfirmationForm.addEventListener("submit", (evt) => handleConfirmCardDeletion(evt, card))
  openPopup(popupConfirmDeletion);
};


// Отрисовка информации пользователя

export function renderUserInfo(data) {
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
  profileAvatar.style.backgroundImage = `url(${data.avatar})`;
};


// Первичная отрисовка информации пользователя

export function initializePageContent() {
  Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    renderUserInfo(userData);
    setUserID(userData["_id"]);
    initializeCards(cards);
  })
  .catch(err => console.log(err))
}


