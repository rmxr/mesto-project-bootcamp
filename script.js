const buttonEdit = document.querySelector(".profile__edit-button");
const buttonClose = document.querySelectorAll(".popup__close-button");
const popupEdit = document.querySelector(".profile-edit");
const popupAdd = document.querySelector(".add-card");
const popupView = document.querySelector(".view-image");
const buttonAddCard = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const elementEditForm = document.querySelector(".profile-edit__form");
const elementAddForm = document.querySelector(".add-card__form");
const inputName = elementEditForm.querySelector(".profile-edit__form-item_name");
const inputDescription = elementEditForm.querySelector(".profile-edit__form-item_description");
const inputCardName = elementAddForm.querySelector(".add-card__form-item_name");
const inputCardSrc = elementAddForm.querySelector(".add-card__form-item_source");
const cardTemplate = document.querySelector("#cards__template").content;
const cardsContainer = document.querySelector(".cards__container");
const popupViewSrc = popupView.querySelector(".view-image__image");
const popupViewCaption = popupView.querySelector(".view-image__caption");

// Открытие попапа
function openPopup(target) {
  target.classList.add("popup_opened");
};

// Закрытие попапа
function closePopup(event) {
  event.currentTarget.closest(".popup").classList.remove("popup_opened");
}

// Генерация карточки
function generateCard(imageSrc, imageTitle) {
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

// Добавление сгенерированной карточки в контейнер
function addCard(imageSrc, imageTitle) {
  const card = generateCard(imageSrc, imageTitle);
  cardsContainer.prepend(card);
}

// Первичное заполнение страницы карточками из массива
function populateCards(cardsArray) {
  cardsArray.forEach(element => {
    addCard(element.link, element.name);
  })
};

// Открытие изображения на весь экран
function openPopupView(imageSrc, imageTitle) {
popupViewSrc.src = imageSrc;
popupViewCaption.textContent = imageTitle;
openPopup(popupView);
}

// Открытие попапа редактирования профиля
function openEditPopup() {
  inputName.value = `${profileName.textContent}`;
  inputDescription.value = `${profileDescription.textContent}`;
  openPopup(popupEdit);
};

// Обработчик кнопки "Сохранить" редактора профиля
function handleFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = `${inputName.value}`;
  profileDescription.textContent = `${inputDescription.value}`;
  closePopup(e);
}

// Обработчик добавления карточки юзером
function handleAddCard(e) {
  e.preventDefault();
  addCard(inputCardSrc.value, inputCardName.value);
  closePopup(e);
  inputCardName.value = "";
  inputCardSrc.value = "";
}

// Обработчик лайков
function like(e) {
  e.currentTarget.classList.toggle("cards__like-button_active");
}

// Удаление карточки
function deleteCard(e) {
  e.currentTarget.closest(".cards__item").remove();
}

buttonEdit.addEventListener("click", openEditPopup);
elementEditForm.addEventListener("submit", handleFormSubmit);
elementAddForm.addEventListener("submit", handleAddCard);
buttonClose.forEach(button => {
  button.addEventListener("click", closePopup)
});
buttonAddCard.addEventListener("click", () => openPopup(popupAdd));
populateCards(initialCards);
