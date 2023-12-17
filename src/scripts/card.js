import { titlePopup, imgPopup, popupImage, template } from "./index.js";
import { openPopup } from "./modal.js";
import { removeCard } from "./api.js";

export const createCardTemplate = (data, likeCard, userId) => {
  const card = template.content.querySelector('.elements__card').cloneNode(true);
  const image = card.querySelector(".elements__image");
  const name = card.querySelector(".elements__name");
  const likeButton = card.querySelector(".elements__icon");
  const deleteButton = card.querySelector(".elements__delete");
  const buttonOpenPopupImage = card.querySelector(".elements__image");

  let likes = data.likes
  card.id = data._id
  image.src = data.link;
  image.alt = data.name;
  name.textContent = data.name;

  const likeQuantity = like.querySelector('.elements__quantity');

  // проверяем лайкнули ли мы карточку
  const checkLike = () => {
    return likes.some((like) => like._id === userId)
  }
// обновляет текущий массив лайков и обновляет статус
  const updateLikes = (newLikes) => {
    likes = newLikes;
    setLikeStatus();
  }

  const setLikeStatus = () => {
    const isLiked = checkLike()
    if(isLiked) {
      likeButton.classList.add("elements__icon_active");
    } else {
      likeButton.classList.remove("elements__icon_active");
    }
    likeQuantity.textContent = likes.length;
  }

  setLikeStatus()

  likeButton.addEventListener("click", () => likeCard(data._id, checkLike(), updateLikes));
  deleteButton.addEventListener("click", () => deleteCard(data._id));
  buttonOpenPopupImage.addEventListener("click", () => openCard(data));

  return card;
}


const deleteCard = (id) => {
  removeCard(id)
    .then((data) => {
      const card = data.target.closest('.elements__card');
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    })
}


const openCard = (data) => {
  openPopup(popupImage);
  titlePopup.textContent = data.name;
  imgPopup.src = data.link;
  popupImage.alt = data.name;
}

