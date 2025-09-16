const express = require("express");
const router = express.Router();
const ContactController = require("../controllers/contact");
const verifyAuth = require("../middlewares/auth");
const { runValidators, requireBodyFields, validatePhoneField } = require("../middlewares/validation");

router.get("/", verifyAuth, ContactController.getContacts);
router.post(
    "/",
    verifyAuth,
    runValidators([requireBodyFields(["firstName", "lastName", "phone"]), validatePhoneField("phone")]),
    ContactController.createContact
);
router.patch(
    "/:id",
    verifyAuth,
    runValidators([requireBodyFields(["firstName", "lastName", "phone"]), validatePhoneField("phone")]),
    ContactController.updateContact
);
router.delete("/:id", verifyAuth, ContactController.deleteContact);

module.exports = router;
