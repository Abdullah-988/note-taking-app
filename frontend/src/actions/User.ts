import axios from "../lib/axios";

export function getUser() {
  return axios
    .get("/api/users/me", {
      headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
    })
    .then((res) => res.data);
}
