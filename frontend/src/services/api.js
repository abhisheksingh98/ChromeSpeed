import axios from "axios";
import { BASE_URL } from "../constants";

export const fetchCruxReport = (url) => {
  return axios.post(BASE_URL, { url });
};
