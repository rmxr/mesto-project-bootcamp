import { like, deleteCard } from "./util.js";
import { cardsContainer, inputCardSrc, inputCardName, cardTemplate, userID } from "./constants.js";
import { openPopupView, closePopup } from "./modal.js";
import { getInitialCards, sendNewCard } from "./api.js";

// Первичное заполнение страницы карточками из массива
export function initializeCards() {
  cardsContainer.innerHTML = "";
  getInitialCards().then(data => {
    data.forEach(element => {
      addCard(element.link, element.name, element.likes, element.owner["_id"], element["_id"]);
    })
  });
};

// Добавление сгенерированной карточки в контейнер
export function addCard(imageSrc, imageTitle, likes, cardOwnerID, cardID) {
  const card = generateCard(imageSrc, imageTitle, likes, cardOwnerID, cardID);
  cardsContainer.append(card);
}

// Генерация карточки
function generateCard(imageSrc, imageTitle, likes, cardOwnerID, cardID) {
  const cardElement = cardTemplate.querySelector(".cards__item").cloneNode(true);
  const likeButton = cardElement.querySelector(".cards__like-button");
  const deleteButton = cardElement.querySelector(".cards__delete-button");
  const clickableImage = cardElement.querySelector(".cards__image");
  const likesCounter = cardElement.querySelector(".cards__like-counter");
  const isLiked = checkIfLiked(likes);
  clickableImage.src = `${imageSrc}`;
  clickableImage.alt = `${imageTitle}`;
  likesCounter.textContent = likes.length;
  console.log(isLiked);
  cardElement.querySelector(".cards__title").textContent = `${imageTitle}`;
  likeButton.addEventListener("click", () => like(isLiked, cardID));
  clickableImage.addEventListener("click", () => openPopupView(imageSrc, imageTitle));
  if (isLiked) {likeButton.classList.add("cards__like-button_active")};
  if (cardOwnerID !== userID) {deleteButton.remove()};
  if (cardOwnerID === userID) {deleteButton.addEventListener("click", () => deleteCard(cardID))}
  return cardElement;
};

// Обработчик добавления карточки юзером
export function handleAddCard(e) {
  e.preventDefault();
  sendNewCard(inputCardName.value, inputCardSrc.value)
    .then(() => {
      initializeCards();
      closePopup(e.target);
      e.target.reset();
    })
};

// Проверка на лайкнутость
function checkIfLiked(likes){
  return likes.some(user => user["_id"] === userID)
};




