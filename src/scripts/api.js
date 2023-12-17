
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2',
    headers: {
      authorization: '6bfe41d7-4de4-47a9-ada4-33f5f31ff7dc',
      'Content-Type': 'application/json'
    }
  }
  
  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  export const getDataUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          // если ошибка, отклоняем промис
          return Promise.reject(`Ошибка: ${res.status}`);
        })
  }

  export const upDateUser = (data) => {
   return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: '6bfe41d7-4de4-47a9-ada4-33f5f31ff7dc',
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
}


export const addCard = (data) => {
    return fetch(`${config.baseUrl}/cards`, {
     method: "POST",
     headers: {
       authorization: '6bfe41d7-4de4-47a9-ada4-33f5f31ff7dc',
       "Content-Type": "application/json"
     },
     body: JSON.stringify(data)
   })
     .then((res) => {
       if (res.ok) {
         return res.json();
       }
       else {
         return Promise.reject(`Ошибка: ${res.status}`)
       }
     })
 }

 export const removeCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
     method: "DELETE",
     headers: {
       authorization: '6bfe41d7-4de4-47a9-ada4-33f5f31ff7dc',
       "Content-Type": "application/json"
     }
   })
     .then((res) => {
       if (res.ok) {
         return res.json();
       }
       else {
         return Promise.reject(`Ошибка: ${res.status}`)
       }
     })
 }

 export const addLike = (id, isLiked) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
   method: isLiked ? "DELETE": "PUT",
   headers: {
     authorization: '6bfe41d7-4de4-47a9-ada4-33f5f31ff7dc',
     "Content-Type": "application/json"
   },
 })
   .then((res) => {
     if (res.ok) {
       return res.json();
     }
     else {
       return Promise.reject(`Ошибка: ${res.status}`)
     }
   })
}

export const updateAvatar = () => {
  return fetch(`${config.baseUrl}/cards/me/avatar`, {
   method: "PATCH",
   headers: {
     authorization: '6bfe41d7-4de4-47a9-ada4-33f5f31ff7dc',
     "Content-Type": "application/json"
   },
 })
   .then((res) => {
     if (res.ok) {
       return res.json();
     }
     else {
       return Promise.reject(`Ошибка: ${res.status}`)
     }
   })
}
