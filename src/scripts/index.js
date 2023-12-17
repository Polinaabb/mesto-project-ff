
import "../pages/index.css";
import { createCardTemplate } from "./card.js";
import {
  closePopupByOverlayClick,
  openPopup, closePopup
} from "./modal.js";
import { enableValidation } from "./validation.js";
import { getInitialCards, getDataUser, upDateUser, addCard, addLike, updateAvatar } from "./api.js";


const popupEditProfile = document.querySelector(".popup_edit");
const popupAddCard = document.querySelector(".popup_add");
export const popupImage = document.querySelector(".popup_image");
const popupAvatarProfile = document.querySelector(".popup_avatar");
const openButtonEdit = document.querySelector(".profile__edit-button");
const openButtonAdd = document.querySelector(".profile__add-button");
const openEditAvatar = document.querySelector(".profile__avatar");
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar")
export const nameInput = document.querySelector(".popup__fieled_type_name");
export const jobInput = document.querySelector(".popup__fieled_type_job");
const elements = document.querySelector(".elements");
export const titlePopup = document.querySelector(".popup__name");
export const imgPopup = document.querySelector(".popup__image");
export const titleCard = document.querySelector(".elements__name");
export const imageCard = document.querySelector(".elements__image");
export const template = document.querySelector(".template");
const titleInput = document.querySelector(".popup__fieled_type_title");
const linkInput = document.querySelector(".popup__fieled_type_link");
const formEditProfile = document.querySelector(".popup__container-edit");
const formAddCard = document.querySelector(".popup__container-add");
const formAvatarProfile = document.querySelector(".popup__container-avatar");
const closeButton = document.querySelectorAll(".popup__close");
const avatarInput = document.querySelector(".popup__fieled_type_avatar");
let userId = ''; 

export const settings = {
  formSelector: ".popup__fieleds",
  inputSelector: ".popup__fieled",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__fieled_type_error",
  errorClass: "popup__fieled-error_active",
};

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  upDateUser({name: nameInput.value, about:  jobInput.value})
  .then((data) => {
    profileName.textContent = data.name; 
    profileDescription.textContent = data.about;
    
    evt.target.reset();
  })
  .catch((err) => {
    console.log(err);
  });
  closePopup(popupEditProfile);
};

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  addCard({ name: titleInput.value, link: linkInput.value })
  .then((dataNewCard) => {
    const newCard = createCardTemplate(dataNewCard, likeCard, userId);
    titleInput.value = "";
    linkInput.value = "";
    elements.prepend(newCard);
    evt.target.reset();
  })
  .catch((err) => {
    console.log(err);
  });

  closePopup(popupAddCard);
}

function handleFormSubmitAvatar(evt) {
  evt.preventDefault();
  updateAvatar({ avatar: avatarInput.value })
  .then((userData) => {
    console.log(userData);
   ;
  })
  .catch((err) => {
    console.log(err);
  });

  closePopup(popupAvatarProfile);
}

const likeCard = (id, isLiked, updateLikes) => {
  addLike(id, isLiked)
  .then((data) => {
    updateLikes(data.likes) //передаю обновленный массив 
  })
  .catch((err) => {
    console.log(err);
  })
 }

const openPopupAvatar = function () {
  openPopup(popupAvatarProfile)
}

const openPopupEdit = function () {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
};

const openPopupAdd = function () {
  openPopup(popupAddCard);
};

closeButton.forEach(button => {
  const buttonsPopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(buttonsPopup));
});
 

openButtonEdit.addEventListener('click', openPopupEdit);
openButtonAdd.addEventListener('click', openPopupAdd);
formEditProfile.addEventListener('submit', handleFormSubmitEdit);
formAddCard.addEventListener('submit', handleFormSubmitAdd);
formAvatarProfile.addEventListener('submit', handleFormSubmitAvatar)
popupEditProfile.addEventListener('click', closePopupByOverlayClick);
popupAddCard.addEventListener('click', closePopupByOverlayClick);
popupImage.addEventListener('click', closePopupByOverlayClick);
openEditAvatar.addEventListener('click', openPopupAvatar);


enableValidation(settings);


Promise.all([getInitialCards(), getDataUser()])
  .then(([res1, res2]) => {
    userId = res2._id
    profileName.textContent = res2.name;
    profileDescription.textContent = res2.about;
    profileAvatar.style.backgroundImage = `url(${res2.avatar})`;
    console.log(res2.avatar);
  
    res1.forEach((data) => {
      const listItem = createCardTemplate(data, likeCard, userId)
      elements.append(listItem);
    })
  })
  .catch((err) => {
    console.log(err);
  });


// function handleFormSubmitEdit(evt) { 
//   evt.preventDefault(); 
//   profileName.textContent = nameInput.value; 
//   profileDescription.textContent = jobInput.value; 
//   closePopup(popupEditProfile); 
// }; 

// function handleFormSubmitAdd(evt) { 
//   evt.preventDefault(); 
//   const newCard = createCardTemplate({ name: titleInput.value, link: linkInput.value }, likeCard, deleteCard, openCard); 
//   titleInput.value = ""; 
//   linkInput.value = "";  
//   elements.prepend(newCard); 
//   closePopup(popupAddCard); 
// }  

// const renderInitialCards = () => {
//   getInitialCards()
//   .then((dataCard) => {
//     dataCard.forEach((item) => {
//       elements.append(createCardTemplate(item, likeCard, deleteCard, openCard));
//     });
//   })
//   .catch((err) => {
//         console.log(err);
//       });
// };

// renderInitialCards();


