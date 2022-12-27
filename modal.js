import { inputName, profileName, inputDescription, profileDescription, popupViewSrc, popupEdit, popupViewCaption, popupView } from "./constants.js";

// Открытие попапа
export function openPopup(target) {
  target.classList.add("popup_opened");
  document.addEventListener('keydown', function escapeHandler(evt) {
    if (evt.key === "Escape") {
      target.classList.remove("popup_opened");
      document.removeEventListener("keydown", escapeHandler);
    }
  });
};

// Закрытие попапа
export function closePopup(event) {
  event.target.closest(".popup").classList.remove("popup_opened");
};

// Открытие изображения на весь экран
export function openPopupView(imageSrc, imageTitle) {
popupViewSrc.src = imageSrc;
popupViewCaption.textContent = imageTitle;
openPopup(popupView);
};

// Симуляция инпута
function simulateInput(target) {
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

// Обработчик кнопки "Сохранить" редактора профиля
export function handleFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = `${inputName.value}`;
  profileDescription.textContent = `${inputDescription.value}`;
  closePopup(e);
}
