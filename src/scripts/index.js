import '../pages/index.css';
import { initialCards } from "./cards.js";
import { createCardTemplate } from "./card.js";
import { popupCloseOverlay, openPopupEdit, openPopupAdd, closePopup } from "./modal.js";


export const popupEdit = document.querySelector(".popup_edit");
export const popupAdd = document.querySelector(".popup_add");
export const popupImage = document.querySelector(".popup_image");
export const buttonEdit = document.querySelector(".profile__edit-button");
export const buttonAdd = document.querySelector(".profile__add-button");
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(".profile__description");
export const nameInput = document.querySelector(".popup__fieled_type_name");
export const jobInput = document.querySelector(".popup__fieled_type_job");
export const elements = document.querySelector(".elements");
export const titlePopup = document.querySelector(".popup__name");
export const imgPopup = document.querySelector(".popup__image");
export const titleCard = document.querySelector(".elements__name");
export const imageCard = document.querySelector(".elements__image");
export const template = document.querySelector(".template");
const titleInput = document.querySelector(".popup__fieled_type_title");
const linkInput = document.querySelector(".popup__fieled_type_link")
export const popupFormEdit = document.querySelector(".popup__container-edit")
export const popupFormAdd = document.querySelector(".popup__container-add");

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEdit);
};

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  const newCard = createCardTemplate({ name: titleInput.value, link: linkInput.value });
  titleInput.value = "";
  linkInput.value = "";
  elements.prepend(newCard);
  closePopup(popupAdd);
}

const render = () => {
  initialCards.forEach((item) => {
    elements.append(createCardTemplate(item));
  });
};

render();


buttonEdit.addEventListener("click", openPopupEdit);
buttonAdd.addEventListener("click", openPopupAdd);
popupFormEdit.addEventListener('submit', handleFormSubmitEdit);
popupFormAdd.addEventListener('submit', handleFormSubmitAdd);
popupEdit.addEventListener("click", popupCloseOverlay);
popupAdd.addEventListener("click", popupCloseOverlay);
popupImage.addEventListener("click", popupCloseOverlay);








