const baseUrl = "http://localhost:3001";

export function checkResponse(res) {
  if (!res.ok) {
    return res.json().catch(() => ({})).then((errorData) => {
      return Promise.reject(errorData.message || `Error: ${res.status}`);
    });
  }

  return res.json().catch(() => ({}));
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export function getItems() {
  return request(`${baseUrl}/items`);
}

export function addItem({ name, imageUrl, weather }, token) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

export function removeItem(_id, token) {
  return request(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

export function addCardLike(_id, token) {
  return request(`${baseUrl}/items/${_id}/likes`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

export function removeCardLike(_id, token) {
  return request(`${baseUrl}/items/${_id}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

export function updateUserInfo({ name, avatar }, token) {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
}