import axios from "axios";

export const RequestApi = axios.create({
  baseURL: "https://test.helpmytoken.com/api/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
