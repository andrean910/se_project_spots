const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const closeEditBtn = editProfileModal.querySelector(".modal__close-btn");

editProfileBtn.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
});

closeEditBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

const addPostbtn = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const closePostBtn = newPostModal.querySelector(".modal__close-btn");

addPostbtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

closePostBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});
