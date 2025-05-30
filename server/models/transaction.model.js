const { Schema, model } = require("mongoose");

const transactionShema = new Schema({
  id: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  state: { type: Number },
  amount: { type: Number },
  create_time: { type: Number, default: Date.now() },
  perform_time: { type: Number, default: 0 },
  cancel_time: { type: Number, default: 0 },
});

module.exports = model("Trasnactions", transactionShema);
