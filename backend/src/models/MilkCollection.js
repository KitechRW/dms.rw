const mongoose = require("mongoose");

const milkCollectionSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    cooperative: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
      index: true,
    },
    volume: {
      type: Number,
      required: true,
      min: 0.01,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },
    operator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

milkCollectionSchema.index({ operator: 1, createdAt: -1 });
milkCollectionSchema.index({ cooperative: 1, status: 1, createdAt: -1 });

module.exports = mongoose.model("MilkCollection", milkCollectionSchema);
