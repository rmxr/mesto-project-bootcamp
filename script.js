const buttonEdit = document.querySelector(".profile__edit-button");
const buttonClose = document.querySelectorAll(".popup__close-button");
const popupEdit = document.querySelector(".popup_function_edit");
const popupAdd = document.querySelector(".popup_function_add-card");
const popupView = document.querySelector(".popup_function_view-image");
const buttonAddCard = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const elementEditForm = document.querySelector(".popup__form_function_edit");
const elementAddForm = document.querySelector(".popup__form_function_add-card");
const inputName = elementEditForm.querySelector(".popup__form-item_profile-name");
const inputDescription = elementEditForm.querySelector(".popup__form-item_profile-description");
const inputCardName = elementAddForm.querySelector(".popup__form-item_card-name");
const inputCardSrc = elementAddForm.querySelector(".popup__form-item_card-source");
const cardTemplate = document.querySelector("#cards__template").content;
const cardsContainer = document.querySelector(".cards__container");
const popupViewSrc = popupView.querySelector(".popup__image");
const popupViewCaption = popupView.querySelector(".popup__image-caption");
const popupOverlays = Array.from(document.querySelectorAll('.popup'));
const popupContainers = Array.prototype.concat(Array.from(document.querySelectorAll(".popup__container")), document.querySelector(".popup__image-container"));

// Симуляция инпута
function simulateInput(target) {
  target.dispatchEvent(new Event('input', {bubbles:true}));
};

// Открытие попапа
function openPopup(target) {
  target.classList.add("popup_opened");
};

// Закрытие попапа
function closePopup(event) {
  event.target.closest(".popup").classList.remove("popup_opened");
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
  simulateInput(inputName);
  simulateInput(inputDescription);
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

// Тестовая работа над валидацией
const formElement = document.querySelector('.popup__form');

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__form-item_type_error');
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__form-item_type_error');
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__form-item"));
  const buttonElement = formElement.querySelector(".popup__save-button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    })
  })
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement)
  });
};

const hasInvalidInput = (inputList) =>{
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__save-button_type_inactive");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("popup__save-button_type_inactive");
    buttonElement.disabled = false;
  }
};

enableValidation();


// Конец валидации

buttonEdit.addEventListener("click", openEditPopup);
elementEditForm.addEventListener("submit", handleFormSubmit);
elementAddForm.addEventListener("submit", handleAddCard);
buttonClose.forEach(button => {
  button.addEventListener("click", closePopup)
});
buttonAddCard.addEventListener("click", () => openPopup(popupAdd));
populateCards(initialCards);

popupContainers.forEach(container => {
  container.addEventListener("click", (e) => e.stopPropagation())
});
popupOverlays.forEach(overlay => {
  overlay.addEventListener("click", closePopup);
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector(".popup_opened");
    openedPopup.classList.remove("popup_opened");
  }
})
