const express = require("express");
const { getAllDoctors, getAvailableSlots } = require("../controllers/doctorController");

const router = express.Router();

router.get("/", getAllDoctors);
router.get("/:id/slots", getAvailableSlots);

module.exports = router;
