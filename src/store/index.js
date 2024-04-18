import { reactive } from "vue";

export const api = {
  baseUrl: "http://127.0.0.1:8000/api/",
  baseUrl2: "http://127.0.0.1:8000",

};

export const store = reactive({
  characters: [],
  charactersLink: [],
});
