import { comments } from "./commentsData.js";
import { renderComments } from "./render.js";

export function initLikeAndQuoteListeners() {
  const textInput = document.querySelector(".add-form-text");
  const likeButtons = document.querySelectorAll(".like-button");
  const commentsElements = document.querySelectorAll(".comment");

  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();

      const index = likeButton.dataset.index;
      const comment = comments[index];

      if (comment.isLiked) {
        comment.isLiked = false;
        comment.likes--;
      } else {
        comment.isLiked = true;
        comment.likes++;
      }

      renderComments();
    });
  }

  for (const commentElement of commentsElements) {
    commentElement.addEventListener("click", () => {
      const index = commentElement.dataset.index;
      const currentComment = comments[index];
      
      textInput.value = `> ${currentComment.name}:\n${currentComment.text}\n\n`;
      textInput.focus();
    });
  }
}
