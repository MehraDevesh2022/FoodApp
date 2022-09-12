const mongooes = require("mongoose");

const bookingSchema = new mongooes.Schema({
  user: {
    // info user
    type: mongooes.Schema.ObjectId,
    required: [true, "booking must belongs to the user"],
    ref: "userModel",
  },
  plan: {
    // info of the plan
    type: mongooes.Schema.ObjectId,
    required: [true, "booking has must be a plan"],
    ref: "planModel",
  },
  // booking Time
  bookingTime: {
    type: Date,
    default: Date.now(),
  },
  // price of the plan
  priceAtThatTime: {
    type: Number,
    required: [true],
  },

  // status :
  status: {
    type: String,
    enum: ["pending", "failed", "sucess"],
    required: true,
    default: "pending",
  },
});

const bookingModel = mongooes.model("bookingModel" , bookingSchema);

module.exports  = bookingModel;

