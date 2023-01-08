const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-4',
  headers: {
    authorization: 'c361903a-6f02-478d-80a9-7b9e8ed8c1ed',
    'Content-Type': 'application/json'
  }
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => handleServerResponse(res));
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => handleServerResponse(res))
};

export const sendUserInfo = (name, description) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      about: `${description}`
    })
  })
    .then(res => handleServerResponse(res))
};

export const sendAvatar = (linkToAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${linkToAvatar}`,
    })
  })
  .then(res => handleServerResponse(res))
};

export const sendNewCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: `${cardName}`,
      link: `${cardLink}`
    })
  })
  .then(res => handleServerResponse(res))
};

export const requestCardDeletion = (cardID) => {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => handleServerResponse(res))
};

export const sendLike = (isLiked, cardID) => {
  const m = isLiked === true ? 'DELETE' : 'PUT';
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: m,
    headers: config.headers,
  })
  .then(res => handleServerResponse(res))
};

function handleServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
};


