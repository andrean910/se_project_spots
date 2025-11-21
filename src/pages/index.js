import "./index.css";

import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import { setButtonText } from "../utils/helpers.js";

import Api from "../utils/api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d3348aaf-86d9-412b-b729-0c73de845b18", // Replace with your actual token
    "Content-Type": "application/json",
  },
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

//Variable for All Modals
const allModals = document.querySelectorAll(".modal");

//Variablesfor Avatar
const profileAvatarEl = document.querySelector(".profile__image");
const editAvatarBtn = document.querySelector(".profile__edit-avatar-button");
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const closeEditAvatarBtn = editAvatarModal.querySelector(".modal__close-btn");
const saveAvatarBtn = editAvatarModal.querySelector(".modal__save-btn");
const editAvatarForm = editAvatarModal.querySelector("#avatar-form");
const editAvatarInput = editAvatarModal.querySelector("#profile-avatar-input");

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
let selectedCard, selectedCardId;

//Variables for Delete form
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const closeDeleteModalBtn = deleteModal.querySelector(".modal__close-btn");
const cancelDeleteBtn = deleteModal.querySelector(".modal__cancel-btn");

//Gett App Info to set up initialCards
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
    console.error(err);
  });

//CARD FUNCTIONS
//Image Click Function
function handleImageClick(data) {
  modalImage.src = data.link;
  modalImage.alt = data.name;
  modalImageTitle.textContent = data.name;
  openModal(imagePopupModal);
}

//Like Card Function
function handleLike(evt, data) {
  selectedCardId = data._id;
  const cardLikeBtn = evt.target;
  const isActive = cardLikeBtn.classList.contains("card__like-button_active");
  api
    .changeLikeStatus(selectedCardId, isActive)
    .then((updatedCard) => {
      if (updatedCard.isLiked) {
        cardLikeBtn.classList.add("card__like-button_active");
      } else {
        cardLikeBtn.classList.remove("card__like-button_active");
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

//Delete Card Function
function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteModal);
}

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

  if (data.isLiked) {
    cardLikeBtn.classList.add("card__like-button_active");
  }

  cardLikeBtn.addEventListener("click", (evt) => handleLike(evt, data));
  cardDeleteBtn.addEventListener("click", () =>
    handleDeleteCard(cardElement, data)
  );
  cardImageEl.addEventListener("click", () => handleImageClick(data));

  return cardElement;
}

//MODAL FUNCTIONS
//Open and Close modal functions
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

//Close via Escape or Overlay
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

//SUBMIT FUNCTIONS
//Edit Profile Submit
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  // saveProfileBtn;
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

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
    })
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

//New Post Submit
function handlePostFormSubmit(evt) {
  evt.preventDefault();
  if (!newPostForm.checkValidity()) return;

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

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
    })
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

//New Avatar Submit
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .editAvatar(editAvatarInput.value)
    .then((data) => {
      profileAvatarEl.src = data.avatar;
      closeModal(editAvatarModal);
      disableButton(saveAvatarBtn, settings);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

//Delete Submit
function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true, "Delete");

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonText(submitBtn, false, "Delete");
    });
}

//EVENT LISTENERS
//Submit Event Listeners
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
newPostForm.addEventListener("submit", handlePostFormSubmit);
editAvatarForm.addEventListener("submit", handleAvatarFormSubmit);
deleteForm.addEventListener("submit", handleDeleteSubmit);

//Delete Modal Event Listeners
closeDeleteModalBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});
cancelDeleteBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});

//Close Image Pop Up Modal
closeImageModalBtn.addEventListener("click", function () {
  closeModal(imagePopupModal);
});

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

//Open and Close Avatar Modal
editAvatarBtn.addEventListener("click", function () {
  editAvatarInput.value = profileAvatarEl.src;
  resetValidation(editAvatarForm, [editAvatarInput], settings);
  openModal(editAvatarModal);
});
closeEditAvatarBtn.addEventListener("click", function () {
  closeModal(editAvatarModal);
});

enableValidation(settings);
