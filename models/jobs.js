const mongoose = require("mongoose");
const validator = require("validator");

const jobSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    position: {
      type: String,
      required: true,
    },
    range: String,
    tags: [String],
    companyName: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
    salary: {
      type: Number,
      min: 0,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    applyEmail: {
      type: String,
      validate: {
        validator: validator.isEmail,
      },
    },
    applyUrl: {
      type: String,
      validate: {
        validator: validator.isURL,
      },
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
    companyEmail: {
      type: String,
      validate: {
        validator: validator.isEmail,
      },
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

jobSchema.index({ location: "2dsphere" });
jobSchema.index({
  jobDescription: "text",
  tags: "text",
  position: "text",
  companyName: "text",
});
module.exports = mongoose.model("Job", jobSchema);
