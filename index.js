import { initialCards } from "./data.js";
import { enableValidation } from "./validate.js";
import { buttonEdit, buttonClose, popupEdit, popupAdd, popupView, buttonAddCard, profileName, profileDescription, elementEditForm, elementAddForm, inputName, inputDescription, inputCardName, inputCardSrc, cardTemplate, cardsContainer, popupViewSrc, popupViewCaption, popupOverlays, popupContainers, validationConfig } from "./constants.js";
import { addCard,populateCards } from "./card.js";

// Симуляция инпута
function simulateInput(target) {
  target.dispatchEvent(new Event('input', {bubbles:true}));
};

// Открытие попапа
function openPopup(target) {
  target.classList.add("popup_opened");
  document.addEventListener('keydown', function escapeHandler(evt) {
    if (evt.key === "Escape") {
      target.classList.remove("popup_opened");
      document.removeEventListener("keydown", escapeHandler);
    }
  });
};

// Закрытие попапа
function closePopup(event) {
  event.target.closest(".popup").classList.remove("popup_opened");
}



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
populateCards(initialCards, cardTemplate, like, deleteCard, cardsContainer, openPopupView);

popupContainers.forEach(container => {
  container.addEventListener("click", (e) => e.stopPropagation())
});
popupOverlays.forEach(overlay => {
  overlay.addEventListener("click", closePopup);
});
enableValidation(validationConfig);

// Обработчик добавления карточки юзером
function handleAddCard(e, cardsContainer) {
  console.log("index" + cardsContainer)
  e.preventDefault();
  addCard(inputCardSrc.value, inputCardName.value, cardTemplate, cardsContainer);
  closePopup(e);
  inputCardName.value = "";
  inputCardSrc.value = "";
}
