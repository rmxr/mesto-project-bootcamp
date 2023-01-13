import { renderLoading } from "./util.js";
import { cardsContainer, inputCardSrc, inputCardName, cardTemplate, userID, cardsList, setCardForDeletion, elementConfirmationForm, popupConfirmDeletion } from "./constants.js";
import { openPopupView, closePopup, openPopup, handleConfirmCardDeletion } from "./modal.js";
import { sendLike, sendNewCard } from "./api.js";

// Первичное заполнение страницы карточками из массива
// export function initializeCards() {
//   cardsContainer.innerHTML = "";
//   getInitialCards()
//   .then(data => {
//     data.reverse();
//     data.forEach(element => {
//       addCard(element);
//     })
//   })
//   .catch((err) => console.log(err))
// };

export function initializeCards(data) {
  data.reverse();
  data.forEach(addCard)
};

// Добавление сгенерированной карточки в контейнер
export function addCard(data) {
  const card = generateCard(data);
  cardsContainer.prepend(card);
}

// Генерация карточки
// generateCard (imageSrc,     imageTitle,      likes,      cardOwnerID,           cardID)
// addCard      (element.link, element.name, element.likes, element.owner["_id"], element["_id"]);

function generateCard(data) {
  const cardElement = cardTemplate.querySelector(".cards__item").cloneNode(true);
  const likeButton = cardElement.querySelector(".cards__like-button");
  const deleteButton = cardElement.querySelector(".cards__delete-button");
  const clickableImage = cardElement.querySelector(".cards__image");
  const likesCounter = cardElement.querySelector(".cards__like-counter");
  const isLiked = checkIfLiked(data.likes);
  clickableImage.src = `${data.link}`;
  clickableImage.alt = `${data.name}`;
  likesCounter.textContent = data.likes.length;
  cardElement.querySelector(".cards__title").textContent = `${data.name}`;
  likeButton.addEventListener("click", () => like(data["_id"], likeButton, likesCounter));
  clickableImage.addEventListener("click", () => openPopupView(data.link, data.name));
  if (isLiked) {likeButton.classList.add("cards__like-button_active")};
  if (data.owner["_id"] !== userID) {deleteButton.remove()};
  if (data.owner["_id"] === userID) {deleteButton.addEventListener("click", () => deleteCard(data["_id"], cardElement))}
  cardsList[`${data["_id"]}`] = isLiked;
  return cardElement;
};

// Обработчик добавления карточки юзером
export function handleAddCard(e) {
  e.preventDefault();
  // const button = e.currentTarget.querySelector(".popup__save-button");
  const button = e.submitter;
  renderLoading(true, button);
  sendNewCard(inputCardName.value, inputCardSrc.value)
    .then((data) => {
      addCard(data);
      closePopup(e.target);
      renderLoading(false, button, "Создать")
      e.target.reset();
    })
    .catch((err) => {
      console.log(err);
   })
};

// Проверка на лайкнутость
function checkIfLiked(likes){
  return likes.some(user => user["_id"] === userID)
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
  setCardForDeletion(cardID, card);
  elementConfirmationForm.addEventListener("submit", handleConfirmCardDeletion)
  openPopup(popupConfirmDeletion);
};




