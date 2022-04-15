const onResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
  constructor({ baseUrl, token }) {
    this._baseUrl = baseUrl;
    this._token = `Bearer ${token}`;
  }

  getPostsList(page = 1, limit = 100, query = "") {
    return fetch(
      `${this._baseUrl}/posts/paginate/?page=${page}&limit=${limit}&query=${query}`,
      {
        headers: {
          authorization: this._token,
        },
      }
    ).then(onResponce);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then(onResponce);
  }

  setUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then(onResponce);
  }

  changeLikeStatus(postId, isLike) {
    return fetch(`${this._baseUrl}/posts/likes/${postId}`, {
      method: isLike ? "DELETE" : "PUT",
      headers: {
        authorization: this._token,
      },
    }).then(onResponce);
  }

  getPostById(postID) {
    return fetch(`${this._baseUrl}/posts/${postID}`, {
      headers: {
        authorization: this._token,
      },
    }).then(onResponce);
  }

  deletePost(postId) {
    return fetch(`${this._baseUrl}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(onResponce);
  }

  createPost(postData) {
    return fetch(`${this._baseUrl}/posts`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then(onResponce);
  }

  editPost({ title, image, tags, text }, postId) {
    return fetch(`${this._baseUrl}/posts/${postId}`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        image,
        tags,
        text,
      }),
    }).then(onResponce);
  }
}

const config = {
  baseUrl: "https://api.react-learning.ru",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJiNmZmYzA5YjEyZjgwZjRjMTBiYTIiLCJpYXQiOjE2NDcwMTM4ODUsImV4cCI6MTY3ODU0OTg4NX0.CHRD7i4m0rVn2qG44vdlasvi7AbJNHcvHdlCB7_DbLo",
};

const api = new Api(config);

export default api;
