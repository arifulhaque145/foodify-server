const express = require("express");
const {
  getAllReviewByUser,
  updateOneReview,
  addOneReview,
  removeOneReview,
} = require("../controllers/review.controller");

const reviewRouter = express.Router();

reviewRouter.get("/review-items/:id", getAllReviewByUser);
reviewRouter.patch("/review-items/:id", updateOneReview);
reviewRouter.post("/review-items/:id", addOneReview);
reviewRouter.delete("/review-items/:id", removeOneReview);

module.exports = reviewRouter;
