import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCardTemplate } from "./card.js";
import { closePopupByOverlayClick, 
  openPopup, closePopup } from "./modal.js";

const popupEditProfile = document.querySelector(".popup_edit");
const popupAddCard = document.querySelector(".popup_add");
export const popupImage = document.querySelector(".popup_image");
const openButtonEdit = document.querySelector(".profile__edit-button");
const openButtonAdd = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name"); 
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__fieled_type_name");
const jobInput = document.querySelector(".popup__fieled_type_job");
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
const closeButton = document.querySelectorAll(".popup__close");

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  const newCard = createCardTemplate({ name: titleInput.value, link: linkInput.value });
  titleInput.value = ""; 
  linkInput.value = ""; 
  elements.prepend(newCard);
  closePopup(popupAddCard);
}

const renderInitialCards = () => {
  initialCards.forEach((item) => {
    elements.append(createCardTemplate(item));
  });
};

renderInitialCards();

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

openButtonEdit.addEventListener("click", openPopupEdit);
openButtonAdd.addEventListener("click", openPopupAdd);
formEditProfile.addEventListener('submit', handleFormSubmitEdit);
formAddCard.addEventListener('submit', handleFormSubmitAdd);
popupEditProfile.addEventListener("click", closePopupByOverlayClick);
popupAddCard.addEventListener("click", closePopupByOverlayClick);
popupImage.addEventListener("click", closePopupByOverlayClick);








