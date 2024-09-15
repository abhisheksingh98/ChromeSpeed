const express = require("express");
const cors = require("cors");
const cruxRoutes = require("./routes/crux");
require("dotenv").config({ path: "./config/.env" });

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/crux", cruxRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
