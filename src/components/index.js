import '../pages/index.css';
import { enableValidation } from "./validate.js";
import { elementAvatarEditForm, popupChangeAvatar, profileAvatar, buttonEdit, closingButtons, popupAdd, buttonAddCard, elementEditForm, elementAddForm, popupOverlays, popupContainers, validationConfig, setUserID } from "./constants.js";
import { handleAddCard, initializeCards } from "./card.js";
import { closePopup, openEditPopup, handleProfileFormSubmit, openAddPopup, openPopup, handleChangeAvatar } from "./modal.js";
import { getUserInfo, getInitialCards } from './api.js';
import { renderUserInfo } from './util.js';

buttonEdit.addEventListener("click", openEditPopup);
elementEditForm.addEventListener("submit", handleProfileFormSubmit);
elementAddForm.addEventListener("submit", handleAddCard);
elementAvatarEditForm.addEventListener("submit", handleChangeAvatar);
buttonAddCard.addEventListener("click", () => {
  openAddPopup(popupAdd);
});
profileAvatar.addEventListener("click", () => {openPopup(popupChangeAvatar)});

Promise.all([getUserInfo(), getInitialCards()])
.then(([userData, cards]) => {
  renderUserInfo(userData);
  setUserID(userData["_id"]);
  initializeCards(cards);
})
.catch(err => console.log(err))


popupContainers.forEach(container => {
  container.addEventListener("mousedown", (e) => e.stopPropagation())
});

enableValidation(validationConfig);

closingButtons.forEach(button => {
  button.addEventListener("click", (evt) => closePopup(evt.target))
});

popupOverlays.forEach(overlay => {
  overlay.addEventListener("mousedown", (evt) => closePopup(evt.target));
});

