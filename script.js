const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const likeButton = document.querySelectorAll(".cards__like-button");
const popup = document.querySelector(".popup");
const inputName = document.querySelector('[name="name"]');
const inputDescription = document.querySelector('[name="description"]');
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");


function openPopup() {
  popup.classList.add("popup_opened");
  inputName.value = `${profileName.textContent}`;
  inputDescription.value = `${profileDescription.textContent}`;
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
