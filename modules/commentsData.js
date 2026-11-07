const API_URL = "https://wedev-api.sky.pro/api/v1/:alexander/comments";

export let comments = [];

export function getCommentsFromServer() {
  return fetch(API_URL, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка сервера при загрузке данных");
      }
      return response.json();
    })
    .then((responseData) => {
      comments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date).toLocaleString("ru-RU", {
            day: "2-digit", month: "2-digit", year: "2-digit",
            hour: "2-digit", minute: "2-digit"
          }).replace(",", ""),
          text: comment.text,
          likes: comment.likes,
          isLiked: comment.isLiked,
        };
      });
    });
}

export function postCommentToServer(name, text) {
  return fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      text: text,
    }),
  }).then((response) => {
    if (response.status === 400) {
      return response.json().then((errorData) => {
        throw new Error(errorData.error);
      });
    }
    if (response.status === 500) {
      throw new Error("Сервер упал, попробуйте еще раз");
    }
    if (response.status !== 201) {
      throw new Error("Неизвестная ошибка сервера");
    }
    return response.json();
  });
}
