import "../pages/index.css";
import { createCard } from "./card.js";
import {
  closePopupByOverlayClick,
  openPopup, closePopup
} from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import { getInitialCards, getDataUser, updateUser,
  addCard, addLike, updateAvatar, removeCard } from "./api.js";

const popupEditProfile = document.querySelector(".popup_edit");
const popupAddCard = document.querySelector(".popup_add");
export const popupImage = document.querySelector(".popup_image");
const popupAvatarProfile = document.querySelector(".popup_avatar");
const openButtonEdit = document.querySelector(".profile__edit-button");
const openButtonAdd = document.querySelector(".profile__add-button");
const openEditAvatar = document.querySelector(".profile__avatar_edit");
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");
export const nameInput = document.querySelector(".popup__fieled_type_name");
export const jobInput = document.querySelector(".popup__fieled_type_job");
const cardsContainer = document.querySelector(".elements");
export const titlePopup = document.querySelector(".popup__name");
export const imgPopup = document.querySelector(".popup__image");
export const cardTemplate = document.querySelector(".template");
const titleInput = document.querySelector(".popup__fieled_type_title");
const linkInput = document.querySelector(".popup__fieled_type_link");
const formEditProfile = document.querySelector(".popup__container-edit");
const formAddCard = document.querySelector(".popup__container-add");
const formAvatarProfile = document.querySelector(".popup__container-avatar");
const closeList = document.querySelectorAll(".popup__close");
const avatarInput = document.querySelector(".popup__fieled_type_avatar");
let userId = ''; 
let userAvatar = '';

export const validationSettings = {
  formSelector: ".popup__fieleds",
  inputSelector: ".popup__fieled",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__fieled_type_error",
  errorClass: "popup__fieled-error_active",
};

function handleFormSubmitEdit(evt) {
  renderLoading(evt.submitter, 'Сохранение...');
  evt.preventDefault();
  updateUser({name: nameInput.value, about:  jobInput.value})
  .then((data) => {
    profileName.textContent = data.name; 
    profileDescription.textContent = data.about;
    
    evt.target.reset();
    
    closePopup(popupEditProfile);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => renderLoading(evt.submitter, 'Сохранить'));
};

function handleFormSubmitAdd(evt) {
  renderLoading(evt.submitter, 'Сохранение...');
  evt.preventDefault();
  addCard({ name: titleInput.value, link: linkInput.value })
  .then((dataNewCard) => {
    const newCard = createCard(dataNewCard, likeCard, onDelete, openCard, userId);
    titleInput.value = "";
    linkInput.value = "";
    cardsContainer.prepend(newCard);

    evt.target.reset();
    closePopup(popupAddCard);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => renderLoading(evt.submitter, 'Сохранить'));
}

function handleFormSubmitAvatar(evt) {
  renderLoading(evt.submitter, 'Сохранение...');
  evt.preventDefault();
  updateAvatar({ avatar: avatarInput.value })
  .then((data) => {
    profileAvatar.style = `background-image: url(${data.avatar})`;
    closePopup(popupAvatarProfile);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => renderLoading(evt.submitter, 'Сохранить'));
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
 
const onDelete = (id, card) => {
  console.log(card)
  removeCard(id, card)
    .then((data) => {
      data.card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
};

const openCard = (data) => {
  openPopup(popupImage);
  titlePopup.textContent = data.name;
  imgPopup.src = data.link;
  popupImage.alt = data.name;
};

const openPopupAvatar = function () {
  openPopup(popupAvatarProfile);
  avatarInput.value = userAvatar;
  clearValidation(popupAvatarProfile, validationSettings);
}

const openPopupEdit = function () {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(popupEditProfile, validationSettings);
};

const openPopupAdd = function () {
  openPopup(popupAddCard);
  clearValidation(popupAddCard, validationSettings);
};

closeList.forEach(button => {
  const buttonsPopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(buttonsPopup));
});
 
function renderLoading(saveButton, status) {
  saveButton.textContent = status;
}

enableValidation(validationSettings);

Promise.all([getInitialCards(), getDataUser()])
  .then(([cards, userData]) => {
    userAvatar = userData.avatar;
    userId = userData._id
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
  
    cards.forEach((data) => {
      const card = createCard(data, likeCard, onDelete, openCard, userId)
      cardsContainer.append(card);
    })
  })
  .catch((err) => {
    console.log(err);
  });
  
openButtonEdit.addEventListener('click', openPopupEdit);
openButtonAdd.addEventListener('click', openPopupAdd);
formEditProfile.addEventListener('submit', handleFormSubmitEdit);
formAddCard.addEventListener('submit', handleFormSubmitAdd);
formAvatarProfile.addEventListener('submit', handleFormSubmitAvatar);
popupAvatarProfile.addEventListener('click', closePopupByOverlayClick)
popupEditProfile.addEventListener('click', closePopupByOverlayClick);
popupAddCard.addEventListener('click', closePopupByOverlayClick);
popupImage.addEventListener('click', closePopupByOverlayClick);
openEditAvatar.addEventListener('click', openPopupAvatar);

 


