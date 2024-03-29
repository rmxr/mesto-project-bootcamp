export const buttonEdit = document.querySelector(".profile__edit-button");
export const popups = document.querySelectorAll('.popup');
export const closingButtons = document.querySelectorAll(".popup__close-button");
export const popupEdit = document.querySelector(".popup_function_edit");
export const popupAdd = document.querySelector(".popup_function_add-card");
export const popupView = document.querySelector(".popup_function_view-image");
export const popupChangeAvatar = document.querySelector(".popup_function_avatar-change");
export const popupConfirmDeletion = document.querySelector(".popup_function_card-delete-confirm");
export const buttonAddCard = document.querySelector(".profile__add-button");
export const profileAvatar = document.querySelector(".profile__avatar");
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(".profile__description");
export let userID = "";
export const setUserID = (val) => {userID = val};
export const cardsList = {};
export const cardForDeletion = {};
export const setCardForDeletion = (cardId, card) => {cardForDeletion.cardId=cardId; cardForDeletion.card=card};
export const elementEditForm = document.forms["edit-profile"];
export const elementAddForm = document.forms["add-card"];
export const elementAvatarEditForm = document.forms["change-avatar"];
export const elementConfirmationForm = document.forms["card-delete-confirm"];
export const elementsAddFormInputs = elementAddForm.querySelectorAll("input");
export const inputName = elementEditForm.querySelector(".popup__form-item_profile-name");
export const inputDescription = elementEditForm.querySelector(".popup__form-item_profile-description");
export const inputCardName = elementAddForm.querySelector(".popup__form-item_card-name");
export const inputCardSrc = elementAddForm.querySelector(".popup__form-item_card-source");
export const inputAvatarSrc = elementAvatarEditForm.querySelector(".popup__form-item_avatar-source");
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
