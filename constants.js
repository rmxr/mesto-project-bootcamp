export const buttonEdit = document.querySelector(".profile__edit-button");
export const buttonClose = document.querySelectorAll(".popup__close-button");
export const popupEdit = document.querySelector(".popup_function_edit");
export const popupAdd = document.querySelector(".popup_function_add-card");
export const popupView = document.querySelector(".popup_function_view-image");
export const buttonAddCard = document.querySelector(".profile__add-button");
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(".profile__description");
export const elementEditForm = document.querySelector(".popup__form_function_edit");
export const elementAddForm = document.querySelector(".popup__form_function_add-card");
export const inputName = elementEditForm.querySelector(".popup__form-item_profile-name");
export const inputDescription = elementEditForm.querySelector(".popup__form-item_profile-description");
export const inputCardName = elementAddForm.querySelector(".popup__form-item_card-name");
export const inputCardSrc = elementAddForm.querySelector(".popup__form-item_card-source");
export const cardTemplate = document.querySelector("#cards__template").content;
export const cardsContainer = document.querySelector(".cards__container");
export const popupViewSrc = popupView.querySelector(".popup__image");
export const popupViewCaption = popupView.querySelector(".popup__image-caption");
export const popupOverlays = Array.from(document.querySelectorAll('.popup'));

const imageContainer = document.querySelector(".popup__image-container");
export const popupContainers = Array.from(document.querySelectorAll(".popup__container")).concat(imageContainer);

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_type_inactive',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__input-error_visible',
};
