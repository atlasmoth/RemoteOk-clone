const mongoose = require("mongoose");

const citiesSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
citiesSchema.index({ location: "2dsphere" });
const citiesModel = mongoose.model("City", citiesSchema);

module.exports = citiesModel;
