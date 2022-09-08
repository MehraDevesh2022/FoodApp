const mongooes  = require("mongoose");

const reviewSchema = new mongooes.Schema({
  description: {
    type: String,
    required: [true, "review can't be empty"],
  },

  rating: {
    type: Number,
    max: 5,
    min: 1,
    required: [true, "review must contain some rating"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongooes.Schema.ObjectId, //geting _id from userModel
    requird: [true, "review must be belong to a user"],
    ref: "userModel",
  },

  plan: {
    type: mongooes.Schema.ObjectId, // get _id from "FoodplanModel"
    requird: [true, "review must belongs to the plan"],
    ref: "FoodplanModel",
  },
});

const reviewModel = mongooes.model("reviewModel", reviewSchema); // reviewModel created at DB follows reviewSchema 
module.exports = reviewModel;