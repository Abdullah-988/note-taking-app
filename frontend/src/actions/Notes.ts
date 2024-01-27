import axios from "../lib/axios";

type Note = {
  _id: string;
  title: string;
  content: string;
};

export function createNote(data: Omit<Note, "_id">) {
  return axios
    .post("/api/notes/create", data, {
      headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
    })
    .then((res) => res.data as Note);
}

export function editNote({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content: string;
}) {
  return axios
    .put(
      `/api/notes/${id}/edit`,
      { title, content },
      {
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
      }
    )
    .then((res) => res.data as Note);
}

export function deleteNote(id: string) {
  return axios
    .delete(`/api/notes/${id}`, {
      headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
    })
    .then((res) => res.data as Note);
}

export function getNotes() {
  return axios
    .get("/api/notes", {
      headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
    })
    .then((res) => res.data as Note[]);
}
