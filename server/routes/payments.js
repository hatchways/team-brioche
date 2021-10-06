const express = require("express");
const {
  getListOfPaymentMethods,
  addPaymentMethod,
  setDefaultPaymentMethod,
} = require("../controllers/payments");
const protect = require("../middleware/auth");
const router = express.Router();

router.route("/payment-methods").get(protect, getListOfPaymentMethods);
router.route("/add-payment-method").post(protect, addPaymentMethod);

router
  .route("/set-default-method/:methodId")
  .patch(protect, setDefaultPaymentMethod);
module.exports = router;
