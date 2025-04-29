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
      .json({ message: "Failed to get reviews", error: err.message });
  }
};

const addOneReview = async (req, res) => {
  const { item, catagory, desc, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    addOneReviewToDB(item, catagory, desc, image, price);
    res.status(201).json({ message: "Food registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const removeOneReview = async (req, res) => {
  try {
    const deleted = await removeOneReviewFromDB(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Food not found" });
    res.status(201).json({ message: "Food registered successfully" });
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
