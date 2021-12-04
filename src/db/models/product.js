/* eslint-disable camelcase */
const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    enum: ["Coke", "Pepsi", "Dew"],
  },
  type: { type: mongoose.Schema.Types.String, default: "drinks" },
  cost: { type: mongoose.Schema.Types.Number },
  quantity: { type: mongoose.Schema.Types.Number, default: 10 },
});
module.exports = mongoose.model("Product", ProductSchema, "products");
