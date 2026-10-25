import { comments } from "./modules/commentsData.js";
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

  const now = new Date();
  const currentDate = now.toLocaleString("ru-RU", {
    day: "2-digit", month: "2-digit", year: "2-digit",
    hour: "2-digit", minute: "2-digit"
  }).replace(",", "");

  comments.push({
    name: nameInput.value,
    date: currentDate,
    text: textInput.value,
    likes: 0,
    isLiked: false
  });

  renderComments();

  nameInput.value = "";
  textInput.value = "";
});

renderComments();
