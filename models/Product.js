const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mainImage: {
      type: String,
      required: true,
    },
    additionalImages: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
