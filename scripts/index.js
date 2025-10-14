const initialCards = [
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

//Open and Close Edit Profile Modal
editProfileBtn.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileJobInput.value = profileJobEl.textContent;
});

closeEditBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

//Open and Close New Post Modal
addPostbtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

closePostBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});

initialCards.forEach(function (item) {
  console.log(item.name);
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

  postLinkEl.textContent = newPostLinkInput.value;
  postCaptionEl.textContent = newPostCaptionInput.value;
  console.log(postLinkEl);
  console.log(postCaptionEl);
  newPostModal.classList.remove("modal_is-opened");
}
newPostForm.addEventListener("submit", handlePostFormSubmit);
