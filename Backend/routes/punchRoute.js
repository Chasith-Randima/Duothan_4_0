const express = require("express");
const punchController = require("./../controllers/punchController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(punchController.getAllPunchs)
  .post(authController.protect, punchController.createOnePunch);
router
  .route("/:id")
  .get(punchController.getOnePunch)
  .patch(authController.protect, punchController.updateAPunch)
  .delete(authController.protect, punchController.deleteAPunch);

module.exports = router;