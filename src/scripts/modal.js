import { popupEdit, popupAdd, nameInput, jobInput, 
    profileName, profileDescription } from "./index.js"

export function openPopup(popupEdit) { 
    popupEdit.classList.add("popup_opened");
    document.addEventListener("keydown", popupCloseEcs);  
  } 
  
 export function closePopup(popupEdit) { 
    popupEdit.classList.remove("popup_opened");
    document.addEventListener("keydown", popupCloseEcs); 
  } 
  
  function popupCloseEcs(evt) { 
    if (evt.key === "Escape") { 
      const opened = document.querySelector(".popup_opened"); 
      closePopup(opened); 
    };
  }  
  
  export function popupCloseOverlay(evt) { 
    if (evt.target.classList.contains("popup")) { 
      closePopup(evt.target) 
    } 
  } 
  
  export const openPopupEdit = function () { 
    openPopup(popupEdit); 
    nameInput.value = profileName.textContent; 
    jobInput.value = profileDescription.textContent; 
  };
  
  export const openPopupAdd = function () { 
    openPopup(popupAdd); 
  }; 
  
  document.querySelectorAll('.popup__close').forEach(button => { 
    const buttonsPopup = button.closest('.popup'); 
    button.addEventListener('click', () => closePopup(buttonsPopup)); 
  }); 