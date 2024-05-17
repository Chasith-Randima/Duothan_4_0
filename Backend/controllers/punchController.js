const Punch = require("./../models/punchModel");
const factory = require("./handlerFactory");

exports.createOnePunch = factory.createOne(Punch);
exports.getOnePunch = factory.getOne(Punch);
// exports.getOnePunch = factory.getOne(Punch, {
//   path: "user_virtual",
//   select: "-__v",
// });
exports.getAllPunchs = factory.getAll(Punch);
exports.updateAPunch = factory.updateOne(Punch);
exports.deleteAPunch = factory.deleteOne(Punch);