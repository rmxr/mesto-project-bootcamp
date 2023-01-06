import './pages/index.css';
import { enableValidation } from "./validate.js";
import { buttonEdit, buttonsClose, popupAdd, buttonAddCard, elementEditForm, elementAddForm, popupOverlays, popupContainers, validationConfig } from "./constants.js";
import { initializeCards, handleAddCard } from "./card.js";
import { closePopup, openEditPopup, handleFormSubmit, openAddPopup} from "./modal.js";
import { getInitialCards } from './api.js';

buttonEdit.addEventListener("click", openEditPopup);
elementEditForm.addEventListener("submit", handleFormSubmit);
elementAddForm.addEventListener("submit", handleAddCard);
buttonAddCard.addEventListener("click", () => {
  openAddPopup(popupAdd);
});
initializeCards();
getInitialCards();

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

