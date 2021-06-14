import mongoose from "mongoose";

const CountSchema = mongoose.Schema({
  api_call: {
    type: Number,
    required: true
  },
  date_created: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

module.exports =
  mongoose.models.Counts || mongoose.model("Counts", CountSchema);
