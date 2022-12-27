// Первичное заполнение страницы карточками из массива
export function populateCards(cardsArray, cardTemplate, like, deleteCard, cardsContainer, openPopupView) {
  cardsArray.forEach(element => {
    addCard(element.link, element.name, cardTemplate, like, deleteCard, cardsContainer, openPopupView);
  })
};

// Добавление сгенерированной карточки в контейнер
export function addCard(imageSrc, imageTitle, cardTemplate, like, deleteCard, cardsContainer, openPopupView) {
  const card = generateCard(imageSrc, imageTitle, cardTemplate, like, deleteCard, openPopupView);
  cardsContainer.prepend(card);
}

// Генерация карточки
function generateCard(imageSrc, imageTitle, cardTemplate, like, deleteCard, openPopupView) {
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




