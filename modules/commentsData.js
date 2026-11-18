const API_URL = "https://wedev-api.sky.pro/api/v1/:alexander/comments";

export let comments = [];

export function getCommentsFromServer() {
  return fetch(API_URL, {
    method: "GET",
  })
    .then((response) => {
      if (response.status === 500) {
        throw new Error("Сервер сломался, попробуй позже");
      }
      if (!response.ok) {
        throw new Error("Не удалось загрузить комментарии");
      }
      return response.json();
    })
    .then((responseData) => {
      comments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date).toLocaleString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }).replace(",", ""),
          text: comment.text,
          likes: comment.likes,
          isLiked: comment.isLiked,
        };
      });
    });
}

export function postCommentToServer(name, text) {
  let responseStatus = 0;

  return fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      text: text,
      forceError: true,
    }),
  })
    .then((response) => {
      responseStatus = response.status;

      if (responseStatus === 500) {
        throw new Error("Сервер сломался, попробуй позже");
      }

      if (responseStatus === 400 || responseStatus === 201) {
        return response.json();
      }

      throw new Error("Неизвестная ошибка сервера");
    })
    .then((data) => {

      if (responseStatus === 400) {
        throw new Error(data.error);
      }
      return data;
    });
}
