const Payment = require("./../models/paymentModel");
const factory = require("./handlerFactory");

exports.createOnePayment = factory.createOne(Payment);
exports.getOnePayment = factory.getOne(Payment);
// exports.getOnePayment = factory.getOne(Payment, {
//   path: "user_virtual",
//   select: "-__v",
// });
exports.getAllPayments = factory.getAll(Payment);
exports.updateAPayment = factory.updateOne(Payment);
exports.deleteAPayment = factory.deleteOne(Payment);