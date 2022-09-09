const FoodModel = require("../Model/planModel");

async function createPlanController(req, res) {
  try {
    const planObjData = req.body;
    let isObjData = Object.keys(planObjData).length > 0;
    if (isObjData) {
      const newPlan = await FoodModel.create(planObjData);
      res.status(201).json({
        newPlan,
        result: "plan created",
      });
    } else {
      res.status(400).json({
        result: "data not available",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function getAllPlansController(req, res) {
  try {
    // get all plans from DB
    const allPlans = await FoodModel.find().populate("review");
    res.status(201).json({
      result: "all food Plans ",
      allPlans: allPlans,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function getPlanController(req, res) {
  try {
    // objID is tamplet Route : req body has ID as a params
    const planID = req.params.objID;
    const foodPlan = await FoodModel.findById(planID);
    res.status(201).json({
      result: "Plan with given id ",
      Plan: foodPlan,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function updatePlanController(req, res) {
  try {
    const updatePlan = req.body;
    // objID is plan id given by clint
    const planId = req.params.objID;
    // get user by id from DB
    const currPlan = await FoodModel.findById(planId);
    // update user given value by clint
    for (let key in updatePlan) {
      currPlan[key] = updatePlan[key];
    }
    // save update at DB
    await currPlan.save();
    res.status(201).json({
      result: "Plan is updated",
      Plan: currPlan,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function deletePlanController(req, res) {
  try {
    const planID = req.params.objID;
    const deletePlan = await FoodModel.findByIdAndDelete(planID);
    res.status(201).json({
      result: "data deleted",
      Plan: deletePlan,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

module.exports = {
  getAllPlansController,
  getPlanController,
  updatePlanController,
  createPlanController,
  deletePlanController,
};
