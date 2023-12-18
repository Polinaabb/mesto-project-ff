const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-2",
  headers: {
    authorization: "6bfe41d7-4de4-47a9-ada4-33f5f31ff7dc",
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
};

export const getDataUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
};

export const updateUser = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: "6bfe41d7-4de4-47a9-ada4-33f5f31ff7dc",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
};

export const addCard = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: "6bfe41d7-4de4-47a9-ada4-33f5f31ff7dc",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
};

export const removeCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "6bfe41d7-4de4-47a9-ada4-33f5f31ff7dc",
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

export const addLike = (id, isLiked) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: isLiked ? "DELETE" : "PUT",
    headers: {
      authorization: "6bfe41d7-4de4-47a9-ada4-33f5f31ff7dc",
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

export const updateAvatar = (data) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-2/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "6bfe41d7-4de4-47a9-ada4-33f5f31ff7dc",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
};
