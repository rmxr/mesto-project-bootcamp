import './pages/index.css';
import { enableValidation } from "./validate.js";
import { elementAvatarEditForm, popupChangeAvatar, profileAvatar, buttonEdit, buttonsClose, popupAdd, buttonAddCard, elementEditForm, elementAddForm, popupOverlays, popupContainers, validationConfig } from "./constants.js";
import { initializeCards, handleAddCard } from "./card.js";
import { closePopup, openEditPopup, handleFormSubmit, openAddPopup, openPopup, handleChangeAvatar} from "./modal.js";
import { initializeUserInfo } from './util.js';

buttonEdit.addEventListener("click", openEditPopup);
elementEditForm.addEventListener("submit", handleFormSubmit);
elementAddForm.addEventListener("submit", handleAddCard);
elementAvatarEditForm.addEventListener("submit", handleChangeAvatar);
buttonAddCard.addEventListener("click", () => {
  openAddPopup(popupAdd);
});
profileAvatar.addEventListener("click", () => {openPopup(popupChangeAvatar)});

initializeCards();

initializeUserInfo();

popupContainers.forEach(container => {
  container.addEventListener("mousedown", (e) => e.stopPropagation())
});

enableValidation(validationConfig);

buttonsClose.forEach(button => {
  button.addEventListener("click", (evt) => closePopup(evt.target))
});

popupOverlays.forEach(overlay => {
  overlay.addEventListener("mousedown", (evt) => closePopup(evt.target));
});

