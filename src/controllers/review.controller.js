const {
  getAllReviewByUserFromDB,
  updateOneReviewFromDB,
  addOneReviewToDB,
  removeOneReviewFromDB,
} = require("../services/review.service");

const getAllReviewByUser = async (req, res) => {
  try {
    const id = req.params.id;
    const allReviews = await getAllReviewByUserFromDB(id);
    res.status(200).json(allReviews);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get reviews", error: err.message });
  }
};

const updateOneReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const reviewData = req.body;
    const newReview = await updateOneReviewFromDB(reviewId, reviewData);
    res.status(200).json(newReview);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update review", error: err.message });
  }
};

const addOneReview = async (req, res) => {
  const foodId = req.params.id;
  const { userId, rating, comment } = req.body;

  try {
    await addOneReviewToDB(userId, foodId, rating, comment);
    res.status(201).json({ message: "Review added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const removeOneReview = async (req, res) => {
  try {
    const result = await removeOneReviewFromDB(req.params.id);
    if (result.deletedCount === 0) return res.status(404).json({ message: "Review not found" });
    res.status(200).json({ message: "Review removed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getAllReviewByUser,
  updateOneReview,
  addOneReview,
  removeOneReview,
};