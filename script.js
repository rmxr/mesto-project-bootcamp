const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelectorAll(".popup__close-button");
const popupEdit = document.querySelector(".profile-edit");
const popupAdd = document.querySelector(".add-card");
const addCardButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editFormElement = document.querySelector(".profile-edit__form");
const addFormElement = document.querySelector(".add-card__form");
const inputName = editFormElement.querySelector(".profile-edit__form-item_name");
const inputDescription = editFormElement.querySelector(".profile-edit__form-item_description");
const inputCardName = addFormElement.querySelector(".add-card__form-item_name");
const inputCardSrc = addFormElement.querySelector(".add-card__form-item_source");
const editSubmitButton = document.querySelector(".profile-edit__save-button");
const cardTemplate = document.querySelector("#cards__template").content;
const cardsContainer = document.querySelector(".cards__container");
const imageViewTemplate = document.querySelector("#view-image__template").content;
const body = document.querySelector(".page");
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function addCard(imageSrc, imageTitle) {
  const cardElement = cardTemplate.querySelector(".cards__item").cloneNode(true);
  const likeButton = cardElement.querySelector(".cards__like-button");
  const deleteButton = cardElement.querySelector(".cards__delete-button");
  const clickableImage = cardElement.querySelector(".cards__image");
  cardElement.querySelector(".cards__image").src = `${imageSrc}`;
  cardElement.querySelector(".cards__title").textContent = `${imageTitle}`;
  likeButton.addEventListener("click", like);
  deleteButton.addEventListener("click", deleteCard);
  clickableImage.addEventListener("click", openImageView);
  cardsContainer.prepend(cardElement);
};

function populateCards(cardsArray) {
  cardsArray.forEach(element => {
    addCard(element.link, element.name);
  })
};

function openImageView(e) {
  const imageViewElement = imageViewTemplate.querySelector(".view-image").cloneNode(true);
  const closeButton = imageViewElement.querySelector(".view-image__close-button");
  imageViewElement.querySelector(".view-image__image").src = e.currentTarget.src;
  imageViewElement.querySelector(".view-image__caption").textContent = e.currentTarget.nextElementSibling.firstElementChild.textContent;
  closeButton.addEventListener("click", () => {
    imageViewElement.classList.remove("popup_opened");
  });
  body.append(imageViewElement);
  setTimeout(imageViewElement.classList.add("popup_opened"), 3000);
}

populateCards(initialCards);

function openEditPopup() {
  popupEdit.classList.add("popup_opened");
  inputName.value = `${profileName.textContent}`;
  inputDescription.value = `${profileDescription.textContent}`;
};

function openAddCardPopup() {
  popupAdd.classList.add("popup_opened");
}

function closePopup(event) {
  event.currentTarget.closest(".popup").classList.remove("popup_opened");
}


function handleFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = `${inputName.value}`;
  profileDescription.textContent = `${inputDescription.value}`;
  e.currentTarget.closest(".popup").classList.remove("popup_opened");
}

function handleAddCard(e) {
  e.preventDefault();
  addCard(inputCardSrc.value, inputCardName.value);
  e.currentTarget.closest(".popup").classList.remove("popup_opened");
  inputCardName.value = "";
  inputCardSrc.value = "";
}

function like(e) {
  e.currentTarget.classList.toggle("cards__like-button_active");
}

function deleteCard(e) {
  e.currentTarget.closest(".cards__item").remove();
}

editButton.addEventListener("click", openEditPopup);
editFormElement.addEventListener("submit", handleFormSubmit);
addFormElement.addEventListener("submit", handleAddCard);
closeButton.forEach(button => {
  button.addEventListener("click", closePopup)
});
addCardButton.addEventListener("click", openAddCardPopup);



