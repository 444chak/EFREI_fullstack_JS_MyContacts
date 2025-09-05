const express = require("express");
const router = express.Router();
const ContactController = require("../controllers/contact");

router.get("/", ContactController.getContacts);
router.post("/", ContactController.createContact);
router.patch("/:id", ContactController.updateContact);
router.delete("/:id", ContactController.deleteContact);

module.exports = router;
