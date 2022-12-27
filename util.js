// Обработчик лайков
export function like(e) {
  e.currentTarget.classList.toggle("cards__like-button_active");
};

// Удаление карточки
export function deleteCard(e) {
  e.currentTarget.closest(".cards__item").remove();
};
