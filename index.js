import { enableValidation } from "./validate.js";
import { buttonEdit, buttonClose, popupAdd, buttonAddCard, elementEditForm, elementAddForm, cardTemplate, cardsContainer, popupOverlays, popupContainers, validationConfig } from "./constants.js";
import { initializeCards, handleAddCard } from "./card.js";
import { openPopup, closePopup, openPopupView, openEditPopup, handleFormSubmit} from "./modal.js"

buttonEdit.addEventListener("click", openEditPopup);
elementEditForm.addEventListener("submit", handleFormSubmit);
elementAddForm.addEventListener("submit", handleAddCard);
buttonClose.forEach(button => {
  button.addEventListener("click", closePopup)
});
buttonAddCard.addEventListener("click", () => openPopup(popupAdd));
initializeCards();

popupContainers.forEach(container => {
  container.addEventListener("click", (e) => e.stopPropagation())
});
popupOverlays.forEach(overlay => {
  overlay.addEventListener("click", closePopup);
});
enableValidation(validationConfig);

