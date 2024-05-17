const express = require("express");
const paymentController = require("./../controllers/paymentController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(paymentController.getAllPayments)
  .post(authController.protect, paymentController.createOnePayment);
router
  .route("/:id")
  .get(paymentController.getOnePayment)
  .patch(authController.protect, paymentController.updateAPayment)
  .delete(authController.protect, paymentController.deleteAPayment);

module.exports = router;