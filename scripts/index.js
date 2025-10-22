const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },

  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },

  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },

  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },

  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

//Variables for Edit Profile
const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const closeEditBtn = editProfileModal.querySelector(".modal__close-btn");
const profileNameEl = document.querySelector(".profile__name");
const profileJobEl = document.querySelector(".profile__job");
const editProfileForm = editProfileModal.querySelector("#profile-form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileJobInput = editProfileModal.querySelector(
  "#profile-desc-input"
);

//Variables for New Post
const addPostbtn = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const closePostBtn = newPostModal.querySelector(".modal__close-btn");
const postLinkEl = document.querySelector(".card__image");
const postCaptionEl = document.querySelector(".card__title");
const newPostForm = newPostModal.querySelector("#post-form");
const newPostLinkInput = newPostModal.querySelector("#new-post-input");
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

  cardLikeBtn.addEventListener("click", function () {
    cardLikeBtn.classList.toggle("card__like-button_active");
  });
  cardDeleteBtn.addEventListener("click", function () {
    cardElement.remove();
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

//Set Up Initial Cards
initialCards.forEach(function (item) {
  const cards = getCardElement(item);
  cardsList.append(cards);
});

//Open and Close modal functions
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

//Open and Close Edit Profile Modal
editProfileBtn.addEventListener("click", function () {
  openModal(editProfileModal);
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileJobInput.value = profileJobEl.textContent;
});

closeEditBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

//Open and Close New Post Modal
addPostbtn.addEventListener("click", function () {
  openModal(newPostModal);
});

closePostBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

//Edit Profile Submit
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileNameEl.textContent = editProfileNameInput.value;
  profileJobEl.textContent = editProfileJobInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}
editProfileForm.addEventListener("submit", handleProfileFormSubmit);

//New Post Submit
function handlePostFormSubmit(evt) {
  evt.preventDefault();
  newCard = {};
  newCard.name = newPostCaptionInput.value;
  newCard.link = newPostLinkInput.value;
  cardsList.prepend(getCardElement(newCard));
  newPostModal.classList.remove("modal_is-opened");
}
newPostForm.addEventListener("submit", handlePostFormSubmit);
