const express = require("express");
const { getCruxData } = require("../controllers/cruxController");
const router = express.Router();

router.post("/fetch", getCruxData);

module.exports = router;
