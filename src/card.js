import { like, deleteCard } from "./util.js";
import { cardsContainer, inputCardSrc, inputCardName, cardTemplate } from "./constants.js";
import { openPopupView, closePopup } from "./modal.js";

// Первичное заполнение страницы карточками из массива
export function populateCards(cardsArray, cardTemplate) {
  cardsArray.forEach(element => {
    addCard(element.link, element.name, cardTemplate);
  })
};

// Добавление сгенерированной карточки в контейнер
export function addCard(imageSrc, imageTitle, cardTemplate) {
  const card = generateCard(imageSrc, imageTitle, cardTemplate);
  cardsContainer.prepend(card);
}

// Генерация карточки
function generateCard(imageSrc, imageTitle, cardTemplate) {
  const cardElement = cardTemplate.querySelector(".cards__item").cloneNode(true);
  const likeButton = cardElement.querySelector(".cards__like-button");
  const deleteButton = cardElement.querySelector(".cards__delete-button");
  const clickableImage = cardElement.querySelector(".cards__image");
  cardElement.querySelector(".cards__image").src = `${imageSrc}`;
  cardElement.querySelector(".cards__image").alt = `${imageTitle}`;
  cardElement.querySelector(".cards__title").textContent = `${imageTitle}`;
  likeButton.addEventListener("click", like);
  deleteButton.addEventListener("click", deleteCard);
  clickableImage.addEventListener("click", () => openPopupView(imageSrc, imageTitle));
  return cardElement;
};

// Обработчик добавления карточки юзером
export function handleAddCard(e) {
  e.preventDefault();
  addCard(inputCardSrc.value, inputCardName.value, cardTemplate);
  closePopup(e);
  inputCardName.value = "";
  inputCardSrc.value = "";
};




