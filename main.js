import { getCommentsFromServer, postCommentToServer } from "./modules/commentsData.js";
import { renderComments } from "./modules/render.js";

const nameInput = document.querySelector(".add-form-name");
const textInput = document.querySelector(".add-form-text");
const addButton = document.querySelector(".add-form-button");

const commentsLoading = document.getElementById("comments-loading");
const commentAddingLoader = document.getElementById("comment-adding-loader");
const addForm = document.getElementById("add-form");

nameInput.addEventListener("input", () => nameInput.classList.remove("error"));
textInput.addEventListener("input", () => textInput.classList.remove("error"));

addButton.addEventListener("click", () => {
  nameInput.classList.remove("error");
  textInput.classList.remove("error");

  if (nameInput.value.trim() === "") nameInput.classList.add("error");
  if (textInput.value.trim() === "") textInput.classList.add("error");

  if (nameInput.value.trim() === "" || textInput.value.trim() === "") {
    return;
  }

  addForm.style.display = "none";
  commentAddingLoader.style.display = "block";

  postCommentToServer(nameInput.value, textInput.value)
    .then(() => {
      return getCommentsFromServer();
    })
    .then(() => {
      renderComments();
      nameInput.value = "";
      textInput.value = "";
    })
    .catch((error) => {
      alert(error.message);
    })
    .finally(() => {
      addForm.style.display = "flex";
      commentAddingLoader.style.display = "none";
    });
});

getCommentsFromServer()
  .then(() => {
    commentsLoading.style.display = "none";
    renderComments();
  })
  .catch((error) => {
    alert("Не удалось загрузить комментарии. Проверьте соединение.");
    console.error(error);
  });
