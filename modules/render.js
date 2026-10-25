import { comments } from "./commentsData.js";
import { sanitizeHtml } from "./sanitize.js";
import { initLikeAndQuoteListeners } from "./listeners.js";

const commentsList = document.querySelector(".comments");

export function renderComments() {
  const commentsHtml = comments.map((comment, index) => {
    return `
      <li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${sanitizeHtml(comment.name)}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${sanitizeHtml(comment.text)}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button data-index="${index}" class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
          </div>
        </div>
      </li>
    `;
  }).join("");
  
  commentsList.innerHTML = commentsHtml;
  
  initLikeAndQuoteListeners();
}
