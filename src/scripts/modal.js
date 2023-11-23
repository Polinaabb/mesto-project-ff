export function openPopup(popupEditProfile) {
  popupEditProfile.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
}

export function closePopup(popupEditProfile) {
  popupEditProfile.classList.remove("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
}

function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const opened = document.querySelector(".popup_opened");
    closePopup(opened);
  }
}

export function closePopupByOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target)
  }
}

