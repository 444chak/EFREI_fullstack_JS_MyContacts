const express = require("express");
const router = express.Router();
const ContactController = require("../controllers/contact");
const verifyAuth = require("../middlewares/auth");

router.get("/", verifyAuth, ContactController.getContacts);
router.post("/", verifyAuth, ContactController.createContact);
router.patch("/:id", verifyAuth, ContactController.updateContact);
router.delete("/:id", verifyAuth, ContactController.deleteContact);

module.exports = router;
