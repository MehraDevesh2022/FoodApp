const planModel = require("../Model/planModel");
const reviewModel = require("../Model/reviewModel");

async function createReviewController(req, res) {
  try {
    let data = req.body;
    const review = await reviewModel.create(data); // review created at plan by user(both id is fached from thier model)


    // export this review & rating to the actual plan :
    let newRating = review.rating;  // get rating given by user[1 to 5] 
    let reviewId = review["_id"];   // get review id from reviewModel
    let currReviwedPlan = await planModel.findById(review.plan); // 
    let totalNumofRating = currReviwedPlan.review.length; // get total numbers of ratings in plan from plans -> document-> reviews-> array
    let prvAvgRating = currReviwedPlan.averageRating;    // get prvious total avg rating for plans
    if (prvAvgRating) { // if there any rating so calculate avg rating
      let totalRatings = totalNumofRating * prvAvgRating;  // now calculate ratings eg : (numberof rating =10 * avgRating =3) => 30
      let newAverageRating =  (totalRatings + newRating) / (totalNumofRating + 1); // calulate new avrage with new rating given by user for plan
      currReviwedPlan.averageRating = newAverageRating; // now add new avarge to the plan
    } else { // if there no rating
      currReviwedPlan.averageRating = newRating;
    }
    // add reviews id's to the plans review array [mongooes.Schema.ObjectId]
    currReviwedPlan.review.push(reviewId); // whenever review occures to the plan review id will store that plan review array(defined at planModel)
    await currReviwedPlan.save(); // save update for plan at dB
    console.log(review);
    res.status(201).json({
      currReviwedPlan,
      message: "review created",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
}

async function getAllReviewController(req, res) {
  try {
    // working poulate : get id from reviewModel find user/plan using findByID from given model at ref : value at review models user and plan documenet
    const review = await reviewModel
      .find()
      .populate({ path: "user", select: "name pic" })
      .populate({ path: "plan", select: "name price" });
    res.status(201).json({
      reviews: review,
      result: "all reviews",
    });
  } catch (err) {
    result: err.message;
  }
}

module.exports = {
  createReviewController,
  getAllReviewController,
};