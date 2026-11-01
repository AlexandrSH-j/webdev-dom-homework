import { getCommentsFromServer, postCommentToServer } from "./modules/commentsData.js";
import { renderComments } from "./modules/render.js";

const nameInput = document.querySelector(".add-form-name");
const textInput = document.querySelector(".add-form-text");
const addButton = document.querySelector(".add-form-button");

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

  addButton.disabled = true;
  addButton.textContent = "Элемент добавляется...";

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
      addButton.disabled = false;
      addButton.textContent = "Написать";
    });
});

getCommentsFromServer()
  .then(() => {
    renderComments();
  })
  .catch((error) => {
    alert("Не удалось загрузить комментарии. Проверьте соединение.");
    console.error(error);
  });
