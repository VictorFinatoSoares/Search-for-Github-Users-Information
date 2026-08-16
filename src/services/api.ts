// Define a URL base da API que será usada para a requisição

import axios from "axios";

export const API = axios.create({
  baseURL: "https://api.github.com/users",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
