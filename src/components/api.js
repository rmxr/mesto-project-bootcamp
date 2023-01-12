const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-4',
  headers: {
    authorization: 'c361903a-6f02-478d-80a9-7b9e8ed8c1ed',
    'Content-Type': 'application/json'
  }
};

function handleServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
};

function request(url, options) {
  return fetch(url, options).then(res => handleServerResponse(res))
};

export const getInitialCards = () => {
  return request(`${config.baseUrl}/cards`, {headers: config.headers})
};

export const getUserInfo = () => {
  return request(`${config.baseUrl}/users/me`, {headers: config.headers})
};

export const sendUserInfo = (name, description) => {
  return request(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      about: `${description}`
    })
  })
};

export const sendAvatar = (linkToAvatar) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${linkToAvatar}`,
    })
  })
};

export const sendNewCard = (cardName, cardLink) => {
  return request(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: `${cardName}`,
      link: `${cardLink}`
    })
  })
};

export const requestCardDeletion = (cardID) => {
  return request(`${config.baseUrl}/cards/${cardID}`, {
    method: 'DELETE',
    headers: config.headers,
  })
};

export const sendLike = (isLiked, cardID) => {
  return request(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: isLiked === true ? 'DELETE' : 'PUT',
    headers: config.headers,
  })
};


