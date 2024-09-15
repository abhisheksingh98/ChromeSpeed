const { fetchCruxReport } = require("../services/cruxService");

exports.getCruxData = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const cruxData = await fetchCruxReport(url);
    return res.json(cruxData);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch CrUX data" });
  }
};
