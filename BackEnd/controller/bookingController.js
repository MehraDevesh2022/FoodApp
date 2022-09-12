const bookingModel = require("../Model/bookingModel");
const userModel  = require("../Model/userModel");
const Razorpay = require("razorpay");
const KEY_ID = process.env.KEY_ID ||   require("../secret").KEY_ID;
const KEY_SECRET = process.env.KEY_SECRET || require("../secret").KEY_SECRET;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || require("../secret").WEBHOOK_SECRET;


async function initiateBookingController(req , res){
      
try{
  const bookingData = req.body;
   console.log("booking",bookingData);
  // 1. add a booking to booking model
  const newBooking = await bookingModel.create(bookingData);
 
  const bookingID = newBooking["_id"];
  // 2.add Booking id of that booking to userModel booking array
  const userID = req.body.user;
   console.log(userID);
  const user = await userModel.findById(userID);
  user.booking.push(bookingID);
  await user.save();

  // 3. razorpay -> order create send


const razorpay = new Razorpay({
  key_id: KEY_ID,
  key_secret: KEY_SECRET,
});

  const amount = req.body.priceAtThatTime; 
  const currency = "INR";
  const options = {
    amount,
    currency,
    receipt: `rs_${bookingID}`,
  };
  const response = await razorpay.orders.create(options);
  console.log(response);
  // 4 respond to client
  res.status(200).json({
    id: response.id,
    currency: response.currency,
    amount: response.amount,
    booking: newBooking,
    message: "booking created",
  });
} catch(err){
   res.status(500).json({
     message: err.message,
   });
}
}

async function verifyPayment(req, res) {
const secret = WEBHOOK_SECRET; // secret register at razorPay admin webhooks

console.log(req.body);
// for encryption
const shasum = crypto.createHmac("sha256", secret);
shasum.update(JSON.stringify(req.body));
const digest = shasum.digest("hex");

console.log(digest, req.headers["x-razorpay-signature"]);
// response to clint =>
if (digest === req.headers["x-razorpay-signature"]) {
  console.log("request is legit");
  res.status(200).json({
    message: "ok",
  });
} else {
  res.status(403).json({ message: "Invalid" });
}
}

async function getBookingByID(res , res){
  try{
    const bookingID = req.params.bookingID;
  const booking = await bookingModel.findById(bookingID);
  console.log(booking);
  res.status(200).json({
    booking : booking,
    result : "This is the booking with given Id",
  })
  } catch(err){
   res.status(500).json({
     result: message.err
   });
  }
}

async function getAllBookings(req , res){
  try{
    const bookings = await bookingModel.find();
   console.log(bookings);
    res.status(200).json({
    bookings : bookings,
    result : "These are the bookings"
  })

  }catch(err){
    res.status(500).json({
        result : message.err
    })
  }
}


module.exports = {
  initiateBookingController,
  verifyPayment,
  getAllBookings,
  getBookingByID,
};