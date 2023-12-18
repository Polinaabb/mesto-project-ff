import { cardTemplate } from "./index.js";

export const createCard = (data, likeCard, onDelete, openCard, userId) => {
  const card = cardTemplate.content
    .querySelector(".elements__card")
    .cloneNode(true);
  const image = card.querySelector(".elements__image");
  const name = card.querySelector(".elements__name");
  const like = card.querySelector(".elements__like");
  const likeButton = card.querySelector(".elements__icon");
  const deleteButton = card.querySelector(".elements__delete");
  const buttonOpenPopupImage = card.querySelector(".elements__image");
  const likeQuantity = like.querySelector(".elements__quantity");

  let likes = data.likes;
  card.id = data._id;
  image.src = data.link;
  image.alt = data.name;
  name.textContent = data.name;

  function deleteCard() {
    card.remove();
  }

  function checkDeleteIcon() {
    if (data.owner._id !== userId) {
      deleteButton.style.visibility = "hidden";
    }
  }

  checkDeleteIcon();

  // проверяем лайкнули ли мы карточку
  const checkLike = () => {
    return likes.some((like) => like._id === userId);
  };
  // обновляет текущий массив лайков и обновляет статус
  const updateLikes = (newLikes) => {
    likes = newLikes;
    setLikeStatus();
  };

  const setLikeStatus = () => {
    const isLiked = checkLike();
    if (isLiked) {
      likeButton.classList.add("elements__icon_active");
    } else {
      likeButton.classList.remove("elements__icon_active");
    }
    likeQuantity.textContent = likes.length;
  };

  setLikeStatus();

  likeButton.addEventListener("click", () =>
    likeCard(data._id, checkLike(), updateLikes),
  );
  deleteButton.addEventListener("click", () => 
    onDelete(data._id, deleteCard)
  );
  buttonOpenPopupImage.addEventListener("click", () => 
  openCard(data)
  );

  return card;
};
