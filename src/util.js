import { getUserInfo, requestCardDeletion, sendLike } from "./api.js";
import { profileAvatar, profileDescription, profileName, setUserID, popupConfirmDeletion, elementConfirmationForm } from "./constants.js";
import { initializeCards } from "./card.js";
import { openPopup, handleConfirmCardDeletion } from "./modal.js";

// Обработчик лайков
export function like(isLiked, cardID) {
  sendLike(isLiked, cardID);

};

// const DeletePromise = new Promise(function(resolve, reject) {
//   elementConfirmationForm.addEventListener("submit", () => resolve());

//   const mutationObserver = new MutationObserver(callback);

//   function callback(mutationsList) {
//     mutationsList.forEach(mutation => {
//       if (!mutation.target.className.includes("popup_opened")) {
//         mutationObserver.disconnect();
//         reject();
//       };
//     })
//   }


//   mutationObserver.observe(popupConfirmDeletion, { attributes: true });

// });


// Удаление карточки
export function deleteCard(cardID) {
  requestCardDeletion(cardID).then(() => initializeCards());

  // openPopup(popupConfirmDeletion);
  // DeletePromise
  // .then(() => console.log("Удалил через промис"))
  // .catch(() => console.log("Отменил удаление"));
  // elementConfirmationForm.addEventListener("submit", handleConfirmCardDeletion)
};


// Отрисовка информации пользователя

export function renderUserInfo(data) {
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
  profileAvatar.style.backgroundImage = `url(${data.avatar})`;
};


// Первичная отрисовка информации пользователя

export function initializePageContent() {
  getUserInfo()
    .then((data) => {
      renderUserInfo(data);
      setUserID(data["_id"]);
      initializeCards();
    })
    .catch((err) => {
      console.log(err);
    });
};


