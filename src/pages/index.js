import "./index.css";

import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";

import Api from "../utils/api.js";

// const initialCards = [
//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },

//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },

//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },

//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },

//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d3348aaf-86d9-412b-b729-0c73de845b18", // Replace with your actual token
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    profileNameEl.textContent = userInfo.name;
    profileJobEl.textContent = userInfo.about;
    profileAvatarEl.src = userInfo.avatar;

    cards.forEach((item) => {
      const cardEl = getCardElement(item);
      cardsList.append(cardEl);
    });
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

//Variables for Edit Profile
const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const closeProfileBtn = editProfileModal.querySelector(".modal__close-btn");
const saveProfileBtn = editProfileModal.querySelector(".modal__save-btn");
const profileNameEl = document.querySelector(".profile__name");
const profileJobEl = document.querySelector(".profile__job");
const editProfileForm = editProfileModal.querySelector("#profile-form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileJobInput = editProfileModal.querySelector(
  "#profile-desc-input"
);
const buttonElement = document.querySelectorAll(".modal__save-btn");
const profileAvatarEl = document.querySelector(".profile__image");

//Variables for New Post
const addPostBtn = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const closePostBtn = newPostModal.querySelector(".modal__close-btn");
const savePostBtn = newPostModal.querySelector(".modal__save-btn");
const newPostForm = newPostModal.querySelector("#post-form");
const newPostLinkInput = newPostModal.querySelector("#card-link-input");
const newPostCaptionInput = newPostModal.querySelector("#caption-input");

//Variables for Image Modal
const imagePopupModal = document.querySelector("#image-popup-modal");
const closeImageModalBtn = imagePopupModal.querySelector(
  ".modal__image-close-btn"
);
const cardImageEl = document.querySelector(".card__image");
const modalImage = imagePopupModal.querySelector(".modal__image");
const modalImageTitle = imagePopupModal.querySelector(".modal__image-title");

//Variables for Cards
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

//Card Element Function
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  // cardLikeBtn.addEventListener("click", function () {
  //   cardLikeBtn.classList.toggle("card__like-button_active");
  // });
  if (data.isLiked) {
    cardLikeBtn.classList.add("card__like-button_active");
  }

  // Like/unlike toggle with API call
  cardLikeBtn.addEventListener("click", () => {
    const isActive = cardLikeBtn.classList.contains("card__like-button_active");

    if (isActive) {
      api
        .removeLike(data._id)
        .then((updatedCard) => {
          cardLikeBtn.classList.remove("card__like-button_active");
          // optional: update like counter if you have one
        })
        .catch((err) => console.error("Failed to remove like:", err));
    } else {
      api
        .addLike(data._id)
        .then((updatedCard) => {
          cardLikeBtn.classList.add("card__like-button_active");
          // optional: update like counter if you have one
        })
        .catch((err) => console.error("Failed to add like:", err));
    }
  });

  cardDeleteBtn.addEventListener("click", function () {
    console.log("Deleting card with id:", data._id);
    api
      .deleteCard(data._id)
      .then(() => {
        cardElement.remove();
      })
      .catch((err) => {
        console.error("Failed to delete card:", err);
      });
  });

  cardImageEl.addEventListener("click", function () {
    openModal(imagePopupModal);
    modalImage.src = data.link;
    modalImage.alt = data.name;
    modalImageTitle.textContent = data.name;
  });

  return cardElement;
}

//Close Image Pop Up Modal
closeImageModalBtn.addEventListener("click", function () {
  closeModal(imagePopupModal);
});

//Open and Close modal functions
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

//Open and Close Edit Profile Modal
editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileJobInput.value = profileJobEl.textContent;
  resetValidation(
    editProfileForm,
    [editProfileNameInput, editProfileJobInput],
    settings
  );
  openModal(editProfileModal);
});

closeProfileBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

//Open and Close New Post Modal
addPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

closePostBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

//Open and Close Edit Avatar Modal
const editAvatarBtn = document.querySelector(".profile__edit-avatar-button");
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const closeEditAvatarBtn = editAvatarModal.querySelector(".modal__close-btn");
const avatarInput = editAvatarModal.querySelector("#profile-avatar-input");

editAvatarBtn.addEventListener("click", function () {
  openModal(editAvatarModal);
});
closeEditAvatarBtn.addEventListener("click", function () {
  closeModal(editAvatarModal);
});

//Edit Profile Submit
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileJobInput.value,
    })
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileJobEl.textContent = data.about;
      closeModal(editProfileModal);
      disableButton(saveProfileBtn, settings);
    })
    .catch((err) => {
      console.error(err);
    });
}
editProfileForm.addEventListener("submit", handleProfileFormSubmit);

//New Post Submit
function handlePostFormSubmit(evt) {
  evt.preventDefault();
  if (!newPostForm.checkValidity()) return;

  api
    .addNewCard({
      name: newPostCaptionInput.value,
      link: newPostLinkInput.value,
    })
    .then((newCard) => {
      console.log("New card from server:", newCard);
      cardsList.prepend(getCardElement(newCard));
      newPostForm.reset();
      closeModal(newPostModal);
      disableButton(savePostBtn, settings);
    })
    .catch((err) => {
      console.error(err);
    });
}
newPostForm.addEventListener("submit", handlePostFormSubmit);

//New Avatar Submit
const saveAvatarBtn = editAvatarModal.querySelector(".modal__save-btn");
const editAvatarForm = editAvatarModal.querySelector("#avatar-form");
const editAvatartInput = editAvatarModal.querySelector("#profile-avatar-input");

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  api
    .editAvatar({ link: editAvatartInput.value })
    .this((data) => {
      closeModal(editAvatarModal);
      disableButton(saveAvatarBtn, settings);
    })
    .catch((err) => {
      console.error(err);
    });
}
editAvatarForm.addEventListener("submit", handleAvatarFormSubmit);

//Close modal via overlay
const allModals = document.querySelectorAll(".modal");

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal.modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

allModals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

enableValidation(settings);
