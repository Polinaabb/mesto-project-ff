import { titlePopup, imgPopup, popupImage, template } 
from "./index.js";
import { openPopup } from "./modal.js"
  
export const createCardTemplate = (data) => { 
    const card = template.content.cloneNode(true); 
    const image = card.querySelector(".elements__image"); 
    const name = card.querySelector(".elements__name"); 
    image.src = data.link; 
    image.alt = data.name; 
    name.textContent = data.name; 
  
    const likeButton = card.querySelector(".elements__icon"); 
    likeButton.addEventListener("click", function (evt) {  
      evt.target.classList.toggle("elements__icon_active");   
    });  
  
    const deleteButton = card.querySelector(".elements__delete"); 
    deleteButton.addEventListener("click", deleteCard); 
    const buttonOpenPopupImage = card.querySelector(".elements__image");  
    buttonOpenPopupImage.addEventListener("click", () => openCard(data)) 
    return card;  
  } 
    
  export const deleteCard = (e) => { 
    const card = e.target.closest(".elements__card"); 
    card.remove(); 
  } 

  export const openCard = (data) => { 
    openPopup(popupImage); 
    titlePopup.textContent = data.name; 
    imgPopup.src = data.link; 
    popupImage.alt = data.name; 
  } 

