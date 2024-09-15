const axios = require("axios");

exports.fetchCruxReport = async (url) => {
  const API_KEY = process.env.API_KEY;
  const endpoint = `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${API_KEY}`;

  const requestBody = {
    url: url,
  };

  try {
    const response = await axios.post(endpoint, requestBody, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching CrUX data:",
      error.response?.data || error.message
    );
    throw new Error("Error fetching CrUX data: " + error.message);
  }
};
