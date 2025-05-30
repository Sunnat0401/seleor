const { Schema, model } = require("mongoose");
const productSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    descriptions: { type: String, required: true },
    image: { type: String },
    imageKey: { type: String },
    stripePricetId: { type: String },
    stripeProductId: { type: String },
  },
  { timestamps: true }
);


module.exports = model('Product' , productSchema)