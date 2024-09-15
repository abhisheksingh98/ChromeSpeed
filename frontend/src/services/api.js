import axios from "axios";

export const fetchCruxReport = (url) => {
  return axios.post("http://localhost:5000/api/crux/fetch", { url });
};
