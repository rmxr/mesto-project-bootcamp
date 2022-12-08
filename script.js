const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const likeButton = document.querySelectorAll(".cards__like-button");
const popup = document.querySelector(".popup");

function openPopup() {
  popup.classList.add("popup_opened");
};

function closePopup() {
  popup.classList.remove("popup_opened");
}

function like(e) {
  e.currentTarget.classList.toggle("cards__like-button_active");
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
likeButton.forEach(button => {
  button.addEventListener("click", like);
});
