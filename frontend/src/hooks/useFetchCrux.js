import { useState } from "react";
import { fetchCruxReport } from "../services/api";

export const useFetchCrux = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchReport = async (url) => {
    try {
      const response = await fetchCruxReport(url);
      setData(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch CrUX report");
    }
  };

  return { data, error, fetchReport };
};
