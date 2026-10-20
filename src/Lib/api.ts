import axios from "axios";

export const api = axios.create({
  baseURL: "https://kitsu.io/api/edge",
  headers: { Accept: "application/vnd.api+json" },
});
