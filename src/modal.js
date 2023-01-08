import { inputName, profileName, inputDescription, profileDescription, popupViewSrc, popupEdit, popupViewCaption, popupView, elementsAddFormInputs, inputAvatarSrc } from "./constants.js";
import { sendAvatar, sendUserInfo } from "./api.js";
import { renderUserInfo } from "./util.js";


// Открытие попапа
export function openPopup(target) {
  target.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
};

// Закрытие попапа
export function closePopup(popup) {
  popup.closest(".popup").classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
};

// Закрытие эксейпом
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

// Открытие изображения на весь экран
export function openPopupView(imageSrc, imageTitle) {
popupViewSrc.src = imageSrc;
popupViewSrc.alt = imageTitle;
popupViewCaption.textContent = imageTitle;
openPopup(popupView);
};

// Симуляция инпута
export function simulateInput(target) {
  target.dispatchEvent(new Event('input', {bubbles:true}));
};

// Открытие попапа редактирования профиля
export function openEditPopup() {
  inputName.value = `${profileName.textContent}`;
  inputDescription.value = `${profileDescription.textContent}`;
  simulateInput(inputName);
  simulateInput(inputDescription);
  openPopup(popupEdit);
};

// Открытие попапа добавления карточки
export function openAddPopup(popupAdd) {
  elementsAddFormInputs.forEach((input) => simulateInput(input));
  openPopup(popupAdd);
}


// Обработчик кнопки "Сохранить" редактора профиля
export function handleFormSubmit(e) {
  e.preventDefault();
  sendUserInfo(`${inputName.value}`, `${inputDescription.value}`)
    .then((data) => renderUserInfo(data))
    .catch((err) => {
      console.log(err);
   });
  closePopup(e.target);
}

// Обработчик кнопки "Сохранить" формы смены аватара
export function handleChangeAvatar(e) {
  e.preventDefault();
  sendAvatar(`${inputAvatarSrc.value}`)
  .then((data) => renderUserInfo(data))
  .catch((err) => {
    console.log(err);
 });
  closePopup(e.target);
  e.target.reset();
};

// Обработчик подтверждения удаления карточки
export function handleConfirmCardDeletion(e) {
  e.preventDefault();
  console.log("Удалено!");
  closePopup(e.target);
}
